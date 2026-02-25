document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    // Using Array.from to create an array from the node list
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const indicatorsNav = document.querySelector('.carousel-nav');
    const indicators = Array.from(indicatorsNav.children);

    // Get the width of one slide
    // We use getBoundingClientRect because it includes padding/borders if box-sizing is border-box
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    
    // While we are using flexbox which arranges them, absolute positioning logic 
    // is often used in carousels for the transform calculation. 
    // However, with our flex-row track, we can just transform the track.
    // The width calculation above is consistent.

    const moveToSlide = (track, currentSlide, targetSlide) => {
        // Find the index of the target slide to calculate transform amount
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        
        // Move to the next slide
        track.style.transform = 'translateX(-' + (targetIndex * 100) + '%)';
        
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.style.display = 'none'; // Optional: hide prev on first slide
            nextButton.style.display = 'flex';
        } else if (targetIndex === slides.length - 1) {
            prevButton.style.display = 'flex';
            nextButton.style.display = 'none'; // Optional: hide next on last slide
        } else {
            prevButton.style.display = 'flex';
            nextButton.style.display = 'flex';
        }
    };

    // Initial check for arrows
    // hideShowArrows(slides, prevButton, nextButton, 0); 
    // NOTE: If you want infinite loop, remove the HideShowArrows logic and adjust moveToSlide logic.
    // For now, let's keep it simple (linear navigation) as per common "process" steps.

    // Button Events
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = indicatorsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        
        // Loop back to last if desired, or just stop. 
        // Let's implement loop for better UX if unlimited, 
        // but for "Process" (Steps 1,2,3), linear usually makes more sense. 
        // I will implement linear for now but if we are at start, maybe do nothing?
        if (!prevSlide) return;

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = indicatorsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;

        if (!nextSlide) return;

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });

    // Indicator Nav Events
    indicatorsNav.addEventListener('click', e => {
        // Which indicator was clicked on?
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = indicatorsNav.querySelector('.current-slide');
        const targetIndex = indicators.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });
});
