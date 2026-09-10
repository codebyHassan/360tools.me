/**
 * Deck & Card Engine for Bhabhi Thulla
 * Standard 52-card deck (No Jokers)
 * 2 < 3 < 4 < 5 < 6 < 7 < 8 < 9 < 10 < J < Q < K < A
 */

const SUITS = {
  SPADES: { id: 'spades', name: 'Spades', symbol: '♠', color: 'black', sortOrder: 1 },
  HEARTS: { id: 'hearts', name: 'Hearts', symbol: '♥', color: 'red', sortOrder: 2 },
  CLUBS: { id: 'clubs', name: 'Clubs', symbol: '♣', color: 'black', sortOrder: 3 },
  DIAMONDS: { id: 'diamonds', name: 'Diamonds', symbol: '♦', color: 'red', sortOrder: 4 }
};

const RANKS = [
  { rank: '2', value: 2 },
  { rank: '3', value: 3 },
  { rank: '4', value: 4 },
  { rank: '5', value: 5 },
  { rank: '6', value: 6 },
  { rank: '7', value: 7 },
  { rank: '8', value: 8 },
  { rank: '9', value: 9 },
  { rank: '10', value: 10 },
  { rank: 'J', value: 11 },
  { rank: 'Q', value: 12 },
  { rank: 'K', value: 13 },
  { rank: 'A', value: 14 }
];

class Card {
  constructor(suitKey, rankObj) {
    this.suit = SUITS[suitKey].id;
    this.suitName = SUITS[suitKey].name;
    this.symbol = SUITS[suitKey].symbol;
    this.color = SUITS[suitKey].color;
    this.sortOrder = SUITS[suitKey].sortOrder;
    this.rank = rankObj.rank;
    this.value = rankObj.value;
    this.id = `${this.suit}_${this.rank}`;
  }

  isAceOfSpades() {
    return this.suit === 'spades' && this.rank === 'A';
  }

  toString() {
    return `${this.rank}${this.symbol}`;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.reset();
  }

  reset() {
    this.cards = [];
    for (const suitKey in SUITS) {
      for (const rankObj of RANKS) {
        this.cards.push(new Card(suitKey, rankObj));
      }
    }
  }

  shuffle() {
    // Multi-pass Fisher-Yates shuffle
    for (let pass = 0; pass < 3; pass++) {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  }

  deal(numPlayers = 4) {
    this.reset();
    this.shuffle();

    const hands = Array.from({ length: numPlayers }, () => []);
    
    // Deal all 52 cards evenly (13 cards each for 4 players)
    this.cards.forEach((card, index) => {
      hands[index % numPlayers].push(card);
    });

    // Sort hands by suit and rank for clean display
    hands.forEach(hand => this.sortHand(hand));

    return hands;
  }

  sortHand(hand) {
    hand.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return a.value - b.value;
    });
  }
}

// Export for browser global scope
window.SUITS = SUITS;
window.RANKS = RANKS;
window.Card = Card;
window.Deck = Deck;
