document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-modern');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        // Efecto de transparencia
        if (scrollTop > 50) {
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
        }
    });
    // Al cargar la página, asegúrate de que el navbar sea transparente
    navbar.classList.add('navbar-transparent');

    // Carrusel de fotos MANUAL
    const carousels = document.querySelectorAll('.bienestar-carousel');
    
    carousels.forEach(carousel => {
        const carouselInner = carousel.querySelector('.bienestar-carousel-inner');
        const slides = carousel.querySelectorAll('.bienestar-carousel-slide');
        const prevBtn = carousel.querySelector('.bienestar-carousel-control.prev');
        const nextBtn = carousel.querySelector('.bienestar-carousel-control.next');
        const indicators = carousel.querySelectorAll('.bienestar-carousel-indicator');
        
        let currentIndex = 0;

        function showSlide(index) {
            // Asegurar que el índice esté dentro del rango
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;
            
            // Mover el carrusel
            carouselInner.style.transform = `translateX(-${index * 25}%)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        // Event listeners para controles
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });
        }

        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Inicializar en la primera imagen
        showSlide(0);
    });

    console.log('Carousels encontrados:', document.querySelectorAll('.bienestar-carousel').length);
    console.log('Controles encontrados:', document.querySelectorAll('.bienestar-carousel-control').length);
}); 