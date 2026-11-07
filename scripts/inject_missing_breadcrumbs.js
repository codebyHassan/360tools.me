const fs = require('fs');

const breadcrumbsData = {
  'image-tools/background-remover.html': {
    catName: 'Image Tools',
    catUrl: 'https://360tools.me/image-tools/',
    toolName: 'AI Background Remover',
    toolUrl: 'https://360tools.me/image-tools/background-remover.html'
  },
  'games/2048/index.html': {
    catName: 'Free Games',
    catUrl: 'https://360tools.me/games/',
    toolName: '2048 Puzzle',
    toolUrl: 'https://360tools.me/games/2048/'
  },
  'games/snake/index.html': {
    catName: 'Free Games',
    catUrl: 'https://360tools.me/games/',
    toolName: 'Snake Game',
    toolUrl: 'https://360tools.me/games/snake/'
  },
  'games/tic-tac-toe/index.html': {
    catName: 'Free Games',
    catUrl: 'https://360tools.me/games/',
    toolName: 'Tic Tac Toe',
    toolUrl: 'https://360tools.me/games/tic-tac-toe/'
  },
  'games/memory-game/index.html': {
    catName: 'Free Games',
    catUrl: 'https://360tools.me/games/',
    toolName: 'Memory Card Game',
    toolUrl: 'https://360tools.me/games/memory-game/'
  },
  'games/word-scramble/index.html': {
    catName: 'Free Games',
    catUrl: 'https://360tools.me/games/',
    toolName: 'Word Scramble',
    toolUrl: 'https://360tools.me/games/word-scramble/'
  },
  'games/bhabhi-thulla/index.html': {
    catName: 'Free Games',
    catUrl: 'https://360tools.me/games/',
    toolName: 'Bhabhi Thulla',
    toolUrl: 'https://360tools.me/games/bhabhi-thulla/'
  }
};

for (const [file, info] of Object.entries(breadcrumbsData)) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('"BreadcrumbList"')) continue;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://360tools.me/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": info.catName,
        "item": info.catUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": info.toolName,
        "item": info.toolUrl
      }
    ]
  };

  const schemaScript = `\n  <!-- Structured Data: BreadcrumbList -->\n  <script type="application/ld+json">\n${JSON.stringify(breadcrumbSchema, null, 2)}\n  </script>`;
  html = html.replace('</head>', `${schemaScript}\n</head>`);
  fs.writeFileSync(file, html, 'utf8');
  console.log('Added BreadcrumbList to:', file);
}

