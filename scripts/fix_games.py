import os

game_dirs = ['2048', 'bhabhi-thulla', 'memory-game', 'snake', 'tic-tac-toe', 'word-scramble']

for g in game_dirs:
    p = os.path.join(g, 'index.html')
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix paths when base href="../" is present
        content = content.replace('href="../css/style.min.css"', 'href="css/style.min.css"')
        content = content.replace('href="../css/style.css"', 'href="css/style.min.css"')
        content = content.replace('href="../images/logo-icon.webp"', 'href="images/logo-icon.webp"')
        content = content.replace('content="../images/logo.webp"', 'content="images/logo.webp"')
        content = content.replace('src="../js/main.min.js"', 'src="js/main.min.js"')
        content = content.replace('src="../js/main.js"', 'src="js/main.min.js"')
        content = content.replace('src="js/main.js"', 'src="js/main.min.js"')

        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed {p}')
