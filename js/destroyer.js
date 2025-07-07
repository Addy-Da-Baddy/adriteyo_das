// Space Invaders style Destroyer Game (cyberpunk theme)
document.addEventListener('DOMContentLoaded', function() {
    const gameDiv = document.getElementById('destroyer-game');
    if (!gameDiv) return;
    let canvas, ctx, animationId;
    function initGame() {
        gameDiv.innerHTML = '<button id="close-destroyer" style="position:absolute;top:10px;right:10px;z-index:10;">✖</button><canvas id="destroyer-canvas" width="480" height="600" style="background:#0a0a0a;border:2px solid #00ff88;box-shadow:0 0 24px #00ff88,0 0 4px #ff4757;"></canvas>';
        canvas = document.getElementById('destroyer-canvas');
        ctx = canvas.getContext('2d');
        document.getElementById('close-destroyer').onclick = () => {
            gameDiv.style.display = 'none';
            cancelAnimationFrame(animationId);
        };
        startGame();
    }
    // Game variables
    let player, bullets, invaders, invaderDir, score, gameOver, frame;
    function startGame() {
        player = { x: 220, y: 560, w: 40, h: 16, color: '#00ff88' };
        bullets = [];
        invaders = [];
        invaderDir = 1;
        score = 0;
        gameOver = false;
        frame = 0;
        // Create invaders
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 8; c++) {
                invaders.push({ x: 40 + c * 50, y: 40 + r * 40, w: 32, h: 18, alive: true, color: '#ff4757' });
            }
        }
        window.addEventListener('keydown', handleKey);
        loop();
    }
    function handleKey(e) {
        if (gameOver) return;
        if (e.key === 'ArrowLeft') player.x -= 24;
        if (e.key === 'ArrowRight') player.x += 24;
        if (e.key === ' ' || e.key === 'ArrowUp') bullets.push({ x: player.x + 18, y: player.y, vy: -8 });
        player.x = Math.max(0, Math.min(440, player.x));
    }
    function loop() {
        ctx.clearRect(0, 0, 480, 600);
        // Draw player
        ctx.shadowColor = player.color;
        ctx.shadowBlur = 16;
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.shadowBlur = 0;
        // Draw bullets
        ctx.fillStyle = '#8be9fd';
        bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 12));
        // Draw invaders
        invaders.forEach(inv => {
            if (inv.alive) {
                ctx.shadowColor = inv.color;
                ctx.shadowBlur = 8;
                ctx.fillStyle = inv.color;
                ctx.fillRect(inv.x, inv.y, inv.w, inv.h);
                ctx.shadowBlur = 0;
            }
        });
        // Move bullets
        bullets.forEach(b => b.y += b.vy);
        bullets = bullets.filter(b => b.y > -20);
        // Move invaders
        if (frame % 30 === 0) {
            let edge = false;
            invaders.forEach(inv => {
                if (inv.alive) {
                    inv.x += 16 * invaderDir;
                    if (inv.x < 0 || inv.x > 448) edge = true;
                }
            });
            if (edge) {
                invaderDir *= -1;
                invaders.forEach(inv => { if (inv.alive) inv.y += 24; });
            }
        }
        // Bullet-invader collision
        bullets.forEach(b => {
            invaders.forEach(inv => {
                if (inv.alive && b.x < inv.x + inv.w && b.x + 4 > inv.x && b.y < inv.y + inv.h && b.y + 12 > inv.y) {
                    inv.alive = false;
                    b.y = -100;
                    score += 10;
                }
            });
        });
        // Invader-player collision
        if (invaders.some(inv => inv.alive && inv.y + inv.h > player.y)) gameOver = true;
        // Draw score
        ctx.font = '18px JetBrains Mono, monospace';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        ctx.fillText('SCORE: ' + score, 16, 24);
        ctx.shadowBlur = 0;
        // Game over
        if (gameOver) {
            ctx.font = '32px JetBrains Mono, monospace';
            ctx.fillStyle = '#ff4757';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', 240, 300);
            ctx.font = '18px JetBrains Mono, monospace';
            ctx.fillStyle = '#8be9fd';
            ctx.fillText('Click X or press ESC to close', 240, 340);
            ctx.textAlign = 'left';
            window.removeEventListener('keydown', handleKey);
            return;
        }
        frame++;
        animationId = requestAnimationFrame(loop);
    }
    // Show game when overlay is displayed
    const observer = new MutationObserver(() => {
        if (gameDiv.style.display === 'flex') {
            initGame();
        } else {
            cancelAnimationFrame(animationId);
            window.removeEventListener('keydown', handleKey);
        }
    });
    observer.observe(gameDiv, { attributes: true, attributeFilter: ['style'] });
}); 