console.log("Welcome to TicTacToe!");

let bgmusic = new Audio("assets/8bit.mp3");
let audioTurn = new Audio("assets/click.mp3");
let over = new Audio("assets/game-over.mp3");

let turn = "X";
let isgameover = false;


const fadeVolume = (targetVolume, duration) => {
    let step = (targetVolume - bgmusic.volume) / (duration / 100);
    let fade = setInterval(() => {
        bgmusic.volume = Math.max(0, Math.min(1, bgmusic.volume + step));

        if ((step > 0 && bgmusic.volume >= targetVolume) || (step < 0 && bgmusic.volume <= targetVolume)) {
            clearInterval(fade);
        }
    }, 100);
};

const startMusic = () => {
    bgmusic.loop = true;
    bgmusic.volume = 1.0;
    bgmusic.play().catch(error => console.log("Autoplay blocked, waiting for user action..."));

    let startScreen = document.getElementById("startScreen");
    let gameContainer = document.querySelector(".gameContainer");

    gameContainer.style.filter = "blur(0)";
    
    startScreen.style.animation = "swipeUp 0.7s ease-in-out forwards";
    startScreen.addEventListener("animationend", () => {
        startScreen.style.display = "none";
    });
    };


document.getElementById("startScreen").addEventListener("click", startMusic);


const changeTurn = () => (turn === "X" ? "O" : "X");


const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    wins.forEach(e => {
        if (
            boxtexts[e[0]].innerText !== "" &&
            boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
            boxtexts[e[0]].innerText === boxtexts[e[2]].innerText
        ) {
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won!";
            isgameover = true;
            over.play();
            fadeVolume(1.0, 2000); 
        }
    });
};


let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameover) {
            if (bgmusic.volume === 1.0) fadeVolume(0.5, 2000);
            boxtext.innerText = turn;


            audioTurn.currentTime = 0;
            audioTurn.play();

            turn = changeTurn();
            checkWin();

            if (!isgameover) {
                document.querySelector(".info").innerText = turn + ", your turn!";
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(box => box.innerText = "");
    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "X, your turn!";
    fadeVolume(0.4, 900); 

});
