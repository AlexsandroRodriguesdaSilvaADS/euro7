
// MOSTRAR SLIDES
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  
  currentSlide = index;
  slides[currentSlide].classList.add('active');
}






