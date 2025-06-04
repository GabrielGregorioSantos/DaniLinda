// --- CONFIGURAÇÃO: Defina a data de INÍCIO aqui! ---
// Formato: Ano, Mês (0=Janeiro, 11=Dezembro), Dia, Hora, Minuto, Segundo
// Para 19 de Janeiro de 2025:
const startDate = new Date(2025, 0, 19, 0, 0, 0).getTime(); // Mês é 0 para Janeiro

const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateCountUp() {
    const now = new Date().getTime();
    const elapsedTime = now - startDate; // Agora calculamos o tempo decorrido

    if (elapsedTime < 0) {
        // Se por algum motivo a data de início for no futuro, mostra 00:00:00:00
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

// --- Lógica do Carrossel de Fotos ---
const carouselTrack = document.querySelector('.carousel-track');
const carouselImages = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const imageWidth = carouselImages[0] ? carouselImages[0].clientWidth : 0; // Largura de uma imagem

// Atualiza a largura da imagem se a janela for redimensionada
window.addEventListener('resize', () => {
    // Recalcula a largura da imagem, garantindo que o carrossel se ajuste
    if (carouselImages[0]) {
        imageWidth = carouselImages[0].clientWidth;
        moveToSlide(currentIndex); // Ajusta a posição da imagem atual
    }
});


function moveToSlide(index) {
    carouselTrack.style.transform = `translateX(-${index * imageWidth}px)`;

    // Atualiza os pontos de navegação
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navegação pelos botões
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
    moveToSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
    moveToSlide(currentIndex);
});

// Navegação pelos pontos (dots)
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slideIndex);
        currentIndex = slideIndex;
        moveToSlide(currentIndex);
    });
});

// Inicializa a posição do carrossel
moveToSlide(currentIndex);

// Opcional: Auto-play do carrossel
// const autoPlayInterval = setInterval(() => {
//     currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
//     moveToSlide(currentIndex);
// }, 5000); // Muda a foto a cada 5 segundos

// Para parar o auto-play ao interagir com o carrossel
// carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
// carouselContainer.addEventListener('mouseleave', () => {
//     autoPlayInterval = setInterval(() => {
//         currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
//         moveToSlide(currentIndex);
//     }, 5000);
// });