const fs = require('fs');
const games = ['2048', 'bhabhi-thulla', 'memory-game', 'snake', 'tic-tac-toe', 'word-scramble'];
games.forEach(g => {
  const html = fs.readFileSync(g + '/index.html', 'utf8');
  console.log(g, '| base:', html.includes('<base href="../">'), '| css:', html.includes('href="css/style.min.css"'), '| js:', html.includes('src="js/main.min.js"'));
});
