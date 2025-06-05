// --- CONFIGURAÇÃO: Defina a data de INÍCIO aqui! ---
const startDate = new Date(2025, 0, 19, 0, 0, 0).getTime(); // Mês é 0 para Janeiro

const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateCountUp() {
    const now = new Date().getTime();
    const elapsedTime = now - startDate;

    if (elapsedTime < 0) {
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        return;
    }

    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
}

updateCountUp();
const countUpInterval = setInterval(updateCountUp, 1000);


// --- Efeito de corações flutuantes aleatórios ---
const heartContainer = document.querySelector('.heart-container');

function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('heart-emoji');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 10 + 5 + 's';
    heart.style.fontSize = Math.random() * 1.5 + 0.8 + 'em';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartContainer.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

setInterval(createHeart, 300);

// --- Lógica do Carrossel de Fotos (com Auto-play e Responsividade) ---
const carouselTrack = document.querySelector('.carousel-track');
const carouselImages = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let autoPlayInterval; // Variável para controlar o intervalo do auto-play
const autoPlayDelay = 5000; // Tempo em milissegundos (5 segundos)

// Função para obter a largura real de uma única imagem do carrossel
function getImageWidth() {
    // Garante que a imagem está visível e pega sua largura calculada pelo CSS
    return carouselImages.length > 0 ? carouselImages[0].offsetWidth : 0;
}

function moveToSlide(index) {
    const currentImageWidth = getImageWidth(); // Pega a largura atual da imagem
    carouselTrack.style.transform = `translateX(-${index * currentImageWidth}px)`;

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Inicia o auto-play
function startAutoPlay() {
    clearInterval(autoPlayInterval); // Limpa qualquer intervalo anterior para evitar duplicação
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
        moveToSlide(currentIndex);
    }, autoPlayDelay);
}

// Para o auto-play (usado na interação do usuário)
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Navegação pelos botões
prevBtn.addEventListener('click', () => {
    stopAutoPlay(); // Para o auto-play ao interagir
    currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
    moveToSlide(currentIndex);
    startAutoPlay(); // Reinicia o auto-play após a interação
});

nextBtn.addEventListener('click', () => {
    stopAutoPlay(); // Para o auto-play ao interagir
    currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
    moveToSlide(currentIndex);
    startAutoPlay(); // Reinicia o auto-play após a interação
});

// Navegação pelos pontos (dots)
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        stopAutoPlay(); // Para o auto-play ao interagir
        const slideIndex = parseInt(e.target.dataset.slideIndex);
        currentIndex = slideIndex;
        moveToSlide(currentIndex);
        startAutoPlay(); // Reinicia o auto-play após a interação
    });
});

// Ajusta a posição do carrossel ao redimensionar a janela
window.addEventListener('resize', () => {
    moveToSlide(currentIndex); // Recalcula e ajusta a posição
    stopAutoPlay(); // Para o auto-play temporariamente
    startAutoPlay(); // Reinicia após redimensionamento
});

// Inicializa a posição do carrossel e o auto-play quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    moveToSlide(currentIndex);
    startAutoPlay();
});

// Opcional: Pausar/Retomar auto-play ao passar o mouse sobre o carrossel
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
}