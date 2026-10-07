let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsWrapper = document.getElementById('dots-wrapper');
const counterElement = document.getElementById('slide-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

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



function abrirZoom(id) {
    document.getElementById(id).classList.add('ativo');
}

function fecharZoom(id) {
    document.getElementById(id).classList.remove('ativo');
}
