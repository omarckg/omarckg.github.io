document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-modern');
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
        }
    });

    // Al cargar la página, asegúrate de que el navbar sea transparente
    const navbar = document.querySelector('.navbar-modern');
    navbar.classList.add('navbar-transparent');

    // Animaciones de fade-up
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    fadeUpElements.forEach(element => observer.observe(element));

    // Funcionalidad del Acordeón para Preguntas Frecuentes
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling; // El contenido es el siguiente hermano

            // Cierra todos los acordeones abiertos excepto el actual
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                const otherContent = otherHeader.nextElementSibling;
                if (otherItem !== accordionItem && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = null; // Cierra el contenido
                }
            });

            // Alterna la clase 'active' para el encabezado y el contenido del acordeón actual
            header.classList.toggle('active');
            accordionContent.classList.toggle('active');

            // Ajusta la altura máxima para el contenido
            if (accordionContent.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Expande al tamaño del contenido
            } else {
                accordionContent.style.maxHeight = null; // Contrae
            }
        });
    });
});

// js/carousel.js (ejemplo, puede que tengas ya algo similar)
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que estos selectores sigan siendo correctos para las diapositivas
    const carouselInner = document.querySelector('.about-us-content .carousel-inner');
    const slides = document.querySelectorAll('.about-us-content .carousel-slide');

    // CORRECCIÓN: Actualiza los selectores para los botones y los indicadores
    // Ahora están directamente bajo .about-us-container
    const prevBtn = document.querySelector('.about-us-container .carousel-control.prev');
    const nextBtn = document.querySelector('.about-us-container .carousel-control.next');
    const indicatorsContainer = document.querySelector('.about-us-container .carousel-indicators');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        updateIndicators(index);
        carouselInner.style.transform = `translateX(${-index * 100}%)`;
    }

    function updateIndicators(index) {
        indicatorsContainer.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }

    // Asegúrate de que los botones existan antes de añadir el event listener
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            showSlide(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        });
    }

    // Inicializar el carrusel en la primera slide
    // Asegúrate de que haya diapositivas antes de intentar mostrarlas
    if (slides.length > 0) {
        showSlide(currentIndex);
    }


    // Opcional: Agregar funcionalidad a los indicadores
    if (indicatorsContainer) {
        indicatorsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = Array.from(indicatorsContainer.children).indexOf(e.target);
                currentIndex = index;
                showSlide(currentIndex);
            }
        });
    }
});

// Función para animar números
function animateNumbers() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    statsNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                statNumber.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                statNumber.textContent = target.toLocaleString();
            }
        };
        
        updateNumber();
    });
}

// Observador de intersección para activar la animación cuando el elemento sea visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar el banner de estadísticas
document.addEventListener('DOMContentLoaded', () => {
    const statsBanner = document.querySelector('.stats-banner');
    if (statsBanner) {
        observer.observe(statsBanner);
    }
});

// Carrusel de fotos para bienestar comunitario
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.bienestar-carousel');
    
    carousels.forEach(carousel => {
        const carouselInner = carousel.querySelector('.bienestar-carousel-inner');
        const slides = carousel.querySelectorAll('.bienestar-carousel-slide');
        const prevBtn = carousel.querySelector('.bienestar-carousel-control.prev');
        const nextBtn = carousel.querySelector('.bienestar-carousel-control.next');
        const indicators = carousel.querySelectorAll('.bienestar-carousel-indicator');
        
        let currentIndex = 0;
        let autoPlayInterval;

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

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event listeners para controles
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay(); // Reiniciar autoplay
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay(); // Reiniciar autoplay
            });
        }

        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopAutoPlay();
                startAutoPlay(); // Reiniciar autoplay
            });
        });

        // Pausar autoplay al hacer hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Inicializar
        showSlide(0);
        startAutoPlay();
    });
});

