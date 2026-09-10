/**
 * Main Game State Machine & Coordinator for Bhabhi Thulla
 */

class BhabhiGame {
  constructor() {
    this.deck = new Deck();
    this.ai = new BhabhiAI('normal');
    this.ui = new BhabhiUI();

    this.gameState = {
      players: [],
      currentPlayerIndex: 0,
      leadSuit: null,
      currentTrick: [],
      lastTrick: null,
      discardPile: [],
      finishOrder: [],
      trickNumber: 1,
      isFirstTrick: true,
      gameStarted: false,
      gameOver: false,
      bhabhi: null,
      difficulty: 'normal'
    };

    this.stats = this.loadStats();
    this.initEventListeners();
  }

  loadStats() {
    const defaultStats = {
      gamesPlayed: 0,
      gamesWon: 0,
      timesBhabhi: 0,
      currentStreak: 0,
      bestStreak: 0
    };
    try {
      const saved = localStorage.getItem('360tools_bhabhi_stats');
      return saved ? JSON.parse(saved) : defaultStats;
    } catch (e) {
      return defaultStats;
    }
  }

  saveStats() {
    try {
      localStorage.setItem('360tools_bhabhi_stats', JSON.stringify(this.stats));
    } catch (e) {}
  }

  initEventListeners() {
    // Top Controls
    document.getElementById('newGameBtn')?.addEventListener('click', () => this.startNewGame());
    document.getElementById('restartBtn')?.addEventListener('click', () => this.startNewGame());
    document.getElementById('soundToggleBtn')?.addEventListener('click', () => this.ui.toggleSound());
    document.getElementById('rulesBtn')?.addEventListener('click', () => this.showRulesModal(true));
    document.getElementById('statsBtn')?.addEventListener('click', () => this.showStatsModal(true));
    document.getElementById('lastTrickBtn')?.addEventListener('click', () => {
      this.ui.renderLastTrickPreview(this.gameState.lastTrick, this.gameState.leadSuit);
    });

    // Difficulty Selector
    document.getElementById('difficultySelect')?.addEventListener('change', (e) => {
      this.setDifficulty(e.target.value);
    });

    // Modal Closers
    document.getElementById('closeRulesBtn')?.addEventListener('click', () => this.showRulesModal(false));
    document.getElementById('closeStatsBtn')?.addEventListener('click', () => this.showStatsModal(false));
    document.getElementById('closeLastTrickBtn')?.addEventListener('click', () => {
      document.getElementById('lastTrickModal')?.classList.add('hidden');
    });
    document.getElementById('modalNewGameBtn')?.addEventListener('click', () => {
      this.ui.hideGameOverModal();
      this.startNewGame();
    });
  }

  setDifficulty(diff) {
    this.gameState.difficulty = diff;
    this.ai.setDifficulty(diff);
    this.ui.showToast(`AI Difficulty set to ${diff.toUpperCase()}`, 'info');
  }

  startNewGame() {
    this.ui.hideGameOverModal();
    this.ui.playSound('deal');

    // 1. Initialize 4 Players
    this.gameState.players = [
      { id: 0, name: 'You', type: 'human', hand: [], active: true, finished: false, finishRank: null },
      { id: 1, name: 'Computer 1', type: 'ai', hand: [], active: true, finished: false, finishRank: null },
      { id: 2, name: 'Computer 2', type: 'ai', hand: [], active: true, finished: false, finishRank: null },
      { id: 3, name: 'Computer 3', type: 'ai', hand: [], active: true, finished: false, finishRank: null }
    ];

    // 2. Deal 52 Cards (13 to each player)
    const hands = this.deck.deal(4);
    this.gameState.players.forEach((p, idx) => {
      p.hand = hands[idx];
    });

    // 3. Reset Game State Variables
    this.gameState.leadSuit = null;
    this.gameState.currentTrick = [];
    this.gameState.lastTrick = null;
    this.gameState.discardPile = [];
    this.gameState.finishOrder = [];
    this.gameState.trickNumber = 1;
    this.gameState.isFirstTrick = true;
    this.gameState.gameStarted = true;
    this.gameState.gameOver = false;
    this.gameState.bhabhi = null;

    // Attach helper methods to gameState object for AI/UI access
    this.gameState.getLegalMoves = (player) => this.getLegalMoves(player);
    this.gameState.getRemainingPlayersInTrickCount = () => this.getRemainingPlayersInTrickCount();

    // 4. Locate player with Ace of Spades (♠A)
    let starterIndex = 0;
    this.gameState.players.forEach(p => {
      if (p.hand.some(c => c.isAceOfSpades())) {
        starterIndex = p.id;
      }
    });

    this.gameState.currentPlayerIndex = starterIndex;

    // 5. Update UI
    this.renderAll();
    this.ui.updateTableStats(this.gameState);

    const starter = this.gameState.players[starterIndex];
    if (starter.type === 'human') {
      this.ui.showToast('You hold Ace of Spades (♠A)! You start the game by playing ♠A.', 'success');
    } else {
      this.ui.showToast(`${starter.name} holds Ace of Spades (♠A) and starts the game!`, 'info');
    }

    // 6. Begin Turn Flow
    this.processTurn();
  }

  /**
   * Determine legal cards a player is allowed to play
   */
  getLegalMoves(player) {
    if (!player || player.hand.length === 0) return [];

    // First trick: holding ♠A must play ♠A
    if (this.gameState.isFirstTrick && player.hand.some(c => c.isAceOfSpades())) {
      return player.hand.filter(c => c.isAceOfSpades());
    }

    // If leading the trick: any card is legal
    if (!this.gameState.leadSuit) {
      return [...player.hand];
    }

    // Following suit: if has lead suit, MUST play lead suit
    const suitCards = player.hand.filter(c => c.suit === this.gameState.leadSuit);
    if (suitCards.length > 0) {
      return suitCards;
    }

    // Void in lead suit: can play any card (off-suit discard)
    return [...player.hand];
  }

  getRemainingPlayersInTrickCount() {
    const activePlayersCount = this.gameState.players.filter(p => p.active && !p.finished).length;
    return activePlayersCount - this.gameState.currentTrick.length;
  }

  /**
   * Process current player turn
   */
  processTurn() {
    if (this.gameState.gameOver) return;

    const currentPlayer = this.gameState.players[this.gameState.currentPlayerIndex];

    // If player already finished or inactive, advance
    if (currentPlayer.finished || !currentPlayer.active) {
      this.nextPlayerTurn();
      return;
    }

    this.renderAll();

    if (currentPlayer.type === 'human') {
      // Human turn: UI handles card click and calls playCard()
    } else {
      // Computer Turn: Simulate thinking delay
      const thinkTime = this.gameState.isFirstTrick && currentPlayer.hand.some(c => c.isAceOfSpades()) ? 400 : 700 + Math.random() * 300;

      setTimeout(() => {
        if (this.gameState.gameOver) return;
        const cardToPlay = this.ai.chooseCard(currentPlayer, this.gameState);
        if (cardToPlay) {
          this.playCard(currentPlayer.id, cardToPlay);
        }
      }, thinkTime);
    }
  }

  /**
   * Execute card play
   */
  playCard(playerId, card) {
    const player = this.gameState.players[playerId];
    if (!player) return;

    // Remove card from hand
    const cardIndex = player.hand.findIndex(c => c.id === card.id);
    if (cardIndex !== -1) {
      player.hand.splice(cardIndex, 1);
    }

    // Establish Lead Suit if first card of trick
    if (!this.gameState.leadSuit) {
      this.gameState.leadSuit = card.suit;
    }

    // Add to current trick
    this.gameState.currentTrick.push({
      playerId: playerId,
      card: card
    });

    this.ui.playSound('play');
    this.ui.renderCenterTrick(this.gameState.currentTrick, this.gameState.leadSuit);

    // Check if player just emptied their hand
    if (player.hand.length === 0 && !player.finished) {
      player.finished = true;
      player.finishRank = this.gameState.finishOrder.length + 1;
      this.gameState.finishOrder.push(player);

      if (player.type === 'human') {
        this.ui.showToast('🎉 Congratulations! You have emptied all your cards and are SAFE!', 'success');
      } else {
        this.ui.showToast(`${player.name} is SAFE (#${player.finishRank})!`, 'info');
      }
    }

    this.renderAll();

    // Check if all active players in this trick have played
    const activePlayersInGame = this.gameState.players.filter(p => (p.active && !p.finished) || this.gameState.currentTrick.some(item => item.playerId === p.id));
    
    // Total players expected to play in this trick
    const expectedCards = this.getExpectedTrickCount();

    if (this.gameState.currentTrick.length >= expectedCards) {
      // Trick is complete -> evaluate winner
      setTimeout(() => this.evaluateTrick(), 800);
    } else {
      // Advance to next active player in current trick
      this.nextPlayerTurn();
    }
  }

  getExpectedTrickCount() {
    // Only players who were active at the START of the trick (or currently in trick)
    let count = 0;
    this.gameState.players.forEach(p => {
      if (p.active && (!p.finished || this.gameState.currentTrick.some(t => t.playerId === p.id))) {
        count++;
      }
    });
    return Math.max(count, 2);
  }

  nextPlayerTurn() {
    let nextIndex = (this.gameState.currentPlayerIndex + 1) % 4;
    
    // Find next active player who hasn't played in this trick yet
    let attempts = 0;
    while (attempts < 4) {
      const p = this.gameState.players[nextIndex];
      const hasPlayed = this.gameState.currentTrick.some(t => t.playerId === p.id);
      
      if (!p.finished && !hasPlayed) {
        this.gameState.currentPlayerIndex = nextIndex;
        this.processTurn();
        return;
      }
      nextIndex = (nextIndex + 1) % 4;
      attempts++;
    }

    // If all played, evaluate
    this.evaluateTrick();
  }

  /**
   * Evaluate Trick Winner according to standard Bhabhi rules
   */
  evaluateTrick() {
    const trick = this.gameState.currentTrick;
    const leadSuit = this.gameState.leadSuit;

    if (trick.length === 0) return;

    // Winner is highest card of the lead suit
    let highestValue = -1;
    let winningItem = trick[0];

    trick.forEach(item => {
      if (item.card.suit === leadSuit && item.card.value > highestValue) {
        highestValue = item.card.value;
        winningItem = item;
      }
    });

    const winnerPlayer = this.gameState.players[winningItem.playerId];

    // Highlight winning card
    this.ui.highlightTrickWinner(winningItem.playerId, winningItem.card, () => {
      // Save to last trick review
      this.gameState.lastTrick = [...trick];

      // Move trick cards to discard pile (cards are permanently discarded)
      trick.forEach(item => this.gameState.discardPile.push(item.card));
      this.gameState.currentTrick = [];
      this.gameState.leadSuit = null;
      this.gameState.isFirstTrick = false;
      this.gameState.trickNumber++;

      this.ui.animateTrickClear(() => {
        this.ui.updateTableStats(this.gameState);

        // Check if game is over (only 1 player with cards remains)
        if (this.checkGameOver()) {
          return;
        }

        // Determine next starting player:
        // If the winner has finished all cards, the lead passes to next active player clockwise
        if (winnerPlayer.finished) {
          this.gameState.currentPlayerIndex = this.getNextActivePlayerIndex(winnerPlayer.id);
        } else {
          this.gameState.currentPlayerIndex = winnerPlayer.id;
        }

        this.renderAll();
        this.processTurn();
      });
    });
  }

  getNextActivePlayerIndex(startIndex) {
    let next = (startIndex + 1) % 4;
    for (let i = 0; i < 4; i++) {
      if (!this.gameState.players[next].finished) {
        return next;
      }
      next = (next + 1) % 4;
    }
    return 0;
  }

  /**
   * Check if game has ended
   */
  checkGameOver() {
    const remainingActive = this.gameState.players.filter(p => !p.finished && p.hand.length > 0);

    if (remainingActive.length <= 1) {
      this.gameState.gameOver = true;
      this.gameState.bhabhi = remainingActive[0] || null;

      // Update LocalStorage Stats
      this.stats.gamesPlayed++;
      if (this.gameState.bhabhi && this.gameState.bhabhi.id === 0) {
        // Human is Bhabhi (Lost)
        this.stats.timesBhabhi++;
        this.stats.currentStreak = 0;
      } else {
        // Human Escaped (Won)
        this.stats.gamesWon++;
        this.stats.currentStreak++;
        if (this.stats.currentStreak > this.stats.bestStreak) {
          this.stats.bestStreak = this.stats.currentStreak;
        }
      }
      this.saveStats();

      // Show Game Over Screen
      this.ui.showGameOverModal(this.gameState, this.stats);
      return true;
    }

    return false;
  }

  renderAll() {
    const human = this.gameState.players[0];
    if (human) {
      this.ui.renderHumanHand(human, this.gameState, (card) => {
        this.playCard(human.id, card);
      });
    }

    this.ui.renderComputerHands(this.gameState.players, this.gameState);
  }

  showRulesModal(show) {
    const modal = document.getElementById('rulesModal');
    if (modal) {
      if (show) modal.classList.remove('hidden');
      else modal.classList.add('hidden');
    }
  }

  showStatsModal(show) {
    const modal = document.getElementById('statsModal');
    if (modal) {
      if (show) {
        // Populate stats
        const winRate = this.stats.gamesPlayed > 0 ? Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) : 0;
        document.getElementById('statGamesPlayed').textContent = this.stats.gamesPlayed;
        document.getElementById('statGamesWon').textContent = this.stats.gamesWon;
        document.getElementById('statTimesBhabhi').textContent = this.stats.timesBhabhi;
        document.getElementById('statWinRate').textContent = `${winRate}%`;
        document.getElementById('statCurrentStreak').textContent = `${this.stats.currentStreak} 🔥`;
        document.getElementById('statBestStreak').textContent = `${this.stats.bestStreak} 🏆`;
        modal.classList.remove('hidden');
      } else {
        modal.classList.add('hidden');
      }
    }
  }
}

// Auto Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.bhabhiGame = new BhabhiGame();
  window.bhabhiGame.startNewGame();
});
