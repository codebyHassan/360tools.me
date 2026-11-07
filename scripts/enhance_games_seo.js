const fs = require('fs');

const gamesData = {
  'games/2048/index.html': {
    title: 'Play 2048 Online Free — Classical Number Puzzle | 360tools',
    desc: 'Play 2048 puzzle game online for free. Merge matching number tiles to reach 2048 with unlimited undo, auto-save, and zero lag. 100% in-browser.',
    faqs: [
      {
        q: 'What is the best strategy to win 2048?',
        a: 'The most effective technique is the Corner Strategy: keep your highest-value tile locked permanently in one corner (e.g., bottom-right). Always build descending numerical chains along that edge and avoid swiping in the opposite direction.'
      },
      {
        q: 'Can I play 2048 offline on mobile and desktop?',
        a: 'Yes. 360Tools 2048 runs entirely in your browser memory via client-side JavaScript. Once the page is loaded, you can play offline with zero internet connectivity and full touch swipe support on iOS and Android.'
      },
      {
        q: 'What happens after you reach the 2048 tile?',
        a: 'Reaching 2048 does not end the game! You can click "Keep Going" to continue merging tiles toward 4096, 8192, and even 16384 for a master high score.'
      },
      {
        q: 'Is my best score saved automatically?',
        a: 'Yes. Your highest score and current active board state are automatically saved to your browser local storage so you can resume anytime.'
      }
    ],
    related: [
      { name: 'Snake Game', url: '/games/snake/', icon: 'fa-staff-snake', desc: 'Classic arcade retro snake game with customizable speed tiers.' },
      { name: 'Tic Tac Toe', url: '/games/tic-tac-toe/', icon: 'fa-xmarks-lines', desc: 'Play against intelligent AI or challenge a friend in 2-player mode.' },
      { name: 'Memory Card Game', url: '/games/memory-game/', icon: 'fa-brain', desc: 'Test and train your visual memory with card-matching challenges.' },
      { name: 'Word Scramble', url: '/games/word-scramble/', icon: 'fa-spell-check', desc: 'Unscramble jumbled letters and expand your vocabulary.' }
    ]
  },
  'games/snake/index.html': {
    title: 'Play Snake Game Online Free — Retro Arcade Classic | 360tools',
    desc: 'Play the classic retro Snake game online for free. Eat apples, grow your tail, and set high scores with smooth keyboard and mobile touch swipe controls.',
    faqs: [
      {
        q: 'How do you control the snake on mobile phones?',
        a: 'On touchscreens (iOS Safari and Android Chrome), you can simply swipe in the direction you want the snake to turn (Up, Down, Left, or Right) or tap the on-screen direction pad.'
      },
      {
        q: 'Can you change the game speed in 360Tools Snake?',
        a: 'Yes. You can select between Easy (relaxed pace), Medium (standard arcade), and Hard (fast reflex challenge) modes before or during your run.'
      },
      {
        q: 'Does hitting the game borders end the run?',
        a: 'Yes, in standard mode hitting the boundary walls or colliding with your own snake body triggers game over. Your high score is automatically recorded in localStorage.'
      },
      {
        q: 'Is this game completely free with zero ads?',
        a: 'Yes. The game executes 100% locally on HTML5 Canvas without popups, subscription walls, or tracking.'
      }
    ],
    related: [
      { name: '2048 Puzzle', url: '/games/2048/', icon: 'fa-cubes', desc: 'Merge matching numbers to reach the legendary 2048 tile.' },
      { name: 'Tic Tac Toe', url: '/games/tic-tac-toe/', icon: 'fa-xmarks-lines', desc: 'Classic 3x3 grid battle against smart AI.' },
      { name: 'Memory Game', url: '/games/memory-game/', icon: 'fa-brain', desc: 'Card flip matching game to test cognitive recall.' },
      { name: 'Bhabhi Thulla', url: '/games/bhabhi-thulla/', icon: 'fa-cards', desc: 'Traditional South Asian trick-taking card game.' }
    ]
  },
  'games/tic-tac-toe/index.html': {
    title: 'Play Tic Tac Toe Online — Free Single & 2-Player | 360tools',
    desc: 'Play Tic Tac Toe online for free. Challenge an unbeatable smart AI or play against a friend in pass-and-play 2-player mode. Zero lag on mobile and PC.',
    faqs: [
      {
        q: 'Can the single-player computer AI be beaten in Tic Tac Toe?',
        a: 'On Hard difficulty, the AI employs the minimax game-tree algorithm, guaranteeing optimal play. In this mode, the best possible outcome is a draw. Switch to Medium or Easy for casual play where the AI occasionally makes mistakes.'
      },
      {
        q: 'Can two people play together on the same phone or computer?',
        a: 'Yes! Select the "2-Player Pass & Play" mode to alternate turns with a friend on the same screen.'
      },
      {
        q: 'Does the game track match win-loss statistics?',
        a: 'Yes. The score counter tracks Player X wins, Player O wins, and total Draws across your session.'
      },
      {
        q: 'Is there any download or account required to play?',
        a: 'None at all. The game runs 100% in your web browser with zero installation.'
      }
    ],
    related: [
      { name: '2048 Puzzle', url: '/games/2048/', icon: 'fa-cubes', desc: 'Slide numbers and combine powers of 2.' },
      { name: 'Snake Game', url: '/games/snake/', icon: 'fa-staff-snake', desc: 'Classic retro snake arcade game.' },
      { name: 'Word Scramble', url: '/games/word-scramble/', icon: 'fa-spell-check', desc: 'Rearrange jumbled letters into correct English words.' },
      { name: 'Memory Game', url: '/games/memory-game/', icon: 'fa-brain', desc: 'Train your brain by uncovering matching card pairs.' }
    ]
  },
  'games/memory-game/index.html': {
    title: 'Free Memory Card Matching Game Online | 360tools',
    desc: 'Train your brain with our free online memory card matching game. Flip cards, match icon pairs, and improve visual recall with timer and move counters.',
    faqs: [
      {
        q: 'How do you play the memory card game?',
        a: 'Click or tap any two cards to flip them face-up. If the icons match, they stay revealed; if not, they flip back face-down. Match all pairs on the board with the fewest moves and fastest time.'
      },
      {
        q: 'Are there different difficulty board sizes?',
        a: 'Yes. You can choose from 4x3 (Easy - 6 pairs), 4x4 (Medium - 8 pairs), and 6x4 (Hard - 12 pairs) grids.'
      },
      {
        q: 'Does playing memory games help cognitive recall?',
        a: 'Yes, regular visual matching exercises stimulate short-term memory, concentration, and spatial awareness.'
      },
      {
        q: 'Can children play this on iPad and mobile tablets?',
        a: 'Yes. The game features vibrant high-contrast icons and responsive touch controls ideal for tablets and smartphones.'
      }
    ],
    related: [
      { name: '2048 Puzzle', url: '/games/2048/', icon: 'fa-cubes', desc: 'Slide and merge tiles to score 2048.' },
      { name: 'Snake Game', url: '/games/snake/', icon: 'fa-staff-snake', desc: 'Navigate the snake and gather apples.' },
      { name: 'Word Scramble', url: '/games/word-scramble/', icon: 'fa-spell-check', desc: 'Test vocabulary and spelling.' },
      { name: 'Tic Tac Toe', url: '/games/tic-tac-toe/', icon: 'fa-xmarks-lines', desc: 'Play 3-in-a-row against smart AI.' }
    ]
  },
  'games/word-scramble/index.html': {
    title: 'Word Scramble Game Online — Free Jumble Solver | 360tools',
    desc: 'Play word scramble online for free. Unscramble jumbled letters, expand vocabulary, and solve daily word puzzle challenges across multiple categories.',
    faqs: [
      {
        q: 'How does the word scramble game work?',
        a: 'You are presented with a jumbled sequence of letters and a category hint. Type the correct English word into the answer box and hit Submit to score points.'
      },
      {
        q: 'What categories of words are included?',
        a: 'The game features curated dictionaries across Technology, Animals, Geography, Science, and Everyday Vocabulary.'
      },
      {
        q: 'What should I do if I get stuck on a difficult anagram?',
        a: 'Click the "Hint" button to reveal the first letter or vowel of the word in exchange for a minor point deduction.'
      },
      {
        q: 'Is there a time limit per word?',
        a: 'You can play in relaxed untimed mode or enable the 60-second challenge timer to test rapid spelling reflexes.'
      }
    ],
    related: [
      { name: '2048 Game', url: '/games/2048/', icon: 'fa-cubes', desc: 'Math number tile puzzle.' },
      { name: 'Memory Game', url: '/games/memory-game/', icon: 'fa-brain', desc: 'Card matching visual exercise.' },
      { name: 'Snake Game', url: '/games/snake/', icon: 'fa-staff-snake', desc: 'Arcade snake classic.' },
      { name: 'Tic Tac Toe', url: '/games/tic-tac-toe/', icon: 'fa-xmarks-lines', desc: 'Quick 3x3 strategy match.' }
    ]
  },
  'games/bhabhi-thulla/index.html': {
    title: 'Play Bhabhi Thulla Card Game Online Free | 360tools',
    desc: 'Play Bhabhi Thulla (Get Away) card game online against smart computer bots. Free South Asian trick-taking card game with authentic rules and offline play.',
    faqs: [
      {
        q: 'What is the objective of Bhabhi Thulla (Get Away)?',
        a: 'The objective is to get rid of all your cards as quickly as possible. The last remaining player holding cards when everyone else has escaped is crowned the "Bhabhi" (loser).'
      },
      {
        q: 'What is a "Thulla" in the game?',
        a: 'A "Thulla" (or hit) happens when a player does not have a card of the leading suit and plays a card of a different suit. The player who played the highest card of the original lead suit must pick up all cards played in that trick.'
      },
      {
        q: 'Who leads the first round?',
        a: 'The player holding the Ace of Spades (Hukam ka Ikka) plays first to start the opening trick.'
      },
      {
        q: 'Can I play Bhabhi Thulla offline against AI bots?',
        a: 'Yes. 360Tools Bhabhi Thulla features 3 automated computer bots running entirely in client-side JavaScript, enabling instant gameplay without internet lag.'
      }
    ],
    related: [
      { name: '2048 Game', url: '/games/2048/', icon: 'fa-cubes', desc: 'Number puzzle classic.' },
      { name: 'Memory Game', url: '/games/memory-game/', icon: 'fa-brain', desc: 'Visual card match.' },
      { name: 'Snake Game', url: '/games/snake/', icon: 'fa-staff-snake', desc: 'Retro arcade challenge.' },
      { name: 'Tic Tac Toe', url: '/games/tic-tac-toe/', icon: 'fa-xmarks-lines', desc: 'Unbeatable AI match.' }
    ]
  }
};

for (const [filePath, data] of Object.entries(gamesData)) {
  if (!fs.existsSync(filePath)) {
    console.log('File missing:', filePath);
    continue;
  }
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Update Title and Description
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${data.title}</title>`);
  html = html.replace(/<meta name="title" content="[\s\S]*?">/, `<meta name="title" content="${data.title}">`);
  html = html.replace(/<meta name="description"[\s\S]*?content="[\s\S]*?">/, `<meta name="description" content="${data.desc}">`);
  // Remove meta keywords if present
  html = html.replace(/<meta name="keywords"[\s\S]*?>\n?/, '');

  // 2. Build FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  const faqSchemaScript = `\n  <!-- Structured Data: FAQPage -->\n  <script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n  </script>`;
  
  if (!html.includes('"FAQPage"')) {
    html = html.replace('</head>', `${faqSchemaScript}\n</head>`);
  }

  // 3. Build Visible FAQ HTML
  const faqAccordionHtml = data.faqs.map(f => `
        <details class="group fa-card p-5 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer">
          <summary class="flex justify-between items-center font-bold text-sm text-[#3e2723] list-none">
            <span>${f.q}</span>
            <i class="fa-solid fa-chevron-down text-xs text-slate-400 group-open:rotate-180 transition-transform"></i>
          </summary>
          <p class="text-xs text-slate-600 mt-3 leading-relaxed">
            ${f.a}
          </p>
        </details>`).join('');

  const relatedHtml = data.related.map(r => `
            <a href="${r.url}" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-[#146ebe] text-xs font-bold text-[#3e2723] hover:text-[#c27803] transition-all block shadow-2xs">
              <div class="flex items-center gap-2 mb-1.5">
                <i class="fa-solid ${r.icon} text-indigo-600"></i>
                <span class="font-extrabold text-sm">${r.name}</span>
              </div>
              <p class="text-[11px] text-slate-500 font-normal leading-relaxed">${r.desc}</p>
            </a>`).join('');

  const fullSectionHtml = `
    <!-- FAQ Section -->
    <section class="my-14 pt-8 border-t border-slate-200">
      <div class="max-w-4xl mx-auto space-y-6">
        <div>
          <span class="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">Player Guide &amp; Rules</span>
          <h2 class="text-2xl sm:text-3xl font-black text-[#3e2723] mt-2">Frequently Asked Questions</h2>
        </div>
        <div class="space-y-3">
          ${faqAccordionHtml}
        </div>
      </div>
    </section>

    <!-- Related Free Games & Utilities -->
    <section class="my-14 pt-8 border-t border-slate-200">
      <div class="max-w-4xl mx-auto space-y-6">
        <div>
          <span class="text-xs font-black uppercase tracking-wider text-slate-400">Discover More</span>
          <h2 class="text-xl sm:text-2xl font-black text-[#3e2723] mt-1">Related Free Games</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${relatedHtml}
        </div>
      </div>
    </section>
  </main>`;

  // Replace </main> with sections + </main>
  if (!html.includes('Player Guide &amp; Rules') && html.includes('</main>')) {
    html = html.replace('</main>', fullSectionHtml);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Enriched game:', filePath);
}

