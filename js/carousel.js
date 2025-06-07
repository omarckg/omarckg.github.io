document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los elementos del carrusel para la sección 'about-us'
    const carouselInner = document.querySelector('.about-us-content .carousel-inner');
    const slides = document.querySelectorAll('.about-us-content .carousel-slide');
    const prevBtn = document.querySelector('.about-us-content .carousel-control.prev');
    const nextBtn = document.querySelector('.about-us-content .carousel-control.next');
    const indicatorsContainer = document.querySelector('.about-us-content .carousel-indicators');

    // Si no encontramos los elementos, salimos de la función para evitar errores
    if (!carouselInner || !slides.length || !prevBtn || !nextBtn || !indicatorsContainer) {
        console.warn('No se encontraron todos los elementos del carrusel. Asegúrate de que la estructura HTML sea correcta.');
        return;
    }

    let currentIndex = 0; // Índice de la slide actual

    // Función para mostrar una slide específica
    function showSlide(index) {
        // Ocultar todas las slides
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        // Mostrar la slide activa y aplicar la transformación para el deslizamiento
        if (slides[index]) { // Asegurarse de que la slide exista
            slides[index].classList.add('active');
            carouselInner.style.transform = `translateX(${-index * 100}%)`;
            updateIndicators(index); // Actualizar los puntos indicadores
        }
    }

    // Función para actualizar los puntos indicadores
    function updateIndicators(index) {
        indicatorsContainer.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }

    // Event listener para el botón "Anterior"
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
    });

    // Event listener para el botón "Siguiente"
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    // Event listener para los puntos indicadores
    indicatorsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator')) {
            const index = Array.from(indicatorsContainer.children).indexOf(e.target);
            currentIndex = index;
            showSlide(currentIndex);
        }
    });

    // Inicializar el carrusel mostrando la primera slide al cargar la página
    showSlide(currentIndex);
});
