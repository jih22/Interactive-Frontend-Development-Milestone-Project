class AudioController {
    constructor() {
        this.bgMusic = new Audio('Assets/Audio/Background.mp3');
        this.flipSound = new Audio('Assets/Audio/Flip.wav');
        this.matchSound = new Audio('Assets/Audio/Match.wav');
        this.victorySound = new Audio('Assets/Audio/Victory.mp3');
        this.gameOverSound = new Audio('Assets/Audio/Gameover.mp3');
        this.bgMusic.volume = 0.4;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            // game.startGame();
            let audioController = new AudioController();
            audioController.startMusic();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',ready());
} else {
    ready();
}

