let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsWrapper = document.getElementById('dots-wrapper');
const counterElement = document.getElementById('slide-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');


// MOSTRAR SLIDES
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  
  currentSlide = index;
  slides[currentSlide].classList.add('active');
}


// Inicializa indicadores (dots)
function initDots() {
    dotsWrapper.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsWrapper.appendChild(dot);
    });
}

// Atualiza o slide ativo e a interface
function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    counterElement.textContent = `Slide ${currentSlide + 1} de ${totalSlides}`;
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === totalSlides - 1;

    // Mantém o dot ativo visível no scroll horizontal em telas menores
    if (dots[currentSlide]) {
        dots[currentSlide].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function changeSlide(direction) {
    const newIndex = currentSlide + direction;
    if (newIndex >= 0 && newIndex < totalSlides) {
        currentSlide = newIndex;
        updateSlide();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        updateSlide();
    }
}

// Navegação via Teclado (Setas Esquerda e Direita)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});

// Suporte a Gestos Touch / Swipe em Dispositivos Móveis
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        changeSlide(1);  // Swipe para a esquerda -> Próximo
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeSlide(-1); // Swipe para a direita -> Anterior
    }
}

// Inicializar na carga da página
window.onload = () => {
    initDots();
    updateSlide();
};


// Funções para os overlays (Zoom de tabelas/vídeos)
function abrirZoom(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add('active');
  }
}

function fecharZoom(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('active');
  }
}


/*
function abrirZoom(id) {
    document.getElementById(id).classList.add('ativo');
}

function fecharZoom(id) {
    document.getElementById(id).classList.remove('ativo');
}*/



// Controle de video
const video = document.getElementById('meuVideo');

// Definimos o trecho desejado (em segundos)
const inicio = 93; // Começa aos 93 segundos
const fim = 155;    // Termina aos 155 segundos

// Quando o vídeo carregar, define o tempo inicial
video.addEventListener('loadedmetadata', function () {
    video.currentTime = inicio;
});

// Monitora o tempo atual do vídeo para pausar quando chegar no fim
video.addEventListener('timeupdate', function () {
    if (video.currentTime >= fim) {
        video.pause();
    }
});


// Navegação por teclado (Setas Esquerda / Direita)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') {
    if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    if (currentSlide > 0) showSlide(currentSlide - 1);
  }
});



// Seleciona todas as divs que devem aparecer gradualmente
const revealDivs = document.querySelectorAll('.reveal-div');
let currentIndex = 0;

// Função que avança para o próximo elemento ao clicar ou apertar espaço
function revealNext() {
    if (currentIndex < revealDivs.length) {
        revealDivs[currentIndex].classList.add('active');
        currentIndex++;
    }
}

// Ouve cliques do mouse na tela inteira
document.addEventListener('click', revealNext);

// Ouve também a tecla de Espaço ou Seta Direita para facilitar o uso no teclado
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Evita a rolagem padrão da página com a barra de espaço
        revealNext();
    }
});




