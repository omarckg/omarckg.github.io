document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del Chat Widget
    const chatButton = document.getElementById('openChat');
    const chatWidget = document.getElementById('chatWidget');
    const closeButton = document.getElementById('closeChat');
    const startChatButton = document.getElementById('startChat');

    chatButton.addEventListener('click', function() {
        chatWidget.classList.remove('hidden');
    });

    closeButton.addEventListener('click', function() {
        chatWidget.classList.add('hidden');
    });

    startChatButton.addEventListener('click', function() {
        window.location.href = "https://wa.me/573170986273";
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-modern');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(57, 137, 101, 0.95)';
        } else {
            navbar.style.backgroundColor = '#398965';
        }
    });

    // Animación para el texto de la misión
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach((span, index) => {
                    span.style.animationDelay = `${index * 0.05}s`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar los textos animados
    document.querySelectorAll('.mision-texto, .que-es-texto').forEach(element => {
        observer.observe(element);
    });
});
