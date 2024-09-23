

var inExecution = false;

const socket = io();
socket.on('serial:data02', (dataSerial) => {
    console.log(dataSerial.value);
    if(dataSerial.value && inExecution == false){
        startInteraction();
    }
});

const character = document.getElementById('character-image');
const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');
const videoPlayer = document.getElementById('video-player');
const audioPlayer = document.getElementById('audio-player');
const line = document.getElementById('line');
const circleObj = document.getElementById('circle');
const gifCharacter = document.getElementById('gifPerson');

const app = document.getElementById('app');

const audioFiles = ['./audio/fala02-1.mp3', './audio/fala02-2.mp3']; // Adicione seus arquivos de áudio aqui
const textAudio = ['<span class="titleNunito">Bem-vindo de volta!</span> </br> <p class="textNunito">Agora, vamos entrar na Segunda Guerra Mundial. Esse foi um dos conflitos mais devastadores da história, que envolveu o mundo todo e teve consequências profundas para todos nós. Pronto para aprender mais? Vamos lá!</p>', '<span class="titleNunito">Uau, que jornada intensa, não é?</span> </br> <p class="textNunito">Mas nossa aventura ainda não terminou. Mesmo após o fim da Segunda Guerra, o mundo não encontrou a paz tão rapidamente. Agora, viajante, siga para o próximo computador, onde falaremos sobre a Guerra Fria. Eu estarei esperando por você.</p>']
let currentAudioIndex = 0;

character.addEventListener('click', startInteraction);

function startInteraction() {
    inExecution = true;
    character.removeEventListener('click', startInteraction);
    startAnimationLine();
    setTimeout(() => {
        closeAnimationLine();
        circleObj.style.animation = 'none';
        circleObj.offsetWidth;
        circleObj.style.animation = 'moveCircle 5s ease forwards';
        app.classList.remove('bgImage02');
        playNextAudio();
    }, 10000);





}

function startAnimationLine(){
    line.classList.remove('hidden');
    circleObj.classList.remove('hidden');
    gifCharacter.classList.remove('hidden');
    line.classList.add('line');
    circleObj.classList.add('circle');
    gifCharacter.classList.add('moving-image');
}

function closeAnimationLine(){
    line.classList.add('hidden');
    circleObj.classList.add('hidden');
    gifCharacter.classList.add('hidden');
    line.classList.remove('line');
    circleObj.classList.remove('circle');
    gifCharacter.classList.remove('moving-image');
}

function playNextAudio() {
    if (currentAudioIndex < audioFiles.length) {
        const audioFile = audioFiles[currentAudioIndex];
        audioPlayer.src = audioFile;
        audioPlayer.play();
        console.log(currentAudioIndex);
        showDialog(textAudio[currentAudioIndex]);
        character.classList.remove('hidden');
        startSlideshow()
        audioPlayer.onended = () => {
            stopSlideshow()
            console.log("fim do audio");
            console.log(currentAudioIndex);
            if (currentAudioIndex === 0) {
                playVideo();
            } else {
                currentAudioIndex++;
                playNextAudio();
            }
        };
    } else {
        resetAfterDelay();
    }
}

function showDialog(text) {
    dialogText.innerHTML = text;
    dialogBox.classList.remove('hidden');
}

function hideDialog() {
    dialogBox.classList.add('hidden');
}

function playVideo() {
    const fadeOutTime = 2;
    videoPlayer.classList.remove('fade-out');
    
    hideDialog();
    videoPlayer.classList.remove('hidden');
    videoPlayer.play();

    videoPlayer.addEventListener('timeupdate', () => {
        // Verifica se o vídeo está próximo do fim
        if (videoPlayer.duration - videoPlayer.currentTime <= fadeOutTime) {
            // Aplica a classe de fade out
            videoPlayer.classList.add('fade-out');
        }
    });

    videoPlayer.onended = () => {
        currentAudioIndex++;
        console.log("fim do video");
        videoPlayer.classList.add('hidden');
        playNextAudio();
    };


}

function resetAfterDelay() {
    line.classList.remove('hidden');
    gifCharacter.classList.remove('hidden');
    line.style.animation = 'drawLineFinal 20s ease forwards';
    gifCharacter.style.animation = 'moveImageFinal 25s ease forwards';
    line.classList.add('line');
    gifCharacter.classList.add('moving-image');
    app.classList.add('bgImage02');
    hideDialog();
    character.classList.add('hidden');
    setTimeout(() => {
        line.classList.add('hidden');
        gifCharacter.classList.add('hidden');
        line.classList.remove('line');
        gifCharacter.classList.remove('moving-image');
        character.classList.remove('hidden');
        gifCharacter.style.animation = 'none';
        gifCharacter.offsetWidth;
        gifCharacter.style.animation = 'moveImage  11s ease forwards';
        line.style.animation = 'none';
        line.offsetWidth;
        line.style.animation = 'drawLine 9s ease forwards';
        circleObj.style.animation = 'none';
        circleObj.offsetWidth;
        circleObj.style.animation = 'moveCircle 5s ease forwards';
        character.classList.add('hidden');
        currentAudioIndex = 0;
        hideDialog();
        character.addEventListener('click', startInteraction);
        audioPlayer.src = "";
        inExecution = false;
    }, 30000); // 30 segundos de espera
}

const circle = document.querySelector('.circle');
const body = document.getElementById('app');
const text = circleObj.querySelector('span');
text.style.opacity = '1'; 
circleObj.addEventListener('animationend', () => {
    circleObj.style.animation = 'expandCircle 1s ease forwards';
    setTimeout(() => {
        body.classList.add('expand-background');
    }, 1000);
});

let currentImage = 1;
const totalImages = 5; // Número total de imagens
let intervalId;

function changeImage() {
    const imgElement = character;
    
    imgElement.src = "./images/"+currentImage+ ".png"; // Altera o src da imagem
    
    currentImage = (currentImage % totalImages) + 1; // Loop de 1 a 6
    
}

function startSlideshow() {
    if (!intervalId) {
        intervalId = setInterval(changeImage, 3500); // Inicia a troca a cada 1.5 segundos
    }
}

// Função para parar o slideshow
function stopSlideshow() {
    clearInterval(intervalId); // Para o intervalo de troca
    intervalId = null; // Reseta o ID para evitar múltiplos intervalos
    character.src = './images/personagem.png'
    hideDialog();

}

