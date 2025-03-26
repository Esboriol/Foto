const video = document.getElementById("camera");
const botao = document.getElementById("capturar");
const pe = document.getElementById("preto");

const canvases = [
    document.getElementById("foto1"),
    document.getElementById("foto2"),
    document.getElementById("foto3"),
    document.getElementById("foto4"),
    document.getElementById("foto5"),
    document.getElementById("foto6"),
    document.getElementById("foto7"),
    document.getElementById("foto8")
];

const lig = document.getElementById("ligar");
const des = document.getElementById("desligar");

let dados;
let currentCanvasIndex = 0;  

async function startCamera() {
    try {
        dados = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = dados;
    } catch (erro) {
        alert('Erro ao abrir a câmera');
    }
}

function stopCamera() {
    if (dados) {
        dados.getTracks().forEach(track => track.stop());
        video.srcObject = null; 
    }
}

lig.addEventListener('click', function() {
    startCamera();
});

des.addEventListener('click', function() {
    stopCamera();
});

function captureImage() {
    const canva = canvases[currentCanvasIndex];  
    const contexto = canva.getContext('2d');
    canva.width = video.videoWidth;
    canva.height = video.videoHeight;
    
    contexto.drawImage(video, 0, 0, canva.width, canva.height);
    
    canva.style.display = 'block';
    
    canva.style.filter = "grayscale(0%)";  
    
    currentCanvasIndex++;
    
    if (currentCanvasIndex >= canvases.length) {
        currentCanvasIndex = 0;
    }
}

botao.addEventListener('click', captureImage);

pe.addEventListener('click', function() {
    const canva = canvases[currentCanvasIndex];  
    const contexto = canva.getContext('2d');
    canva.width = video.videoWidth;
    canva.height = video.videoHeight;
    
    contexto.drawImage(video, 0, 0, canva.width, canva.height);
    
    canva.style.display = 'block';
    
    canva.style.filter = "grayscale(100%)"; 

    currentCanvasIndex++;
    
    if (currentCanvasIndex >= canvases.length) {
        currentCanvasIndex = 0;
    }
});
