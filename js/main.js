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
});

// js/carousel.js (ejemplo, puede que tengas ya algo similar)

