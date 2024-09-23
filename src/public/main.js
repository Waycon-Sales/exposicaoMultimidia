var inExecution = false;
const socket = io();
socket.on('serial:data', (dataSerial) => {
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

const audioFiles = ['./audio/fala01-1.mp3', './audio/fala01-2.mp3']; // Adicione seus arquivos de áudio aqui
const textAudio = ['<span class="titleNunito">Olá, viajante do tempo!</span> </br> <p class="textNunito">Eu sou Pelegrino, seu guia nesta jornada pelos momentos mais marcantes do século XX. </br> Juntos, vamos explorar as duas Guerras Mundiais e a Guerra Fria, momentos de grandes conflitos, mas também de profundas mudanças para a humanidade.  </br> Pronto para começar? Então vamos ao início de tudo... a Primeira Guerra Mundial!</p>', '<span class="titleNunito">Que época intensa, não?</span> </br> <p class="textNunito">A Primeira Guerra mudou o mundo, mas infelizmente, não seria o último grande conflito. </br> Agora, viajante, é hora de avançar. O próximo capítulo dessa história está logo ali, no próximo computador. Lá, falaremos sobre a Segunda Guerra Mundial. </br> Quando estiver pronto, siga em frente e eu te encontrarei lá!</p>']
let currentAudioIndex = 0;

function startInteraction() {
    inExecution = true;
    playNextAudio();
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
                line.classList.remove('hidden');
                circleObj.classList.remove('hidden');
                gifCharacter.classList.remove('hidden');
                line.classList.add('line');
                circleObj.classList.add('circle');
                gifCharacter.classList.add('moving-image');
                app.classList.add('bgImage');
                hideDialog();
                character.classList.add('hidden');
                setTimeout(() => {
                    line.classList.add('hidden');
                    circleObj.classList.add('hidden');
                    gifCharacter.classList.add('hidden');
                    line.classList.remove('line');
                    circleObj.classList.remove('circle');
                    gifCharacter.classList.remove('moving-image');
                    app.classList.remove('bgImage');
                    
                    playVideo();
                }, 10000);
                
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
    app.classList.add('bgImage');
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
        app.classList.remove('bgImage');
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

