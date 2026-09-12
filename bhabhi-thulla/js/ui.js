/**
 * UI & Sound Controller for Bhabhi Thulla
 */

class BhabhiUI {
  constructor() {
    this.soundEnabled = true;
    this.audioCtx = null;
  }

  getAudioCtx() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioCtx;
  }

  // Web Audio Synthesizer
  playSound(type) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      if (type === 'deal') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 + Math.random() * 80, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'play') {
        if (navigator.vibrate) navigator.vibrate(30);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'trick') {
        // Double chime
        [523.25, 659.25].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.09);
          osc.stop(ctx.currentTime + i * 0.09 + 0.15);
        });
      } else if (type === 'invalid') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'win') {
        // Victory Fanfare
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.1);
          osc.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
      } else if (type === 'thulla') {
        // Dramatic impact thulla sound & haptics
        if (navigator.vibrate) navigator.vibrate([60, 40, 80]);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'bhabhi') {
        // Defeat Sound
        [300, 260, 220, 180].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.25);
        });
      }
    } catch (e) {}
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('soundToggleBtn');
    const icon = document.getElementById('soundIcon');
    if (icon) {
      icon.className = this.soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark text-rose-400';
    }
    return this.soundEnabled;
  }

  /**
   * Render HTML for a Playing Card
   */
  createCardElement(card, isPlayable = false, onClick = null) {
    const cardEl = document.createElement('div');
    cardEl.className = `playing-card ${card.color} ${isPlayable ? 'playable' : 'not-playable'}`;
    cardEl.dataset.cardId = card.id;

    cardEl.innerHTML = `
      <div class="card-corner top-left">
        <span class="card-rank">${card.rank}</span>
        <span class="card-suit">${card.symbol}</span>
      </div>
      <div class="card-center-pip">
        <span>${card.symbol}</span>
      </div>
      <div class="card-corner bottom-right">
        <span class="card-rank">${card.rank}</span>
        <span class="card-suit">${card.symbol}</span>
      </div>
    `;

    if (onClick) {
      cardEl.addEventListener('click', () => onClick(card));
    }

    return cardEl;
  }

  /**
   * Render Human Player's Hand
   */
  /**
   * Render Human / Local Player's Hand
   */
  renderHumanHand(player, gameState, onCardSelected) {
    const handContainer = document.getElementById('humanHandContainer');
    if (!handContainer) return;

    handContainer.innerHTML = '';

    if (player.finished || (player.hand && player.hand.length === 0)) {
      handContainer.innerHTML = `
        <div class="text-emerald-400 font-black text-sm sm:text-base flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-6 py-3 rounded-2xl animate-bounce">
          <i class="fa-solid fa-circle-check text-xl"></i> YOU HAVE ESCAPED! (SAFE)
        </div>
      `;
      return;
    }

    const isMyTurn = gameState.currentPlayerIndex === player.id && !gameState.gameOver;
    const legalCards = gameState.getLegalMoves ? gameState.getLegalMoves(player) : [];

    (player.hand || []).forEach((card, index) => {
      const isPlayable = isMyTurn && legalCards.some(lc => lc.id === card.id);
      
      const cardEl = this.createCardElement(card, isPlayable, (selectedCard) => {
        if (!isMyTurn) {
          this.showToast("It's not your turn yet!", "info");
          return;
        }
        if (!isPlayable) {
          this.playSound('invalid');
          if (gameState.isFirstTrick) {
            this.showToast("You must play Ace of Spades (♠A) first!", "warning");
          } else if (gameState.leadSuit) {
            const suitName = SUITS[gameState.leadSuit.toUpperCase()]?.name || gameState.leadSuit;
            this.showToast(`You must follow ${suitName} (${SUITS[gameState.leadSuit.toUpperCase()]?.symbol || ''})!`, "warning");
          }
          return;
        }
        onCardSelected(selectedCard);
      });

      // Stagger animation on initial render
      cardEl.style.animationDelay = `${index * 25}ms`;
      handContainer.appendChild(cardEl);
    });

    // Update Player Status Pill
    this.updatePlayerStatus(player, isMyTurn);
  }

  /**
   * Render Opponents / Computer Player Hands (Card backs & counts)
   */
  renderComputerHands(players, gameState, mySeat = 0) {
    players.forEach(p => {
      if (p.id === mySeat) return;

      const container = document.getElementById(`computerCards_${p.id}`);
      const countEl = document.getElementById(`computerCount_${p.id}`);
      const isTurn = gameState.currentPlayerIndex === p.id && !gameState.gameOver;
      const count = p.cardCount !== undefined ? p.cardCount : (p.hand ? p.hand.length : 0);

      if (countEl) {
        if (p.finished) {
          countEl.innerHTML = `<span class="text-emerald-400 font-bold"><i class="fa-solid fa-check"></i> Safe (#${p.finishRank || '✓'})</span>`;
        } else {
          countEl.innerHTML = `<span class="text-slate-300 font-bold">${count} card${count === 1 ? '' : 's'}</span>`;
        }
      }

      if (container) {
        container.innerHTML = '';
        if (!p.finished && count > 0) {
          // Render overlapping miniature card backs
          const cardCount = Math.min(count, 13);
          for (let i = 0; i < cardCount; i++) {
            const backEl = document.createElement('div');
            backEl.className = 'card-back-mini';
            container.appendChild(backEl);
          }
        }
      }

      // Update Turn glow
      this.updatePlayerStatus(p, isTurn);
    });
  }

  /**
   * Update Player Box Names & Avatars on Table
   */
  updatePlayerBoxNames(players, mySeat = 0) {
    players.forEach(p => {
      const nameEl = document.getElementById(`playerName_${p.id}`);
      const avatarEl = document.getElementById(`playerAvatar_${p.id}`);
      
      if (nameEl) {
        if (p.id === mySeat) {
          nameEl.textContent = p.name ? `${p.name} (You)` : 'You';
        } else {
          nameEl.textContent = p.name || `Player ${p.id + 1}`;
        }
      }

      if (avatarEl && p.type) {
        if (p.type === 'human') {
          avatarEl.innerHTML = `<i class="fa-solid fa-user"></i>`;
        } else {
          avatarEl.textContent = `C${p.id}`;
        }
      }
    });
  }

  /**
   * Update Waiting Room Lobby Seats
   */
  updateLobbySeats(seats = [], mySeat = 0) {
    seats.forEach((seat, idx) => {
      const el = document.getElementById(`lobbySeat_${idx}`);
      if (!el) return;

      if (seat.type === 'human' && seat.status === 'connected') {
        const isMe = idx === mySeat;
        el.className = 'text-xs font-bold text-white flex items-center gap-1.5 mt-1';
        el.innerHTML = isMe 
          ? `<i class="fa-solid fa-circle-check text-emerald-400 text-[11px]"></i> <span class="text-emerald-300 font-black">${seat.name} (You)</span>`
          : `<i class="fa-solid fa-user text-blue-400 text-[11px]"></i> <span class="text-blue-200">${seat.name}</span>`;
      } else if (idx === 0) {
        el.className = 'text-xs font-bold text-white flex items-center gap-1.5 mt-1';
        el.innerHTML = `<i class="fa-solid fa-crown text-amber-400 text-[11px]"></i> <span>${seat.name || 'You (Host)'}</span>`;
      } else if (seat.status === 'empty') {
        el.className = 'text-xs font-bold text-amber-300 flex items-center gap-1.5 mt-1 animate-pulse';
        el.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-amber-400 text-[11px]"></i> <span>Waiting for Friend...</span>`;
      } else {
        el.className = 'text-xs font-bold text-slate-400 flex items-center gap-1.5 mt-1';
        el.innerHTML = `<i class="fa-solid fa-robot text-slate-500 text-[11px]"></i> <span>AI Bot (Auto-filled)</span>`;
      }
    });
  }

  /**
   * Update Player Box Status & Turn Highlight
   */
  updatePlayerStatus(player, isTurn) {
    const box = document.getElementById(`playerBox_${player.id}`);
    const badge = document.getElementById(`playerBadge_${player.id}`);

    if (!box || !badge) return;

    box.classList.remove('active-turn', 'player-safe', 'player-bhabhi');

    if (player.finished) {
      box.classList.add('player-safe');
      badge.innerHTML = `<span class="badge-safe"><i class="fa-solid fa-check mr-1"></i> SAFE</span>`;
    } else if (isTurn) {
      box.classList.add('active-turn');
      if (player.type === 'human') {
        badge.innerHTML = `<span class="badge-turn animate-pulse"><i class="fa-solid fa-play mr-1"></i> YOUR TURN</span>`;
      } else {
        badge.innerHTML = `<span class="badge-thinking"><i class="fa-solid fa-spinner fa-spin mr-1"></i> THINKING</span>`;
      }
    } else {
      badge.innerHTML = `<span class="badge-waiting">WAITING</span>`;
    }
  }

  /**
   * Render Center Trick Area
   */
  renderCenterTrick(trick, leadSuit) {
    // Clear all 4 trick positions
    ['top', 'left', 'right', 'bottom'].forEach(pos => {
      const slot = document.getElementById(`trickSlot_${pos}`);
      if (slot) slot.innerHTML = '';
    });

    // Update Lead Suit Badge
    const leadBadge = document.getElementById('leadSuitBadge');
    if (leadBadge) {
      if (leadSuit) {
        const suitObj = SUITS[leadSuit.toUpperCase()];
        leadBadge.innerHTML = `
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1.5">Lead Suit:</span>
          <span class="lead-suit-pill ${suitObj?.color || ''}">
            ${suitObj?.symbol || ''} ${suitObj?.name || leadSuit}
          </span>
        `;
        leadBadge.classList.remove('hidden');
      } else {
        leadBadge.classList.add('hidden');
      }
    }

    // Positions map: 0 = bottom (You), 1 = top (Comp 1), 2 = left (Comp 2), 3 = right (Comp 3)
    const posMap = { 0: 'bottom', 1: 'top', 2: 'left', 3: 'right' };

    trick.forEach(item => {
      const pos = posMap[item.playerId];
      const slot = document.getElementById(`trickSlot_${pos}`);
      if (slot) {
        const cardEl = this.createCardElement(item.card, false);
        cardEl.classList.add('card-played-anim');
        slot.innerHTML = '';
        slot.appendChild(cardEl);
      }
    });
  }

  /**
   * Highlight the winning card on the table
   */
  highlightTrickWinner(winnerPlayerId, winnerCard, onComplete) {
    const posMap = { 0: 'bottom', 1: 'top', 2: 'left', 3: 'right' };
    const pos = posMap[winnerPlayerId];
    const slot = document.getElementById(`trickSlot_${pos}`);

    if (slot && slot.firstElementChild) {
      slot.firstElementChild.classList.add('winning-card-glow');
    }

    this.playSound('trick');

    setTimeout(() => {
      // Clear glow and proceed
      if (onComplete) onComplete();
    }, 1200);
  }

  /**
   * Animate cards leaving center into Discard Pile
   */
  animateTrickClear(onComplete) {
    const centerArea = document.getElementById('centerTrickArea');
    if (centerArea) {
      centerArea.classList.add('trick-clearing');
    }

    setTimeout(() => {
      ['top', 'left', 'right', 'bottom'].forEach(pos => {
        const slot = document.getElementById(`trickSlot_${pos}`);
        if (slot) slot.innerHTML = '';
      });
      if (centerArea) centerArea.classList.remove('trick-clearing');
      if (onComplete) onComplete();
    }, 450);
  }

  /**
   * Update Discard Pile Counter & Trick Counters
   */
  updateTableStats(gameState) {
    const discardCount = document.getElementById('discardPileCount');
    if (discardCount) {
      discardCount.textContent = `${gameState.discardPile.length} cards`;
    }

    const trickNum = document.getElementById('trickNumberDisplay');
    if (trickNum) {
      trickNum.textContent = `Trick #${gameState.trickNumber}`;
    }
  }

  /**
   * Toast notification helper
   */
  showToast(message, type = 'info') {
    const toast = document.getElementById('gameToast');
    if (!toast) return;

    const bgColors = {
      info: 'bg-slate-900/95 border-blue-500/50 text-white',
      warning: 'bg-amber-950/95 border-amber-500/60 text-amber-200',
      success: 'bg-emerald-950/95 border-emerald-500/60 text-emerald-200',
      danger: 'bg-rose-950/95 border-rose-500/60 text-rose-200'
    };

    toast.className = `fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl border shadow-2xl text-xs sm:text-sm font-bold transition-all duration-300 pointer-events-none ${bgColors[type] || bgColors.info} opacity-100 translate-y-0`;
    toast.textContent = message;

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.className = 'hidden';
    }, 2800);
  }

  /**
   * Show Game Over Modal
   */
  showGameOverModal(gameState, stats) {
    const modal = document.getElementById('gameOverModal');
    if (!modal) return;

    const isHumanBhabhi = gameState.bhabhi?.id === 0;
    const titleEl = document.getElementById('gameOverTitle');
    const subtitleEl = document.getElementById('gameOverSubtitle');
    const podiumEl = document.getElementById('podiumList');
    const avatarEl = document.getElementById('gameOverAvatar');

    if (isHumanBhabhi) {
      this.playSound('bhabhi');
      if (titleEl) titleEl.textContent = "You are the Bhabhi!";
      if (titleEl) titleEl.className = "text-3xl sm:text-4xl font-black text-rose-500";
      if (subtitleEl) subtitleEl.textContent = "You were the last player holding cards. Better luck next time!";
      if (avatarEl) avatarEl.innerHTML = `<div class="w-20 h-20 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full flex items-center justify-center text-4xl mx-auto mb-2 animate-bounce">☠</div>`;
    } else {
      this.playSound('win');
      if (titleEl) titleEl.textContent = "You Escaped! 🎉";
      if (titleEl) titleEl.className = "text-3xl sm:text-4xl font-black text-[#ffd43b]";
      if (subtitleEl) subtitleEl.textContent = `${gameState.bhabhi?.name || 'Computer'} is the Bhabhi! You safely emptied your hand.`;
      if (avatarEl) avatarEl.innerHTML = `<div class="w-20 h-20 bg-[#ffd43b]/20 text-[#ffd43b] border border-[#ffd43b]/40 rounded-full flex items-center justify-center text-4xl mx-auto mb-2 animate-bounce">🏆</div>`;

      // Trigger Confetti
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }

    // Build Finishing Podium
    if (podiumEl) {
      const medals = ['🥇 1st Safe', '🥈 2nd Safe', '🥉 3rd Safe'];
      let html = '';

      gameState.finishOrder.forEach((player, idx) => {
        html += `
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs sm:text-sm">
            <span class="font-black text-amber-400">${medals[idx] || 'Safe'}</span>
            <span class="font-bold text-white">${player.name}</span>
          </div>
        `;
      });

      // Bhabhi item
      if (gameState.bhabhi) {
        html += `
          <div class="flex items-center justify-between p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs sm:text-sm">
            <span class="font-black text-rose-400">☠ Bhabhi (Loser)</span>
            <span class="font-black text-rose-200">${gameState.bhabhi.name} (${gameState.bhabhi.hand.length} card${gameState.bhabhi.hand.length === 1 ? '' : 's'})</span>
          </div>
        `;
      }

      podiumEl.innerHTML = html;
    }

    modal.classList.remove('hidden');
  }

  hideGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    if (modal) modal.classList.add('hidden');
  }

  /**
   * Render Last Trick Preview Drawer
   */
  renderLastTrickPreview(lastTrick, leadSuit) {
    const modal = document.getElementById('lastTrickModal');
    const content = document.getElementById('lastTrickContent');
    if (!modal || !content) return;

    if (!lastTrick || lastTrick.length === 0) {
      content.innerHTML = `<p class="text-xs text-slate-400 italic py-6 text-center">No tricks completed yet in this game.</p>`;
    } else {
      const posNames = { 0: 'You', 1: 'Computer 1', 2: 'Computer 2', 3: 'Computer 3' };
      content.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
          ${lastTrick.map(item => `
            <div class="flex flex-col items-center bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
              <span class="text-xs font-black text-slate-300 mb-2">${posNames[item.playerId]}</span>
              <div class="playing-card mini ${item.card.color}">
                <div class="card-corner top-left">
                  <span class="card-rank">${item.card.rank}</span>
                  <span class="card-suit">${item.card.symbol}</span>
                </div>
                <div class="card-center-pip"><span>${item.card.symbol}</span></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    modal.classList.remove('hidden');
  }
}

window.BhabhiUI = BhabhiUI;
