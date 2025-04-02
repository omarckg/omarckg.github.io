document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    let isTransitioning = false;

    function changeSlide(next = true) {
        if (isTransitioning) return;
        isTransitioning = true;

        const currentSlide = slides[currentIndex];
        currentSlide.classList.remove('active');
        indicators[currentIndex].classList.remove('active');

        // Aplicar transformaciones de zoom
        currentSlide.style.transform = 'scale(1.2)';
        currentSlide.style.opacity = '0';

        setTimeout(() => {
            if (next) {
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }

            const nextSlide = slides[currentIndex];
            nextSlide.classList.add('active');
            indicators[currentIndex].classList.add('active');

            // Aplicar transformaciones de zoom
            nextSlide.style.transform = 'scale(1)';
            nextSlide.style.opacity = '1';

            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }, 800);
    }

    // Auto cambio de slides
    let autoSlideInterval = setInterval(() => changeSlide(true), 5000);

    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        changeSlide(false);
        autoSlideInterval = setInterval(() => changeSlide(true), 5000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        changeSlide(true);
        autoSlideInterval = setInterval(() => changeSlide(true), 5000);
    });

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isTransitioning || index === currentIndex) return;
            clearInterval(autoSlideInterval);
            
            const currentSlide = slides[currentIndex];
            currentSlide.classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            const nextSlide = slides[currentIndex];
            nextSlide.classList.add('active');
            indicators[currentIndex].classList.add('active');

            // Aplicar clip-path dinámicamente
            nextSlide.style.clipPath = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
            setTimeout(() => {
                nextSlide.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            }, 400);
            
            autoSlideInterval = setInterval(() => changeSlide(true), 5000);
        });
    });

    // Inicializar el primer slide
    slides[0].classList.add('active');
    indicators[0].classList.add('active');

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-modern');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(57, 137, 101, 0.95)';
        } else {
            navbar.style.backgroundColor = '#398965';
        }
    });

    // Animaciones de aparición
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase fade-up
    document.querySelectorAll('.fade-up').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        observer.observe(element);
    });
}); 