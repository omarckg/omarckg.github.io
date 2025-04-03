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

    // Panel de donaciones interactivo
    const donationTypeButtons = document.querySelectorAll('.donation-type button');
    const amountOptions = document.querySelectorAll('.amount-option');
    const customInput = document.querySelector('.amount-input input');
    const donationInfo = document.querySelector('.donation-info');

    const montos = {
        unica: ['30.000,00', '50.000,00', '150.000,00'],
        mensual: ['15.000,00', '25.000,00', '75.000,00']
    };

    donationTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            donationTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar montos según el tipo de donación
            const tipo = this.textContent.toLowerCase();
            const montosActuales = montos[tipo === 'mensual' ? 'mensual' : 'unica'];
            
            amountOptions.forEach((option, index) => {
                const amount = option.querySelector('.amount');
                if (amount) {
                    amount.textContent = montosActuales[index];
                }
            });

            // Actualizar el monto seleccionado si hay alguno activo
            const activeOption = document.querySelector('.amount-option.active');
            if (activeOption) {
                const newAmount = activeOption.querySelector('.amount').textContent;
                customInput.value = newAmount.replace(/[^0-9]/g, '');
                updateDonationInfo('$' + newAmount);
            }
        });
    });

    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const amount = this.querySelector('.amount').textContent;
            customInput.value = amount.replace(/[^0-9]/g, '');
            updateDonationInfo('$' + amount);
        });
    });

    customInput.addEventListener('input', function() {
        const amount = this.value;
        amountOptions.forEach(opt => opt.classList.remove('active'));
        updateDonationInfo(`$${amount},00`);
    });

    function updateDonationInfo(amount) {
        const tipo = document.querySelector('.donation-type button.active').textContent.toLowerCase();
        const mensaje = tipo === 'mensual' ? 
            `${amount} mensuales brindan alimentación sana y de calidad a una familia.` :
            `${amount} Brindas alimentación sana y de calidad a una familia.`;
        
        donationInfo.style.opacity = '0';
        setTimeout(() => {
            donationInfo.textContent = mensaje;
            donationInfo.style.opacity = '1';
        }, 100);
    }

    const donateButton = document.querySelector('.donate-button');
    donateButton.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 150);
    });

    // Observar todos los elementos con la clase fade-up
    document.querySelectorAll('.fade-up').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        observer.observe(element);
    });

    // Animación de contador para estadísticas
    function animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString('es-CO');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observer específico para las estadísticas
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const endValue = parseInt(numberElement.textContent.replace(/\D/g, ''));
                numberElement.textContent = '0';
                animateNumber(numberElement, 0, endValue, 2000);
                statsObserver.unobserve(numberElement);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observar todos los elementos con números de estadísticas
    document.querySelectorAll('.stat-number').forEach(element => {
        statsObserver.observe(element);
    });

    // Funcionalidad del Chat Widget
    const chatButton = document.getElementById('openChat');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const startChat = document.getElementById('startChat');

    chatButton.addEventListener('click', () => {
        chatWidget.classList.remove('hidden');
        chatButton.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.add('hidden');
        setTimeout(() => {
            chatButton.style.display = 'flex';
        }, 300);
    });

    startChat.addEventListener('click', () => {
        // Aquí puedes agregar la lógica para iniciar el chat real
        window.open('https://wa.me/573170986273', '_blank');
    });

    // Carrusel de Donantes
    const donantesSlider = document.querySelector('.donantes-slider');
    const donantePrevBtn = document.querySelector('.donantes-control.prev');
    const donanteNextBtn = document.querySelector('.donantes-control.next');
    const logoWidth = 240; // 200px del logo + 40px del gap
    let donantePosition = 0;
    const totalLogos = document.querySelectorAll('.donante-logo').length;
    const logosToShow = Math.floor(donantesSlider.clientWidth / logoWidth);
    let maxDonantePosition = -(totalLogos - logosToShow) * logoWidth;

    function updateSliderPosition() {
        donantesSlider.style.transform = `translateX(${donantePosition}px)`;
        
        // Actualizar estado de los botones
        donantePrevBtn.style.opacity = donantePosition === 0 ? '0.5' : '1';
        donanteNextBtn.style.opacity = donantePosition <= maxDonantePosition ? '0.5' : '1';
    }

    donantePrevBtn.addEventListener('click', () => {
        if (donantePosition === 0) return;
        donantePosition = Math.min(donantePosition + logoWidth, 0);
        updateSliderPosition();
    });

    donanteNextBtn.addEventListener('click', () => {
        if (donantePosition <= maxDonantePosition) return;
        donantePosition = Math.max(donantePosition - logoWidth, maxDonantePosition);
        updateSliderPosition();
    });

    // Actualizar maxPosition cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        const newLogosToShow = Math.floor(donantesSlider.clientWidth / logoWidth);
        const newMaxPosition = -(totalLogos - newLogosToShow) * logoWidth;
        maxDonantePosition = newMaxPosition;
        
        // Asegurarse de que la posición actual sea válida
        if (donantePosition < maxDonantePosition) {
            donantePosition = maxDonantePosition;
            updateSliderPosition();
        }
    });

    // Inicializar estado de los botones
    updateSliderPosition();
}); 