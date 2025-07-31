document.addEventListener("DOMContentLoaded", function() {
    // --- DATA for "Art That Makes No Sense" ---
    const slideData = [
        {
            imgSrc: "https://www.artchive.com/wp-content/uploads/2023/04/Untitled-Twombly-Cy-1961-2.jpg",
            title: "Untitled (1961)",
            artist: "Mark Rothko",
            description: "Sold for a cool $28 million, this painting features several rectangular... things. Rothko was a master of evoking deep emotion through color, and the emotion this piece evokes is wondering how three rectangles can be worth more than a private island. It's not just blue and green; it's 'financially independent' blue and 'I own a yacht' green."
        },
        {
            imgSrc: "https://vitruvius.museumseven.com/render/600-600@2/dp-458777-22.jpg",
            title: "White Center & Calla Lilies",
            artist: "Georgia O'Keeffe",
            description: "While visually stunning, this piece fetched $44.4 million, making it the most expensive painting ever sold by a woman at the time. The 'makes no sense' part isn't the art itself, but the mind-boggling price tag attached to it. It’s a beautiful exploration of form and... extreme wealth."
        },
        {
            imgSrc: "https://images.squarespace-cdn.com/content/v1/65ca8126025b8b2aeb60b542/bee49b09-fdc5-437d-af81-2047fd8dafc1/Screenshot+2024-03-17+at+01.58.34.png?format=1000w",
            title: "Onement VI",
            artist: "Barnett Newman",
            description: "Behold, two blue rectangles separated by a single white line, or as the art world calls it, a 'zip.' This masterpiece of minimalism sold for $43.8 million. It’s a profound statement on space, color, and the fact that sometimes, a single well-placed line is all you need to pay off a small country's debt."
        },
        {
            imgSrc: "https://www.willem-de-kooning.org/assets/img/paintings/interchange.jpg",
            title: "Interchanged",
            artist: "Willem de Kooning",
            description: "This energetic explosion of abstract expressionism was traded for a staggering $300 million. It’s a chaotic dance of color and form that makes you question everything you know about art, value, and what you could buy with that kind of money (approximately 60 million pizzas)."
        }
    ];

    // --- DOM ELEMENTS ---
    const background = document.querySelector("#background-blur");
    const track = document.querySelector(".carousel-track");
    const nextButton = document.querySelector("#nextBtn");
    const prevButton = document.querySelector("#prevBtn");
    const modal = document.querySelector("#modal");
    const closeModalBtn = document.querySelector("#close-modal-btn");

    // Populate slides from data
    track.innerHTML = slideData.map(data => `
        <div class="carousel-slide">
            <img src="${data.imgSrc}" alt="${data.title}">
        </div>
    `).join('');
    
    const slides = Array.from(track.children);
    let currentIndex = 0;

    // --- MODAL FUNCTIONS ---
    function openModal(index) {
        const data = slideData[index];
        modal.querySelector("#modal-img").src = data.imgSrc;
        modal.querySelector("#modal-title").innerText = `${data.title} (${data.artist})`;
        modal.querySelector("#modal-description").innerText = data.description;
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    // --- CAROUSEL FUNCTIONS ---
    function updateBackground() {
        const currentSlideImage = slideData[currentIndex].imgSrc;
        background.style.backgroundImage = `url(${currentSlideImage})`;
    }

    function updateCarousel() {
        slides.forEach((slide, index) => {
            const offset = index - currentIndex;
            const properties = {
                xPercent: offset * 100,
                scale: offset === 0 ? 1 : 0.8,
                rotationY: offset === 0 ? 0 : -45 * Math.sign(offset),
                z: -Math.abs(offset) * 200,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
                zIndex: slides.length - Math.abs(offset),
                duration: 0.5,
                ease: "power2.out"
            };
            gsap.to(slide, properties);
        });
        updateBackground();
    }

    // --- EVENT LISTENERS ---
    track.addEventListener('click', (e) => {
        const clickedSlide = e.target.closest('.carousel-slide');
        if (!clickedSlide) return;
        const slideIndex = slides.indexOf(clickedSlide);
        if (slideIndex === currentIndex) {
            openModal(slideIndex);
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    const hammertime = new Hammer(track);
    hammertime.on('swipeleft', () => nextButton.click());
    hammertime.on('swiperight', () => prevButton.click());

    nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // --- INITIALIZE ---
    updateCarousel();
});