document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const introScreen = document.getElementById('intro-screen');
    const gameScreen = document.getElementById('game-screen');
    const questionScreen = document.getElementById('question-screen');
    const successScreen = document.getElementById('success-screen');

    // Game Elements
    const startGameBtn = document.getElementById('start-game-btn');
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');

    // Question Elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    let score = 0;
    const targetScore = 10;
    let gameInterval;

    // --- Navigation Functions ---
    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // --- Stage 1: Intro -> Game ---
    startGameBtn.addEventListener('click', () => {
        showScreen(gameScreen);
        startGame();
    });

    // --- Stage 2: The Game ---
    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        gameInterval = setInterval(spawnHeart, 800);
    }

    function spawnHeart() {
        if (score >= targetScore) return;

        const heart = document.createElement('div');
        heart.classList.add('heart-target');
        heart.textContent = '💖';
        
        // Random Position
        const x = Math.random() * (gameContainer.clientWidth - 40);
        const y = Math.random() * (gameContainer.clientHeight - 40);
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        // Click Event
        heart.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            heart.remove();
            
            // Interaction: Pop sound or effects could go here
            
            if (score >= targetScore) {
                endGame();
            }
        });

        // Auto remove after some time (difficulty)
        setTimeout(() => {
            if (heart.parentElement) heart.remove();
        }, 2000);

        gameContainer.appendChild(heart);
    }

    function endGame() {
        clearInterval(gameInterval);
        setTimeout(() => {
            showScreen(questionScreen);
            initRunawayButton();
        }, 500);
    }

    // --- Stage 3: The Question ---
    function initRunawayButton() {
        // Center the No button initially relative to the container if needed
        // But CSS handles flexbox centering. We just need to make it absolute for moving.
        // It's already absolute in CSS, but let's ensure it starts near the Yes button.
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton); // Mobile support

    function moveNoButton() {
        const container = questionScreen;
        const x = Math.random() * (window.innerWidth - noBtn.clientWidth);
        const y = Math.random() * (window.innerHeight - noBtn.clientHeight);
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    yesBtn.addEventListener('click', () => {
        showScreen(successScreen);
        celebrate();
    });

    // --- Stage 4: Celebration ---
    function celebrate() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
