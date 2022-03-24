const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

const gap = 120; //растояние между трубами по высоте

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 30;
 fly.play();
}

// При нажатии на л мышь выс прыжок
cvs .addEventListener("click", moveUpUp);

function moveUpUp() {
    yPos -= 100;
    fly.play();
}

// Создание блоков
let pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

let score = 0;
// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.6;

function draw() {
 ctx.drawImage(bg, 0, 0); //картинка и координаты по Х и У

 for(let i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;
    //новый блок труб, после прохода до 125px
 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height ) {
 location.reload(); // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "18px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);
 
 requestAnimationFrame(draw);
}
// alert(`Кнопки на клавиатуре обычный прыжок,
// Левая кнопка мыши Высокий прыжок`)

pipeBottom.onload = draw; //после загрузки последней картинки выполняем функцию


// let start = document.querySelector('.button-game')
// start.onclick = draw;
