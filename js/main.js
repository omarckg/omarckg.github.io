document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-modern');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#2c6b4d';
        } else {
            navbar.style.backgroundColor = '#398965';
        }
    });

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
