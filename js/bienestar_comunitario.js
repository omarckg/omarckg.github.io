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
}); 