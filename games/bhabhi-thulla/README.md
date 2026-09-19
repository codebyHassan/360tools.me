# Bhabhi Thulla (Bhabi / Thulla / Get Away) Card Game

A complete, polished, and standalone web application of the traditional South Asian 4-player card game **Bhabhi Thulla** (also known as *Get Away*, *Pabho*, or *Donkey*). Built with **HTML5, CSS3, and Vanilla JavaScript** with zero external dependencies, no frameworks, and no build tools.

---

## 🃏 1. How the Game Works

- **Deck:** Standard 52-card deck without Jokers (2 < 3 < 4 < 5 < 6 < 7 < 8 < 9 < 10 < J < Q < K < A).
- **Players:** 4 Players — You (Human) against 3 Computer AI opponents (`Computer 1`, `Computer 2`, `Computer 3`).
- **Dealing:** All 52 cards are dealt evenly (13 cards each).
- **Game Start:** The player holding the **Ace of Spades (♠A)** automatically leads the very first trick.
- **Trick Rules:**
  - The first card played in a trick establishes the **lead suit**.
  - All players holding at least one card of the lead suit **MUST follow suit**.
  - Players with no cards of the lead suit are free to play (discard) any card of their choice.
- **Winning the Trick:** The highest card of the lead suit wins the trick. All cards in the completed trick are permanently discarded to the waste pile. The winner leads the next trick.
- **Escaping:** The moment a player sheds their last card, they are declared **SAFE** and finish in that position (1st, 2nd, or 3rd).
- **The Bhabhi:** The final remaining player holding cards becomes the **Bhabhi** (the loser).

---

## 🚀 2. How to Run

Simply open `index.html` (or `bhabhi-thulla/index.html`) directly in any modern web browser:
- **Chrome / Edge / Firefox / Safari**
- **Desktop, Laptop, Tablet, or Mobile Phone**
- **Zero build steps, zero servers required.**

---

## 📂 3. Modular JavaScript Architecture

```
bhabhi-thulla/
├── index.html        # Semantic HTML5 table layout, modals, and SEO metadata
├── README.md         # Documentation and guide
├── css/
│   └── style.css     # Dark green felt card table, pure CSS playing cards, animations
└── js/
    ├── deck.js       # 52-card deck generator, Card object, multi-pass Fisher-Yates shuffler
    ├── ai.js         # Strategic AI logic with Easy / Normal / Hard difficulty settings
    ├── ui.js         # HTML/CSS card renderer, Web Audio synthesizer, toast & modals
    └── game.js       # State machine, turn coordinator, trick evaluator, LocalStorage stats
```

---

## 🧠 4. How the AI Works

The AI engine in `js/ai.js` provides intelligent, strategic decision-making:

1. **Lead Strategy (`chooseLeadCard`):**
   - Evaluates hand composition by suit count.
   - Prefers leading short suits with low cards to void the suit early, enabling off-suit power discards in future rounds.
2. **Following Suit (`chooseFollowCard`):**
   - Strictly obeys the rule to follow the lead suit.
   - Evaluates the current highest card in the trick.
   - Strategically ducks with low cards when possible to avoid taking the lead.
   - Conserves high cards or uses minimum winning cards when forced.
3. **Off-Suit Discard (`chooseDiscardCard`):**
   - When void in the lead suit, the AI strategically discards high-liability cards (isolated Aces, Kings, and Queens of other suits) to shed dangerous weight safely.
4. **Difficulty Levels:**
   - **Casual (Easy):** Semi-random card selection within legal constraints.
   - **Standard (Normal):** Balanced tactical ducking and high-card shedding.
   - **Expert (Hard):** Tracks remaining cards, voids suits aggressively, and conserves optimal exits.

---

## 🏆 5. Features & Enhancements

- 🔊 **Web Audio API Sound FX:** Realistic dealing sounds, card whooshes, double trick chimes, error buzzers, and victory fanfare.
- 📱 **Mobile Touch-Optimized:** Fanned overlapping hand with instant touch responsiveness, smooth card-lift on hover, and clear legal card glowing highlights.
- 📊 **Statistics Tracking:** Games played, escape rate, Bhabhi count, and streak counters persisted in `localStorage`.
- 🔄 **Last Trick Review:** View the exact cards played in the previous trick at any time.
- 🏆 **Game Over Podium:** Celebration confetti when you escape and detailed finishing ranks (🥇 1st, 🥈 2nd, 🥉 3rd, ☠ Bhabhi).
