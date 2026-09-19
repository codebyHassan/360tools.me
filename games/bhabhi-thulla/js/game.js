/**
 * Main Game State Machine & Online WebRTC P2P Multiplayer Coordinator for Bhabhi Thulla
 * Zero Backend / Zero Database required.
 */

class BhabhiGame {
  constructor() {
    this.deck = new Deck();
    this.ai = new BhabhiAI('normal');
    this.ui = new BhabhiUI();

    // Mode & Multiplayer Variables
    this.mode = 'ai'; // 'ai' or 'online'
    this.isHost = false;
    this.targetPlayers = 4; // 2, 3, or 4 players
    this.mySeat = 0; // 0: Bottom (Host/Human), 1: Top, 2: Left, 3: Right
    this.onlineRoomId = null;
    this.peer = null;
    this.guestConnections = [null, null, null, null]; // For Host: connections to seats 1, 2, 3
    this.hostConnection = null; // For Guest: connection to Host
    this.lobbySeats = [];

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
    this.checkUrlRoomParam();
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
    document.getElementById('newGameBtn')?.addEventListener('click', () => {
      if (this.mode === 'online' && !this.isHost) {
        this.ui.showToast('Only the Host can restart an online room match.', 'info');
        return;
      }
      if (this.mode === 'online' && this.isHost) {
        this.hostStartMatch();
      } else {
        this.startNewGame();
      }
    });

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
      if (this.mode === 'online' && this.isHost) {
        this.hostStartMatch();
      } else if (this.mode === 'online' && !this.isHost) {
        this.ui.showToast('Waiting for the Host to start the next game...', 'info');
      } else {
        this.startNewGame();
      }
    });

    // Enter key in join room input
    document.getElementById('bhabhiJoinInput')?.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.joinOnlineRoom();
      }
    });
  }

  checkUrlRoomParam() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const roomParam = urlParams.get('room');
      if (roomParam && roomParam.trim().length === 6) {
        document.getElementById('gameStartOverlay')?.classList.add('hidden');
        const joinInput = document.getElementById('bhabhiJoinInput');
        if (joinInput) joinInput.value = roomParam.trim();
        this.setMode('online');
        setTimeout(() => this.joinOnlineRoom(roomParam.trim()), 600);
      }
    } catch (e) {}
  }

  // ==========================================
  // MODE MANAGEMENT (VS AI / ONLINE ROOM)
  // ==========================================

  setMode(mode) {
    this.mode = mode;
    const btnAi = document.getElementById('btnBhabhiAi');
    const btnOnline = document.getElementById('btnBhabhiOnline');
    const lobbyPanel = document.getElementById('bhabhiOnlineLobbyPanel');

    document.getElementById('gameStartOverlay')?.classList.add('hidden');

    if (mode === 'ai') {
      btnAi.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-[#183153] text-white flex items-center gap-1.5 transition-all shadow-sm';
      btnOnline.className = 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all';
      if (lobbyPanel) lobbyPanel.classList.add('hidden');
      document.getElementById('gameTableArea')?.classList.remove('hidden');

      this.cleanupPeer();
      this.mySeat = 0;
      this.isHost = false;
      this.onlineRoomId = null;

      // Reset Table Player Names
      this.ui.updatePlayerBoxNames([
        { id: 0, name: 'You', type: 'human' },
        { id: 1, name: 'Computer 1', type: 'ai' },
        { id: 2, name: 'Computer 2', type: 'ai' },
        { id: 3, name: 'Computer 3', type: 'ai' }
      ], 0);

      this.startNewGame();
    } else {
      btnOnline.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-700 text-white flex items-center gap-1.5 transition-all shadow-sm';
      btnAi.className = 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all';
      if (lobbyPanel) lobbyPanel.classList.remove('hidden');
      document.getElementById('gameTableArea')?.classList.add('hidden');

      this.showLobbySection('initial');
    }
  }

  showLobbySection(section) {
    const initial = document.getElementById('bhabhiLobbyInitial');
    const waiting = document.getElementById('bhabhiWaitingRoom');
    const connected = document.getElementById('bhabhiConnectedStatus');

    if (initial) initial.classList.toggle('hidden', section !== 'initial');
    if (waiting) waiting.classList.toggle('hidden', section !== 'waiting');
    if (connected) connected.classList.toggle('hidden', section !== 'connected');
  }

  updateTableLayoutForPlayerCount(target) {
    const count = target || this.targetPlayers || 4;
    const sec1 = document.getElementById('playerSection_1'); // Top
    const sec2 = document.getElementById('playerSection_2'); // Left
    const sec3 = document.getElementById('playerSection_3'); // Right
    const grid = document.getElementById('centerTrickGrid');
    const col = document.getElementById('centerTrickCol');

    if (count === 2) {
      // 2-Player (1v1) Mode: Show Top & Bottom only. Hide Left and Right.
      if (sec1) sec1.classList.remove('hidden');
      if (sec2) sec2.classList.add('hidden');
      if (sec3) sec3.classList.add('hidden');
      if (grid) grid.className = 'flex items-center justify-center gap-2 my-auto py-2';
      if (col) col.className = 'flex flex-col items-center justify-center relative';
    } else if (count === 3) {
      // 3-Player Mode: Show Top, Bottom, Left. Hide Right.
      if (sec1) sec1.classList.remove('hidden');
      if (sec2) sec2.classList.remove('hidden');
      if (sec3) sec3.classList.add('hidden');
      if (grid) grid.className = 'grid grid-cols-3 items-center gap-2 my-auto py-2';
      if (sec2) sec2.className = 'col-span-1 flex flex-col items-start';
      if (col) col.className = 'col-span-2 flex flex-col items-center justify-center relative';
    } else {
      // 4-Player Mode: Show All 4 seats.
      if (sec1) sec1.classList.remove('hidden');
      if (sec2) sec2.classList.remove('hidden');
      if (sec3) sec3.classList.remove('hidden');
      if (grid) grid.className = 'grid grid-cols-4 items-center gap-2 my-auto py-2';
      if (sec2) sec2.className = 'col-span-1 flex flex-col items-start';
      if (col) col.className = 'col-span-2 flex flex-col items-center justify-center relative';
      if (sec3) sec3.className = 'col-span-1 flex flex-col items-end';
    }
  }

  setTargetPlayers(num) {
    this.targetPlayers = parseInt(num, 10) || 4;
    const labels = {
      2: '2 Players (1v1 Match — 26 Cards Each, No Bots)',
      3: '3 Players (3-Way Match — No 4th Bot)',
      4: '4 Players (4-Player Classic)'
    };
    const labelEl = document.getElementById('selectedPlayerCountLabel');
    if (labelEl) labelEl.textContent = labels[this.targetPlayers] || `${this.targetPlayers} Players`;

    const overlayLabel = document.getElementById('startOverlayPlayerCountLabel');
    if (overlayLabel) overlayLabel.textContent = labels[this.targetPlayers] || `${this.targetPlayers} Players`;

    const overlayBtn = document.getElementById('startOverlayBtnText');
    if (overlayBtn) {
      if (this.startModeSelected === 'online') {
        overlayBtn.textContent = 'Go to Online Lobby';
      } else {
        overlayBtn.textContent = this.targetPlayers === 2 ? 'Start Game (1v1)' : `Start Game (${this.targetPlayers} Players)`;
      }
    }

    const aiDesc = document.getElementById('startOverlayAiDesc');
    if (aiDesc) {
      if (this.targetPlayers === 2) aiDesc.textContent = 'Play offline (1v1 against 1 Computer bot)';
      else if (this.targetPlayers === 3) aiDesc.textContent = 'Play offline (against 2 Computer bots)';
      else aiDesc.textContent = 'Play offline against 3 smart bots';
    }

    [2, 3, 4].forEach(n => {
      // Lobby buttons
      const btn = document.getElementById(`btnPlayers_${n}`);
      if (btn) {
        if (n === this.targetPlayers) {
          btn.className = 'py-2 px-2 text-center text-xs font-bold rounded-xl border-2 border-emerald-500 bg-emerald-950/70 text-emerald-200 flex flex-col items-center gap-0.5 shadow-sm transition-all';
          const sub = btn.querySelector('span:last-child');
          if (sub) sub.className = 'text-[9px] text-emerald-400 font-semibold';
        } else {
          btn.className = 'py-2 px-2 text-center text-xs font-bold rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-emerald-500 transition-all flex flex-col items-center gap-0.5';
          const sub = btn.querySelector('span:last-child');
          if (sub) sub.className = 'text-[9px] text-slate-400';
        }
      }

      // Start Screen Overlay buttons
      const overlayBtnN = document.getElementById(`btnOverlayPlayers_${n}`);
      if (overlayBtnN) {
        if (n === this.targetPlayers) {
          overlayBtnN.className = 'py-2 px-2 text-center text-xs font-bold rounded-xl border-2 border-emerald-500 bg-emerald-950/70 text-emerald-200 flex flex-col items-center gap-0.5 shadow-sm transition-all';
          const sub = overlayBtnN.querySelector('span:last-child');
          if (sub) sub.className = 'text-[9px] text-emerald-400 font-semibold';
        } else {
          overlayBtnN.className = 'py-2 px-2 text-center text-xs font-bold rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-emerald-500 transition-all flex flex-col items-center gap-0.5';
          const sub = overlayBtnN.querySelector('span:last-child');
          if (sub) sub.className = 'text-[9px] text-slate-400';
        }
      }
    });

    // Configure Lobby waiting room seat columns
    const col2 = document.getElementById('lobbySeatCol_2');
    const col3 = document.getElementById('lobbySeatCol_3');
    if (col2) col2.classList.toggle('hidden', this.targetPlayers < 3);
    if (col3) col3.classList.toggle('hidden', this.targetPlayers < 4);
  }

  quickSelectStartMode(mode) {
    this.startModeSelected = mode;
    const cardAi = document.getElementById('startCard_ai');
    const cardOnline = document.getElementById('startCard_online');
    const btnText = document.getElementById('startOverlayBtnText');

    if (mode === 'ai') {
      if (cardAi) cardAi.className = 'p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-950/60 cursor-pointer hover:border-emerald-400 transition-all flex items-center gap-3 shadow-md';
      if (cardOnline) cardOnline.className = 'p-3.5 rounded-2xl border border-slate-700 bg-slate-800/80 cursor-pointer hover:border-blue-400 transition-all flex items-center gap-3';
      if (btnText) btnText.textContent = this.targetPlayers === 2 ? 'Start Game (1v1)' : `Start Game (${this.targetPlayers} Players)`;
    } else {
      if (cardOnline) cardOnline.className = 'p-3.5 rounded-2xl border-2 border-blue-500 bg-blue-950/60 cursor-pointer hover:border-blue-400 transition-all flex items-center gap-3 shadow-md';
      if (cardAi) cardAi.className = 'p-3.5 rounded-2xl border border-slate-700 bg-slate-800/80 cursor-pointer hover:border-emerald-400 transition-all flex items-center gap-3';
      if (btnText) btnText.textContent = 'Go to Online Lobby';
    }
  }

  onStartGameClicked() {
    const overlay = document.getElementById('gameStartOverlay');
    if (overlay) overlay.classList.add('hidden');

    if (this.startModeSelected === 'online') {
      this.setMode('online');
    } else {
      this.setMode('ai');
      this.startNewGame();
    }
  }

  setDifficulty(diff) {
    this.gameState.difficulty = diff;
    this.ai.setDifficulty(diff);
    this.ui.showToast(`AI Difficulty set to ${diff.toUpperCase()}`, 'info');
  }

  // ==========================================
  // SINGLE PLAYER VS AI GAME ENGINE
  // ==========================================

  startNewGame() {
    document.getElementById('gameStartOverlay')?.classList.add('hidden');
    this.ui.hideGameOverModal();
    this.ui.playSound('deal');

    const target = this.targetPlayers || 4;

    // 1. Initialize Active Players ONLY (no extra bots!)
    this.gameState.players = [
      { id: 0, name: 'You', type: 'human', hand: [], active: true, finished: false, finishRank: null }
    ];
    for (let i = 1; i < target; i++) {
      this.gameState.players.push({
        id: i,
        name: target === 2 ? 'Computer' : `Computer ${i}`,
        type: 'ai',
        hand: [],
        active: true,
        finished: false,
        finishRank: null
      });
    }

    // 2. Deal 52 Cards (26 to each player in 2-player mode, 18/17/17 in 3-player, 13 each in 4-player)
    const hands = this.deck.deal(target);
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

    // Attach helper methods
    this.gameState.getLegalMoves = (player) => this.getLegalMoves(player);
    this.gameState.getRemainingPlayersInTrickCount = () => this.getRemainingPlayersInTrickCount();

    // 4. Locate player with Ace of Spades (♠A)
    let starterIndex = 0;
    this.gameState.players.forEach(p => {
      if (p.hand.some(c => (c.isAceOfSpades && c.isAceOfSpades()) || (c.suit === 'spades' && c.rank === 'A'))) {
        starterIndex = p.id;
      }
    });

    this.gameState.currentPlayerIndex = starterIndex;

    // 5. Update Layout and Table Player Names
    this.updateTableLayoutForPlayerCount(target);
    this.ui.updatePlayerBoxNames(this.gameState.players, 0);

    // 6. Update UI
    this.renderAll();
    this.ui.updateTableStats(this.gameState);

    const starter = this.gameState.players[starterIndex];
    if (starter.type === 'human') {
      this.ui.showToast('You hold Ace of Spades (♠A)! You start the game by playing ♠A.', 'success');
    } else {
      this.ui.showToast(`${starter.name} holds Ace of Spades (♠A) and starts the game!`, 'info');
    }

    // 7. Begin Turn Flow
    this.processTurn();
  }

  /**
   * Determine legal cards a player is allowed to play
   */
  getLegalMoves(player) {
    if (!player || !player.hand || player.hand.length === 0) return [];

    // First trick: holding ♠A must play ♠A
    const hasAceOfSpades = player.hand.some(c => (c.isAceOfSpades && c.isAceOfSpades()) || (c.suit === 'spades' && c.rank === 'A'));
    if (this.gameState.isFirstTrick && hasAceOfSpades) {
      return player.hand.filter(c => (c.isAceOfSpades && c.isAceOfSpades()) || (c.suit === 'spades' && c.rank === 'A'));
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
    if (!currentPlayer) return;

    // If player already finished or inactive, advance
    if (currentPlayer.finished || !currentPlayer.active) {
      this.nextPlayerTurn();
      return;
    }

    this.renderAll();

    if (this.mode === 'online') {
      // In online mode:
      if (currentPlayer.id === this.mySeat) {
        // Local player's turn: UI renders playable cards and waits for click
      } else if (this.isHost && currentPlayer.type === 'ai') {
        // Host controls AI bots
        setTimeout(() => {
          if (this.gameState.gameOver) return;
          const cardToPlay = this.ai.chooseCard(currentPlayer, this.gameState);
          if (cardToPlay) {
            this.playCard(currentPlayer.id, cardToPlay);
          }
        }, 700 + Math.random() * 300);
      }
    } else {
      // Single player mode:
      if (currentPlayer.type === 'human') {
        // Human turn: UI handles card click
      } else {
        // Computer Turn
        const thinkTime = this.gameState.isFirstTrick && currentPlayer.hand.some(c => (c.isAceOfSpades && c.isAceOfSpades()) || (c.suit === 'spades' && c.rank === 'A')) ? 400 : 700 + Math.random() * 300;

        setTimeout(() => {
          if (this.gameState.gameOver) return;
          const cardToPlay = this.ai.chooseCard(currentPlayer, this.gameState);
          if (cardToPlay) {
            this.playCard(currentPlayer.id, cardToPlay);
          }
        }, thinkTime);
      }
    }
  }

  /**
   * Execute card play
   */
  playCard(playerId, card) {
    const player = this.gameState.players[playerId];
    if (!player) return;

    const cardObj = Card.fromObject ? Card.fromObject(card) : card;

    // Remove card from player hand if hand is tracked
    if (player.hand && player.hand.length > 0) {
      const cardIndex = player.hand.findIndex(c => c.id === cardObj.id);
      if (cardIndex !== -1) {
        player.hand.splice(cardIndex, 1);
      }
    }
    if (player.cardCount !== undefined) {
      player.cardCount = Math.max(0, player.cardCount - 1);
    }

    // Check if this is the first card of trick establishing Lead Suit
    const isLeadingCard = !this.gameState.leadSuit;
    if (isLeadingCard) {
      this.gameState.leadSuit = cardObj.suit;
    }

    // Add to current trick
    this.gameState.currentTrick.push({
      playerId: playerId,
      card: cardObj
    });

    this.ui.playSound('play');
    this.ui.renderCenterTrick(this.gameState.currentTrick, this.gameState.leadSuit);

    // Check if a THULLA happened (Played off-suit when lead suit was already established, and NOT first trick)
    const isThulla = !this.gameState.isFirstTrick && !isLeadingCard && cardObj.suit !== this.gameState.leadSuit;

    // Online Host Broadcast
    if (this.mode === 'online' && this.isHost) {
      this.broadcast({
        type: 'cardPlayed',
        playerId: playerId,
        card: cardObj,
        leadSuit: this.gameState.leadSuit,
        isThulla: isThulla
      });
    }

    // Check if player just emptied their hand (Potential escape)
    const remainingCards = player.cardCount !== undefined ? player.cardCount : (player.hand ? player.hand.length : 0);
    if (remainingCards === 0 && !player.finished) {
      player.finished = true;
      player.finishRank = this.gameState.finishOrder.length + 1;
      this.gameState.finishOrder.push(player);

      if (playerId === this.mySeat) {
        this.ui.showToast('🎉 You have emptied your cards!', 'success');
      } else {
        this.ui.showToast(`${player.name} emptied their cards!`, 'info');
      }
    }

    this.renderAll();

    // In online mode for Guests, Host will tell us when trick finishes
    if (this.mode === 'online' && !this.isHost) {
      return;
    }

    if (isThulla) {
      // THULLA HIT! Round ends IMMEDIATELY
      setTimeout(() => this.evaluateTrick(true, playerId), 800);
    } else {
      // Check if all active players in this trick have played
      const expectedCards = this.getExpectedTrickCount();
      if (this.gameState.currentTrick.length >= expectedCards) {
        setTimeout(() => this.evaluateTrick(false), 800);
      } else {
        this.nextPlayerTurn();
      }
    }
  }

  getExpectedTrickCount() {
    let count = 0;
    this.gameState.players.forEach(p => {
      if (p.active && (!p.finished || this.gameState.currentTrick.some(t => t.playerId === p.id))) {
        count++;
      }
    });
    return Math.max(count, Math.min(2, this.gameState.players.length));
  }

  nextPlayerTurn() {
    const numPlayers = this.gameState.players.length;
    let nextIndex = (this.gameState.currentPlayerIndex + 1) % numPlayers;
    
    let attempts = 0;
    while (attempts < numPlayers) {
      const p = this.gameState.players[nextIndex];
      const hasPlayed = this.gameState.currentTrick.some(t => t.playerId === p.id);
      
      if (!p.finished && !hasPlayed) {
        this.gameState.currentPlayerIndex = nextIndex;
        this.processTurn();
        return;
      }
      nextIndex = (nextIndex + 1) % numPlayers;
      attempts++;
    }

    // If all played, evaluate
    this.evaluateTrick(false);
  }

  /**
   * Evaluate Trick Winner according to standard Bhabhi & Thulla rules
   */
  evaluateTrick(isThulla = false, thullaPlayerId = null) {
    const trick = [...this.gameState.currentTrick];
    const leadSuit = this.gameState.leadSuit;

    if (trick.length === 0) return;

    if (isThulla) {
      // ==========================================
      // THULLA PENALTY RESOLUTION
      // ==========================================
      // 1. Locate player with the HIGHEST card of the lead suit
      let highestValue = -1;
      let penalizedItem = trick[0];

      trick.forEach(item => {
        if (item.card.suit === leadSuit && item.card.value > highestValue) {
          highestValue = item.card.value;
          penalizedItem = item;
        }
      });

      const penalizedPlayer = this.gameState.players[penalizedItem.playerId];
      const thullaPlayer = this.gameState.players[thullaPlayerId] || this.gameState.players[trick[trick.length - 1].playerId];

      // Highlight penalized card
      this.ui.highlightTrickWinner(penalizedItem.playerId, penalizedItem.card, () => {
        this.ui.playSound('thulla');
        this.ui.showToast(`💥 THULLA! ${thullaPlayer.name} hit ${penalizedPlayer.name}! ${penalizedPlayer.name} picks up all ${trick.length} table cards!`, 'danger');

        // Transfer all table cards to penalized player
        if (penalizedPlayer.hand) {
          trick.forEach(t => penalizedPlayer.hand.push(t.card));
          this.deck.sortHand(penalizedPlayer.hand);
        }
        if (penalizedPlayer.cardCount !== undefined) {
          penalizedPlayer.cardCount = (penalizedPlayer.cardCount || 0) + trick.length;
        }

        // If penalized player was marked finished in this trick, revert because they picked up cards!
        if (penalizedPlayer.finished) {
          penalizedPlayer.finished = false;
          penalizedPlayer.finishRank = null;
          const foIndex = this.gameState.finishOrder.findIndex(p => p.id === penalizedPlayer.id);
          if (foIndex !== -1) {
            this.gameState.finishOrder.splice(foIndex, 1);
          }
        }

        this.gameState.lastTrick = [...trick];
        this.gameState.currentTrick = [];
        this.gameState.leadSuit = null;
        this.gameState.trickNumber++;

        this.ui.animateTrickClear(() => {
          this.ui.updateTableStats(this.gameState);

          if (this.checkGameOver()) return;

          // Penalized player who picked up the cards now HAS THE POWER to start next round
          this.gameState.currentPlayerIndex = penalizedPlayer.id;

          // Broadcast to online clients
          if (this.mode === 'online' && this.isHost) {
            this.broadcast({
              type: 'trickCleared',
              isThulla: true,
              penalizedPlayerId: penalizedPlayer.id,
              trickNumber: this.gameState.trickNumber,
              nextStarter: this.gameState.currentPlayerIndex,
              trickCards: trick.map(t => t.card),
              playerHandsCount: this.gameState.players.map(p => p.hand ? p.hand.length : (p.cardCount || 0)),
              finishOrder: this.gameState.finishOrder.map(p => ({ id: p.id, name: p.name, finishRank: p.finishRank }))
            });
          }

          this.renderAll();
          this.processTurn();
        });
      });

    } else {
      // ==========================================
      // CLEAN TRICK RESOLUTION (No Thulla)
      // ==========================================
      let highestValue = -1;
      let winningItem = trick[0];

      trick.forEach(item => {
        if (item.card.suit === leadSuit && item.card.value > highestValue) {
          highestValue = item.card.value;
          winningItem = item;
        }
      });

      const winnerPlayer = this.gameState.players[winningItem.playerId];

      if (this.mode === 'online' && this.isHost) {
        this.broadcast({
          type: 'trickWinner',
          winningPlayerId: winningItem.playerId,
          winningCard: winningItem.card
        });
      }

      this.ui.highlightTrickWinner(winningItem.playerId, winningItem.card, () => {
        this.gameState.lastTrick = [...trick];
        // Clean trick: permanently discarded to waste pile
        trick.forEach(item => this.gameState.discardPile.push(item.card));
        this.gameState.currentTrick = [];
        this.gameState.leadSuit = null;
        this.gameState.isFirstTrick = false;
        this.gameState.trickNumber++;

        this.ui.animateTrickClear(() => {
          this.ui.updateTableStats(this.gameState);

          if (this.checkGameOver()) return;

          // Determine next starting player
          if (winnerPlayer.finished) {
            this.gameState.currentPlayerIndex = this.getNextActivePlayerIndex(winnerPlayer.id);
          } else {
            this.gameState.currentPlayerIndex = winnerPlayer.id;
          }

          if (this.mode === 'online' && this.isHost) {
            this.broadcast({
              type: 'trickCleared',
              isThulla: false,
              trickNumber: this.gameState.trickNumber,
              nextStarter: this.gameState.currentPlayerIndex,
              playerHandsCount: this.gameState.players.map(p => p.hand ? p.hand.length : (p.cardCount || 0)),
              finishOrder: this.gameState.finishOrder.map(p => ({ id: p.id, name: p.name, finishRank: p.finishRank }))
            });
          }

          this.renderAll();
          this.processTurn();
        });
      });
    }
  }

  getNextActivePlayerIndex(startIndex) {
    const numPlayers = this.gameState.players.length;
    let next = (startIndex + 1) % numPlayers;
    for (let i = 0; i < numPlayers; i++) {
      if (!this.gameState.players[next].finished) {
        return next;
      }
      next = (next + 1) % numPlayers;
    }
    return 0;
  }

  /**
   * Check if game has ended
   */
  checkGameOver() {
    const remainingActive = this.gameState.players.filter(p => {
      const count = p.cardCount !== undefined ? p.cardCount : (p.hand ? p.hand.length : 0);
      return !p.finished && count > 0;
    });

    if (remainingActive.length <= 1) {
      this.gameState.gameOver = true;
      this.gameState.bhabhi = remainingActive[0] || null;

      // Update LocalStorage Stats
      this.stats.gamesPlayed++;
      if (this.gameState.bhabhi && this.gameState.bhabhi.id === this.mySeat) {
        this.stats.timesBhabhi++;
        this.stats.currentStreak = 0;
      } else {
        this.stats.gamesWon++;
        this.stats.currentStreak++;
        if (this.stats.currentStreak > this.stats.bestStreak) {
          this.stats.bestStreak = this.stats.currentStreak;
        }
      }
      this.saveStats();

      if (this.mode === 'online' && this.isHost) {
        this.broadcast({
          type: 'gameOver',
          bhabhi: this.gameState.bhabhi,
          finishOrder: this.gameState.finishOrder.map(p => ({ id: p.id, name: p.name, finishRank: p.finishRank }))
        });
      }

      this.ui.showGameOverModal(this.gameState, this.stats);
      return true;
    }

    return false;
  }

  renderAll() {
    const localPlayer = this.gameState.players[this.mySeat];
    if (localPlayer) {
      this.ui.renderHumanHand(localPlayer, this.gameState, (card) => {
        if (this.mode === 'online' && !this.isHost) {
          // Guest clicked card: send to Host
          if (this.hostConnection && this.hostConnection.open) {
            this.hostConnection.send({
              type: 'playCard',
              card: card
            });
          }
        } else {
          // Single player or Host
          this.playCard(localPlayer.id, card);
        }
      });
    }

    this.ui.renderComputerHands(this.gameState.players, this.gameState, this.mySeat);
  }

  // ==========================================
  // WEBRTC P2P MULTIPLAYER ROOM (PEERJS)
  // ==========================================

  createOnlineRoom() {
    this.cleanupPeer();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const peerId = `360tools-bhabhi-${code}`;

    this.isHost = true;
    this.mySeat = 0;
    this.onlineRoomId = code;
    this.guestConnections = [null, null, null, null];

    const target = this.targetPlayers || 4;
    this.lobbySeats = [
      { id: 0, name: 'You (Host)', type: 'human', status: 'ready' }
    ];

    for (let i = 1; i < target; i++) {
      this.lobbySeats.push({
        id: i,
        name: target === 2 ? 'Waiting for Friend...' : `Waiting for Friend ${i}...`,
        type: 'human',
        status: 'empty'
      });
    }

    if (typeof Peer === 'undefined') {
      this.ui.showToast('PeerJS library failed to load. Check internet connection.', 'danger');
      return;
    }

    this.peer = new Peer(peerId, { debug: 1 });

    this.peer.on('open', () => {
      this.showLobbySection('waiting');
      
      const codeEl = document.getElementById('bhabhiDisplayCode');
      const waBtn = document.getElementById('bhabhiWaShareBtn');

      if (codeEl) codeEl.textContent = code;

      // Configure visible seats in lobby
      const col2 = document.getElementById('lobbySeatCol_2');
      const col3 = document.getElementById('lobbySeatCol_3');
      if (col2) col2.classList.toggle('hidden', target < 3);
      if (col3) col3.classList.toggle('hidden', target < 4);

      if (waBtn) {
        const shareUrl = `${window.location.origin}${window.location.pathname}?room=${code}`;
        const msg = encodeURIComponent(`🎴 Play Bhabhi Thulla Card Game Online with me! Click to join my ${target}-player 1v1 game room:\n${shareUrl}\n\nOr enter Room Code: ${code}`);
        waBtn.href = `https://api.whatsapp.com/send?text=${msg}`;
      }

      this.ui.updateLobbySeats(this.lobbySeats, 0);
      this.updateHostLobbyState();
      this.ui.showToast(`Game Room #${code} created! Waiting for friends to join...`, 'success');
    });

    this.peer.on('connection', (conn) => {
      this.handleHostIncomingConnection(conn);
    });

    this.peer.on('error', (err) => {
      console.error('PeerJS Host Error:', err);
      if (err.type === 'unavailable-id') {
        this.createOnlineRoom(); // Retry with new code
      } else {
        this.ui.showToast(`Multiplayer error: ${err.message || 'Connection failed'}`, 'danger');
      }
    });
  }

  updateHostLobbyState() {
    if (!this.isHost) return;
    const target = this.targetPlayers || 4;
    const maxGuests = target - 1;
    const connectedGuests = this.guestConnections.filter(c => c && c.open).length;
    const allReady = connectedGuests >= maxGuests;

    const statusText = document.getElementById('bhabhiLobbyStatusText');
    const startBtn = document.getElementById('bhabhiHostStartBtn');

    if (statusText) {
      if (allReady) {
        statusText.innerHTML = `<span class="text-emerald-400 font-black"><i class="fa-solid fa-circle-check text-emerald-400"></i> All ${target} Players Connected — Ready to Start!</span>`;
      } else {
        const remaining = maxGuests - connectedGuests;
        statusText.innerHTML = `<span class="text-amber-300 font-bold flex items-center gap-1.5"><i class="fa-solid fa-spinner fa-spin text-amber-400"></i> Waiting for ${remaining} friend${remaining === 1 ? '' : 's'} to join (${connectedGuests + 1}/${target} Members)...</span>`;
      }
    }

    if (startBtn) {
      startBtn.classList.remove('hidden');
      if (allReady) {
        startBtn.className = 'py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-emerald-400';
        startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Match Now (${target} Players Ready)`;
      } else {
        startBtn.className = 'py-2.5 px-6 bg-slate-800/90 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all hover:bg-slate-800 cursor-pointer';
        startBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-amber-400"></i> Waiting for Friends (${connectedGuests + 1}/${target})...`;
      }
    }
  }

  handleHostIncomingConnection(conn) {
    conn.on('open', () => {
      const target = this.targetPlayers || 4;
      const maxGuests = target - 1;
      let assignedSeat = -1;
      for (let i = 1; i <= maxGuests; i++) {
        if (!this.guestConnections[i] || !this.guestConnections[i].open) {
          assignedSeat = i;
          break;
        }
      }

      if (assignedSeat === -1) {
        conn.send({ type: 'error', message: `Room is already full for ${this.targetPlayers} players!` });
        setTimeout(() => conn.close(), 500);
        return;
      }

      this.guestConnections[assignedSeat] = conn;
      this.lobbySeats[assignedSeat] = {
        id: assignedSeat,
        name: target === 2 ? 'Friend' : `Friend (Player ${assignedSeat + 1})`,
        type: 'human',
        status: 'connected'
      };

      // Send join confirmation to the new guest
      conn.send({
        type: 'joined',
        seat: assignedSeat,
        code: this.onlineRoomId,
        targetPlayers: target,
        lobbySeats: this.lobbySeats
      });

      // Broadcast updated lobby to everyone
      this.broadcast({
        type: 'lobbyUpdate',
        targetPlayers: target,
        lobbySeats: this.lobbySeats
      });

      this.ui.updateLobbySeats(this.lobbySeats, 0);
      this.updateHostLobbyState();

      // Check if all selected friends have joined
      const connectedFriends = this.guestConnections.filter(c => c && c.open).length;
      if (connectedFriends >= maxGuests) {
        this.ui.showToast(`🎉 All ${this.targetPlayers} players joined! Click "Start Match Now" to begin.`, 'success');
      } else {
        this.ui.showToast(`Friend joined into Seat ${assignedSeat + 1}! (${connectedFriends + 1}/${this.targetPlayers} Members)`, 'info');
      }
    });

    conn.on('data', (data) => {
      // Locate seat for this connection
      const seat = this.guestConnections.indexOf(conn);
      if (seat !== -1) {
        this.handleHostReceiveData(seat, data);
      }
    });

    conn.on('close', () => {
      const seat = this.guestConnections.indexOf(conn);
      if (seat !== -1) {
        this.guestConnections[seat] = null;
        const target = this.targetPlayers || 4;
        this.lobbySeats[seat] = { 
          id: seat, 
          name: target === 2 ? 'Waiting for Friend...' : `Waiting for Friend ${seat}...`, 
          type: 'human', 
          status: 'empty' 
        };

        if (!this.gameState.gameStarted) {
          this.broadcast({ type: 'lobbyUpdate', lobbySeats: this.lobbySeats, targetPlayers: target });
          this.ui.updateLobbySeats(this.lobbySeats, 0);
          this.updateHostLobbyState();
          this.ui.showToast(`Player from Seat ${seat + 1} disconnected.`, 'info');
        } else {
          // If game in progress, convert that seat to AI
          if (this.gameState.players[seat]) {
            this.gameState.players[seat].type = 'ai';
            this.gameState.players[seat].name = target === 2 ? 'Computer' : `Computer ${seat}`;
          }
          this.ui.showToast(`Player ${seat + 1} disconnected. Computer will play for them.`, 'warning');
        }
      }
    });
  }

  handleHostReceiveData(guestSeat, data) {
    if (data.type === 'playCard') {
      if (this.gameState.currentPlayerIndex === guestSeat && !this.gameState.gameOver) {
        const cardObj = Card.fromObject(data.card);
        this.playCard(guestSeat, cardObj);
      }
    }
  }

  joinOnlineRoom(providedCode = null) {
    const input = document.getElementById('bhabhiJoinInput');
    const code = (providedCode || input?.value || '').trim();

    if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
      this.ui.showToast('Please enter a valid 6-digit Room Code!', 'warning');
      return;
    }

    this.cleanupPeer();
    this.isHost = false;
    this.onlineRoomId = code;

    if (typeof Peer === 'undefined') {
      this.ui.showToast('PeerJS library failed to load. Check internet connection.', 'danger');
      return;
    }

    this.peer = new Peer(null, { debug: 1 });

    this.peer.on('open', () => {
      const conn = this.peer.connect(`360tools-bhabhi-${code}`, { reliable: true });
      this.hostConnection = conn;

      conn.on('open', () => {
        this.showLobbySection('waiting');
        
        const codeEl = document.getElementById('bhabhiDisplayCode');
        const statusText = document.getElementById('bhabhiLobbyStatusText');
        const startBtn = document.getElementById('bhabhiHostStartBtn');

        if (codeEl) codeEl.textContent = code;
        if (statusText) statusText.textContent = 'Connected to Room! Waiting for Host to start match...';
        if (startBtn) startBtn.classList.add('hidden');

        this.ui.showToast(`Connected to Room #${code}! Waiting for Host...`, 'success');
      });

      conn.on('data', (data) => {
        this.handleGuestReceiveData(data);
      });

      conn.on('close', () => {
        this.ui.showToast('Host disconnected or closed the room.', 'danger');
        this.setMode('ai');
      });
    });

    this.peer.on('error', (err) => {
      console.error('PeerJS Guest Error:', err);
      this.ui.showToast(`Could not connect to Room #${code}. Check the code and try again.`, 'danger');
      this.showLobbySection('initial');
    });
  }

  handleGuestReceiveData(data) {
    if (data.type === 'joined' || data.type === 'lobbyUpdate') {
      if (data.type === 'joined') {
        this.mySeat = data.seat;
        if (data.code) this.onlineRoomId = data.code;
      }
      this.lobbySeats = data.lobbySeats;
      const target = data.targetPlayers || this.targetPlayers || 4;
      this.targetPlayers = target;
      this.ui.updateLobbySeats(this.lobbySeats, this.mySeat);

      const statusText = document.getElementById('bhabhiLobbyStatusText');
      const startBtn = document.getElementById('bhabhiHostStartBtn');
      if (startBtn) startBtn.classList.add('hidden');

      const connectedCount = this.lobbySeats.filter(s => s.status === 'connected' || s.id === 0).length;
      if (statusText) {
        if (connectedCount >= target) {
          statusText.innerHTML = `<span class="text-emerald-400 font-black"><i class="fa-solid fa-circle-check text-emerald-400"></i> All Players Connected (${target}/${target}) — Waiting for Host to Start...</span>`;
        } else {
          statusText.innerHTML = `<span class="text-blue-300 font-bold flex items-center gap-1.5"><i class="fa-solid fa-spinner fa-spin text-blue-400"></i> Connected! Waiting for other friends (${connectedCount}/${target} Members)...</span>`;
        }
      }
    } else if (data.type === 'gameStart') {
      this.mySeat = data.mySeat;
      const target = data.targetPlayers || data.players.length;
      this.targetPlayers = target;
      this.showLobbySection('connected');
      document.getElementById('gameStartOverlay')?.classList.add('hidden');
      document.getElementById('gameTableArea')?.classList.remove('hidden');

      // Update Role Strip
      const liveBadge = document.getElementById('bhabhiLiveRoomBadge');
      const roleText = document.getElementById('bhabhiOnlineRoleText');
      if (liveBadge) liveBadge.textContent = `Room: ${this.onlineRoomId} (${target}P)`;
      if (roleText) roleText.textContent = `You are playing in Seat ${this.mySeat + 1}`;

      // Initialize Players
      const initialCardsPerPlayer = Math.floor(52 / data.players.length);
      this.gameState.players = data.players.map(p => {
        const isMe = p.id === this.mySeat;
        return {
          id: p.id,
          name: isMe ? `${p.name} (You)` : p.name,
          type: isMe ? 'human' : p.type,
          hand: isMe ? data.myHand.map(c => Card.fromObject(c)) : [],
          cardCount: isMe ? (data.myHand?.length || initialCardsPerPlayer) : initialCardsPerPlayer,
          active: true,
          finished: false,
          finishRank: null
        };
      });

      // Update Table Layout and Player Boxes
      this.updateTableLayoutForPlayerCount(target);
      this.ui.updatePlayerBoxNames(this.gameState.players, this.mySeat);

      this.gameState.leadSuit = null;
      this.gameState.currentTrick = [];
      this.gameState.discardPile = [];
      this.gameState.finishOrder = [];
      this.gameState.trickNumber = 1;
      this.gameState.isFirstTrick = true;
      this.gameState.gameStarted = true;
      this.gameState.gameOver = false;
      this.gameState.bhabhi = null;
      this.gameState.currentPlayerIndex = data.starterIndex;

      // Attach helpers
      this.gameState.getLegalMoves = (player) => this.getLegalMoves(player);
      this.gameState.getRemainingPlayersInTrickCount = () => this.getRemainingPlayersInTrickCount();

      this.ui.playSound('deal');
      this.renderAll();
      this.ui.updateTableStats(this.gameState);

      const starter = this.gameState.players[data.starterIndex];
      if (data.starterIndex === this.mySeat) {
        this.ui.showToast('You hold Ace of Spades (♠A)! You start the game by playing ♠A.', 'success');
      } else {
        this.ui.showToast(`${starter.name} holds Ace of Spades (♠A) and starts the game!`, 'info');
      }
    } else if (data.type === 'cardPlayed') {
      const cardObj = Card.fromObject(data.card);
      const player = this.gameState.players[data.playerId];

      if (data.playerId === this.mySeat) {
        if (player && player.hand) {
          const idx = player.hand.findIndex(c => c.id === cardObj.id);
          if (idx !== -1) player.hand.splice(idx, 1);
        }
      } else {
        if (player) {
          player.cardCount = Math.max(0, (player.cardCount || 13) - 1);
        }
      }

      this.gameState.leadSuit = data.leadSuit;
      this.gameState.currentTrick.push({
        playerId: data.playerId,
        card: cardObj
      });

      this.ui.playSound('play');
      this.ui.renderCenterTrick(this.gameState.currentTrick, this.gameState.leadSuit);

      // Check if player just became safe
      const count = data.playerId === this.mySeat ? (player.hand ? player.hand.length : 0) : player.cardCount;
      if (count === 0 && player && !player.finished) {
        player.finished = true;
        player.finishRank = this.gameState.finishOrder.length + 1;
        this.gameState.finishOrder.push(player);

        if (data.playerId === this.mySeat) {
          this.ui.showToast('🎉 Congratulations! You have emptied all your cards and are SAFE!', 'success');
        } else {
          this.ui.showToast(`${player.name} is SAFE (#${player.finishRank})!`, 'info');
        }
      }

      this.renderAll();
    } else if (data.type === 'trickWinner') {
      const cardObj = Card.fromObject(data.winningCard);
      this.ui.highlightTrickWinner(data.winningPlayerId, cardObj);
    } else if (data.type === 'trickCleared') {
      this.ui.animateTrickClear(() => {
        const isThulla = data.isThulla;
        this.gameState.currentTrick = [];
        this.gameState.leadSuit = null;
        this.gameState.isFirstTrick = false;
        this.gameState.trickNumber = data.trickNumber;
        this.gameState.currentPlayerIndex = data.nextStarter;

        if (isThulla) {
          this.ui.playSound('thulla');
          const penalizedPlayer = this.gameState.players[data.penalizedPlayerId];
          if (penalizedPlayer) {
            if (data.penalizedPlayerId === this.mySeat) {
              (data.trickCards || []).forEach(c => {
                this.gameState.players[this.mySeat].hand.push(Card.fromObject(c));
              });
              this.deck.sortHand(this.gameState.players[this.mySeat].hand);
              this.gameState.players[this.mySeat].finished = false;
              this.gameState.players[this.mySeat].finishRank = null;
              this.ui.showToast(`💥 You were hit with a THULLA and picked up ${data.trickCards?.length || 0} table cards! You have The Power.`, 'danger');
            } else {
              this.ui.showToast(`💥 THULLA! ${penalizedPlayer.name} picked up table cards and has The Power.`, 'warning');
            }
          }
        }

        if (data.playerHandsCount) {
          data.playerHandsCount.forEach((cnt, idx) => {
            if (idx !== this.mySeat && this.gameState.players[idx]) {
              this.gameState.players[idx].cardCount = cnt;
            }
          });
        }

        if (data.finishOrder) {
          this.gameState.finishOrder = data.finishOrder;
          this.gameState.players.forEach(p => {
            const fo = data.finishOrder.find(item => item.id === p.id);
            if (fo) {
              p.finished = true;
              p.finishRank = fo.finishRank;
            } else {
              p.finished = false;
              p.finishRank = null;
            }
          });
        }

        this.ui.updateTableStats(this.gameState);
        this.renderAll();
      });
    } else if (data.type === 'gameOver') {
      this.gameState.gameOver = true;
      this.gameState.bhabhi = data.bhabhi;
      this.gameState.finishOrder = data.finishOrder;

      this.stats.gamesPlayed++;
      if (this.gameState.bhabhi && this.gameState.bhabhi.id === this.mySeat) {
        this.stats.timesBhabhi++;
        this.stats.currentStreak = 0;
      } else {
        this.stats.gamesWon++;
        this.stats.currentStreak++;
        if (this.stats.currentStreak > this.stats.bestStreak) {
          this.stats.bestStreak = this.stats.currentStreak;
        }
      }
      this.saveStats();

      this.ui.showGameOverModal(this.gameState, this.stats);
    } else if (data.type === 'error') {
      this.ui.showToast(data.message || 'Multiplayer error', 'danger');
    }
  }

  hostStartMatch() {
    if (!this.isHost) return;

    const target = this.targetPlayers || 4;
    const maxGuests = target - 1;
    const connectedGuests = this.guestConnections.filter(c => c && c.open).length;

    if (connectedGuests < maxGuests) {
      const remaining = maxGuests - connectedGuests;
      this.ui.showToast(`⏳ Please wait! Waiting for ${remaining} more friend${remaining === 1 ? '' : 's'} to join room #${this.onlineRoomId}. Share the code with them!`, 'warning');
      this.updateHostLobbyState();
      return;
    }

    document.getElementById('gameStartOverlay')?.classList.add('hidden');
    document.getElementById('gameTableArea')?.classList.remove('hidden');

    this.ui.hideGameOverModal();
    this.ui.playSound('deal');
    this.showLobbySection('connected');

    const liveBadge = document.getElementById('bhabhiLiveRoomBadge');
    const roleText = document.getElementById('bhabhiOnlineRoleText');
    if (liveBadge) liveBadge.textContent = `Room: ${this.onlineRoomId} (${target}P)`;
    if (roleText) roleText.textContent = `You are Host (Seat 1)`;

    // 1. Initialize ONLY real human players (100% human players, NO AI BOTS!)
    this.gameState.players = [
      { id: 0, name: 'You (Host)', type: 'human', hand: [], active: true, finished: false, finishRank: null }
    ];
    for (let i = 1; i < target; i++) {
      const name = target === 2 ? 'Friend' : `Friend ${i}`;
      this.gameState.players.push({
        id: i,
        name: name,
        type: 'human',
        hand: [],
        active: true,
        finished: false,
        finishRank: null
      });
    }

    // 2. Deal 52 Cards evenly (26 each for 2 players, 18/17/17 for 3, 13 for 4)
    const hands = this.deck.deal(target);
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

    // Attach helper methods
    this.gameState.getLegalMoves = (player) => this.getLegalMoves(player);
    this.gameState.getRemainingPlayersInTrickCount = () => this.getRemainingPlayersInTrickCount();

    // 4. Locate starter holding ♠A
    let starterIndex = 0;
    this.gameState.players.forEach(p => {
      if (p.hand.some(c => (c.isAceOfSpades && c.isAceOfSpades()) || (c.suit === 'spades' && c.rank === 'A'))) {
        starterIndex = p.id;
      }
    });

    this.gameState.currentPlayerIndex = starterIndex;

    // 5. Send Game Start packet to each connected guest with their own private hand
    for (let i = 1; i < target; i++) {
      const conn = this.guestConnections[i];
      if (conn && conn.open) {
        conn.send({
          type: 'gameStart',
          targetPlayers: target,
          mySeat: i,
          myHand: hands[i],
          starterIndex: starterIndex,
          players: this.gameState.players.map(p => ({ id: p.id, name: p.name, type: p.type })),
          trickNumber: 1
        });
      }
    }

    // 6. Update Host Layout and Names
    this.updateTableLayoutForPlayerCount(target);
    this.ui.updatePlayerBoxNames(this.gameState.players, 0);
    this.renderAll();
    this.ui.updateTableStats(this.gameState);

    const starter = this.gameState.players[starterIndex];
    if (starter.id === 0) {
      this.ui.showToast('You hold Ace of Spades (♠A)! You start the game by playing ♠A.', 'success');
    } else {
      this.ui.showToast(`${starter.name} holds Ace of Spades (♠A) and starts the game!`, 'info');
    }

    // 7. Begin Turn Flow
    this.processTurn();
  }

  broadcast(data) {
    const target = this.targetPlayers || 4;
    for (let i = 1; i < target; i++) {
      const conn = this.guestConnections[i];
      if (conn && conn.open) {
        try {
          conn.send(data);
        } catch (e) {
          console.error(`Failed to send data to seat ${i}:`, e);
        }
      }
    }
  }

  copyRoomCode() {
    if (!this.onlineRoomId) return;
    navigator.clipboard.writeText(this.onlineRoomId).then(() => {
      const btnText = document.getElementById('bhabhiCopyCodeText');
      if (btnText) {
        const orig = btnText.textContent;
        btnText.textContent = 'Copied!';
        setTimeout(() => { btnText.textContent = orig; }, 2000);
      }
      this.ui.showToast('Room Code copied to clipboard!', 'success');
    });
  }

  copyRoomLink() {
    if (!this.onlineRoomId) return;
    const url = `${window.location.origin}${window.location.pathname}?room=${this.onlineRoomId}`;
    navigator.clipboard.writeText(url).then(() => {
      const btnText = document.getElementById('bhabhiCopyLinkText');
      if (btnText) {
        const orig = btnText.textContent;
        btnText.textContent = 'Copied!';
        setTimeout(() => { btnText.textContent = orig; }, 2000);
      }
      this.ui.showToast('Invite Link copied to clipboard!', 'success');
    });
  }

  leaveOnlineRoom() {
    this.cleanupPeer();
    this.setMode('ai');
    this.ui.showToast('Left online room.', 'info');
  }

  cleanupPeer() {
    if (this.hostConnection) {
      try { this.hostConnection.close(); } catch (e) {}
      this.hostConnection = null;
    }
    if (this.guestConnections) {
      this.guestConnections.forEach(conn => {
        if (conn) {
          try { conn.close(); } catch (e) {}
        }
      });
      this.guestConnections = [null, null, null, null];
    }
    if (this.peer) {
      try { this.peer.destroy(); } catch (e) {}
      this.peer = null;
    }
  }

  toggleFullscreen() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    const icon = document.getElementById('fullscreenIcon');

    if (!isFullscreen) {
      const docEl = document.documentElement;
      const requestFs = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
      if (requestFs) {
        requestFs.call(docEl).then(() => {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(() => {});
          }
        }).catch(() => {});
      }
      if (icon) icon.className = 'fa-solid fa-compress text-amber-400';
      this.ui.showToast('Immersive Fullscreen App Mode activated! 📱', 'success');
    } else {
      const exitFs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      if (exitFs) {
        exitFs.call(document).catch(() => {});
      }
      if (icon) icon.className = 'fa-solid fa-expand text-emerald-400';
      this.ui.showToast('Exited Fullscreen mode.', 'info');
    }
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
});
