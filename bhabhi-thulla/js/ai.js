/**
 * Bhabhi AI Controller
 * Handles strategic decision making for Computer 1, 2, and 3
 */

class BhabhiAI {
  constructor(difficulty = 'normal') {
    this.difficulty = difficulty; // 'easy', 'normal', 'hard'
  }

  setDifficulty(diff) {
    this.difficulty = diff;
  }

  /**
   * Choose the best legal card for the given AI player
   * @param {Object} player - Current AI player
   * @param {Object} gameState - Current game state
   * @returns {Card} selected card
   */
  chooseCard(player, gameState) {
    const hand = player.hand;
    if (!hand || hand.length === 0) return null;

    // First trick of the game: Must play Ace of Spades if holding it
    if (gameState.isFirstTrick) {
      const aceOfSpades = hand.find(c => c.isAceOfSpades());
      if (aceOfSpades) return aceOfSpades;
    }

    const leadSuit = gameState.leadSuit;

    // 1. AI is LEADING the trick (no lead suit established yet)
    if (!leadSuit) {
      return this.chooseLeadCard(hand, gameState);
    }

    // 2. AI is FOLLOWING: Check if AI has the lead suit
    const suitCards = hand.filter(c => c.suit === leadSuit);

    if (suitCards.length > 0) {
      // Must follow suit!
      return this.chooseFollowCard(suitCards, gameState);
    }

    // 3. AI CANNOT follow suit (Void in lead suit) -> Strategic off-suit discard!
    return this.chooseDiscardCard(hand, gameState);
  }

  /**
   * Choose card when leading the trick
   */
  chooseLeadCard(hand, gameState) {
    if (this.difficulty === 'easy') {
      // Random lead
      return hand[Math.floor(Math.random() * hand.length)];
    }

    // Group cards by suit
    const suitsInHand = {};
    hand.forEach(c => {
      if (!suitsInHand[c.suit]) suitsInHand[c.suit] = [];
      suitsInHand[c.suit].push(c);
    });

    const suitKeys = Object.keys(suitsInHand);

    // Strategy 1: Find shortest suit to void it quickly (so AI can discard in future tricks)
    suitKeys.sort((a, b) => suitsInHand[a].length - suitsInHand[b].length);
    const shortestSuit = suitKeys[0];
    const shortestSuitCards = suitsInHand[shortestSuit];

    // Sort by value ascending
    shortestSuitCards.sort((a, b) => a.value - b.value);

    // If hand is small (<= 4 cards), try to lead with highest safe card or lowest card
    if (hand.length <= 4) {
      return shortestSuitCards[0]; // Lead lowest
    }

    // Lead low card of shortest suit
    return shortestSuitCards[0];
  }

  /**
   * Choose card when holding the lead suit (must follow)
   */
  chooseFollowCard(suitCards, gameState) {
    // Sort suit cards ascending (lowest to highest)
    suitCards.sort((a, b) => a.value - b.value);

    if (suitCards.length === 1) {
      return suitCards[0];
    }

    if (this.difficulty === 'easy') {
      // Random card from legal suit
      return suitCards[Math.floor(Math.random() * suitCards.length)];
    }

    // Find current winning card in the trick
    const currentWinningCard = this.getCurrentWinningCard(gameState);

    // Cards lower than current winner (safe ducking)
    const lowerCards = suitCards.filter(c => c.value < currentWinningCard.value);
    // Cards higher than current winner (would take the trick)
    const higherCards = suitCards.filter(c => c.value > currentWinningCard.value);

    if (this.difficulty === 'hard') {
      // In hard mode: If there are players left to play after us, prefer ducking with lowest card
      const remainingPlayers = gameState.getRemainingPlayersInTrickCount();
      
      if (lowerCards.length > 0) {
        // Duck with lowest card to avoid winning trick
        return lowerCards[0];
      }

      // If we must win or have only higher cards:
      // If we have few cards in hand, play lowest higher card
      return higherCards[0];
    }

    // Normal Difficulty:
    // Prefer playing a low card
    if (lowerCards.length > 0) {
      return lowerCards[0]; // Play lowest card
    }

    // Otherwise play the lowest winning card to conserve higher cards
    return higherCards[0] || suitCards[0];
  }

  /**
   * Choose card to discard when unable to follow suit
   */
  chooseDiscardCard(hand, gameState) {
    if (this.difficulty === 'easy') {
      return hand[Math.floor(Math.random() * hand.length)];
    }

    // Sort all hand cards by value descending (Highest first: A, K, Q, J...)
    const sortedHand = [...hand].sort((a, b) => b.value - a.value);

    // Group by suit to find singleton high cards (A, K of a suit where we only have 1 or 2 cards)
    const suitCounts = {};
    hand.forEach(c => {
      suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1;
    });

    // Strategy: prioritize high cards in short suits (empties the suit completely!)
    const highShortSuitCards = sortedHand.filter(c => suitCounts[c.suit] <= 2 && c.value >= 11);
    if (highShortSuitCards.length > 0) {
      return highShortSuitCards[0];
    }

    // Otherwise discard the absolute highest card in hand (e.g. Ace, King of any suit)
    return sortedHand[0];
  }

  /**
   * Helper: get highest card of lead suit currently on the table
   */
  getCurrentWinningCard(gameState) {
    const trick = gameState.currentTrick;
    const leadSuit = gameState.leadSuit;
    let highest = { value: -1 };

    trick.forEach(item => {
      if (item.card.suit === leadSuit && item.card.value > highest.value) {
        highest = item.card;
      }
    });

    return highest;
  }
}

window.BhabhiAI = BhabhiAI;
