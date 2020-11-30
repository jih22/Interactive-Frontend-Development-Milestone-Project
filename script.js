class SoundEffects {
    constructor() {
        this.backGroundMusic = new Audio('Assets/Audio/Background.mp3');
        this.flipSound = new Audio('Assets/Audio/Flip.wav');
        this.matchedSound = new Audio('Assets/Audio/Match.wav');
        this.victorySound = new Audio('Assets/Audio/Hoho.mp3');
        this.gameOverSound = new Audio('Assets/Audio/Gameover.mp3');
        this.backGroundMusic.volume = 0.3;
        this.backGroundMusic.loop = true;
    }
    startMusic() {
        this.backGroundMusic.play();
    }
    stopMusic() {
        this.backGroundMusic.pause();
        this.backGroundMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchedSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MerryMatch {
    constructor(sumTotal, cards) {
        this.cardsArray = cards;
        this.sumTotal = sumTotal;
        this.timeLeft = sumTotal;
        this.timer = document.getElementById('time')
        this.ticker = document.getElementById('flip');
        this.soundEffect = new SoundEffects();
    }
     //This function is called when the page has loaded so the game is ready to play
    startGame() {
        this.totalClicks = 0;
        this.timeLeft = this.sumTotal;
        this.checkingCard = null;
        this.sameCard = [];
        this.busy = true;
        setTimeout(() => {
            this.soundEffect.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeLeft;
        this.ticker.innerText = this.totalClicks;
    }
    startCountDown() {
        return setInterval(() => {
            this.timeLeft--;
            this.timer.innerText = this.timeLeft;
            if(this.timeLeft === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        this.soundEffect.gameOver();
        document.getElementById('game-over').classList.add('visible');
    }
    victory() {
        clearInterval(this.countDown);
        this.soundEffect.victory();
        document.getElementById('win').classList.add('visible');
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.soundEffect.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.checkingCard) {
                this.checkCardMatching(card);
            } else {
                this.checkingCard = card;
            }
        }
    }
    checkCardMatching(card) {
        if(this.getCardType(card) === this.getCardType(this.checkingCard))
            this.cardMatching(card, this.checkingCard);
        else 
            this.unmatchedCard(card, this.checkingCard);

        this.checkingCard = null;
    }
    cardMatching(card1, card2) {
        this.sameCard.push(card1);
        this.sameCard.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.soundEffect.match();
        if(this.sameCard.length === this.cardsArray.length)
            this.victory();
    }
    unmatchedCard(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray) { 
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randomIndex].style.order = i;
            cardsArray[i].style.order = randomIndex;
        }
    }
    getCardType(card) {
        return card.getElementsByClassName('christmas')[0].src;
    }
    canFlipCard(card) {
        return !this.busy && !this.sameCard.includes(card) && card !== this.checkingCard;
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay_text'));
    let cards = Array.from(document.getElementsByClassName('memory_card'));
    let game = new MerryMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}