document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.donantes-slider');
    const prevBtn = document.querySelector('.donantes-control.prev');
    const nextBtn = document.querySelector('.donantes-control.next');
    let position = 0;

    function slideNext() {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        position = Math.min(position + 200, maxScroll);
        slider.style.transform = `translateX(-${position}px)`;
    }

    function slidePrev() {
        position = Math.max(position - 200, 0);
        slider.style.transform = `translateX(-${position}px)`;
    }

    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);
});
