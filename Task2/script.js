function createSlider(config) {
    const {
        containerId,
        images = [],
        duration = 500,
        autoplay = false,
        showArrows = true,
        showDots = true
    } = config;

    let currentIndex = 0;
    let intervalId;
    const container = document.getElementById(containerId);

    const slider = document.createElement("div");
    slider.className = "slider";

    const track = document.createElement("div");
    track.className = "slider-track";

    images.forEach(src => {
        const slide = document.createElement("div");
        slide.className = "slide";
        const img = document.createElement("img");
        img.src = src;
        slide.appendChild(img);
        track.appendChild(slide);
    });

    slider.appendChild(track);

    if (showArrows) {
        const leftArrow = document.createElement("div");
        leftArrow.className = "slider-arrows left";
        leftArrow.innerHTML = "←";
        leftArrow.onclick = () => moveSlide(-1);

        const rightArrow = document.createElement("div");
        rightArrow.className = "slider-arrows right";
        rightArrow.innerHTML = "→";
        rightArrow.onclick = () => moveSlide(1);

        slider.appendChild(leftArrow);
        slider.appendChild(rightArrow);
    }

    let dots = [];
    if (showDots) {
        const dotsContainer = document.createElement("div");
        dotsContainer.className = "slider-dots";
        images.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.className = "slider-dot";
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dots.push(dot);
            dotsContainer.appendChild(dot);
        });
        slider.appendChild(dotsContainer);
    }

    container.appendChild(slider);

    function updateSlider() {
        track.style.transition = `transform ${duration}ms ease`;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === currentIndex)
        );
    }

    function moveSlide(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        updateSlider();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function startAutoplay() {
        if (autoplay) {
            intervalId = setInterval(() => moveSlide(1), duration + 1500);
        }
    }

    function stopAutoplay() {
        clearInterval(intervalId);
    }

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") moveSlide(-1);
        if (e.key === "ArrowRight") moveSlide(1);
    });

    startAutoplay();
}
