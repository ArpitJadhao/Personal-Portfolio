/**
 * =====================================================================================
 * SECTION 1: PROJECT PAGINATION & DISPLAY
 * Handles showing and hiding project cards in a paginated view.
 * =====================================================================================
 */

const projectCards = document.querySelectorAll('.project-card');
const projectsPerPage = 3;
let currentPage = 1;

// Shows a specific page of projects
function showProjects(page) {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;

    projectCards.forEach((card, index) => {
        // Initially hide the card and prepare for animation
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        if (index >= startIndex && index < endIndex) {
            // Show the card if it's on the current page
            card.style.display = 'block';
            // Animate the card into view with a staggered delay
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (index % projectsPerPage) * 100);
        } else {
            card.style.display = 'none';
        }
    });

    updatePaginationButtons();
}

// Generates and updates the pagination control buttons
function updatePaginationButtons() {
    const totalPages = Math.ceil(projectCards.length / projectsPerPage);
    const paginationContainer = document.querySelector('.pagination');

    if (paginationContainer) {
        paginationContainer.innerHTML = ''; // Clear existing buttons

        // 1. "Previous" Button
        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-btn', 'prev-btn');
        prevButton.innerHTML = '&larr;'; // Left arrow
        prevButton.disabled = (currentPage === 1);
        prevButton.setAttribute('aria-label', 'Previous page');
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showProjects(currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);

        // 2. Page Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('pagination-btn', 'page-num');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                showProjects(currentPage);
            });
            paginationContainer.appendChild(pageButton);
        }

        // 3. "Next" Button
        const nextButton = document.createElement('button');
        nextButton.classList.add('pagination-btn', 'next-btn');
        nextButton.innerHTML = '&rarr;'; // Right arrow
        nextButton.disabled = (currentPage === totalPages);
        nextButton.setAttribute('aria-label', 'Next page');
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showProjects(currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    }
}

/**
 * =====================================================================================
 * SECTION 2: ANIMATIONS & INTERACTIVITY
 * Handles animations on scroll and various user interactions.
 * =====================================================================================
 */

// Observer to lazy-load the projects section
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // When the projects container is intersecting with the viewport
        if (entry.isIntersecting) {
            // Check if it's the right container and pagination hasn't been built yet
            if (entry.target.classList.contains('projects-container') && !document.querySelector('.pagination .active')) {
                showProjects(currentPage);
            }
            // Stop observing once it's visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const projectsContainer = document.querySelector('.projects-container');
if (projectsContainer) {
    projectObserver.observe(projectsContainer);
}

// Add hover effects to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const description = card.querySelector('.project-description');
        if (description) {
            description.style.transform = 'scale(1.05)';
        }
    });
    card.addEventListener('mouseleave', () => {
        const description = card.querySelector('.project-description');
        if (description) {
            description.style.transform = 'scale(1)';
        }
    });
});

// Handle project description visibility
const projectBtns = document.querySelectorAll('.project-btn');
projectBtns.forEach(button => {
    button.addEventListener('click', event => {
        if (button.getAttribute('href') === '#') {
            event.preventDefault(); // Prevent jumping to top of page
            const projectCard = button.closest('.project-card');
            const description = projectCard.querySelector('.project-description');
            if (description) {
                description.classList.add('show');
            }
        }
    });
});

// Handle closing the project description
const closeButtons = document.querySelectorAll('.close-description');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const description = button.closest('.project-description');
        description.classList.remove('show');
    });
});

// Automatic image slideshow for a specific project card
function startFSASlideshow() {
    const fsaImage = document.querySelector('.project-card img[alt="FSA"]');
    if (!fsaImage) return;

    const imageUrls = [
        '/public/assets/projects/project2-0.webp',
        '/public/assets/projects/project2-1.webp',
        '/public/assets/projects/project2-2.webp'
    ];
    let currentImageIndex = 0;

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        fsaImage.style.opacity = '0'; // Fade out
        setTimeout(() => {
            fsaImage.src = imageUrls[currentImageIndex];
            fsaImage.style.opacity = '1'; // Fade in
        }, 100); // 100ms for fade transition
    }, 10000); // Change image every 10 seconds
}

// Animate website buttons when they scroll into view
function animateWebsiteButtons() {
    const websiteButtons = document.querySelectorAll('.website-btn');
    const websitesSection = document.querySelector('.websites-section');

    if (!websiteButtons.length || !websitesSection) return;

    const websiteObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                websiteButtons.forEach((button, index) => {
                    // Staggered animation
                    setTimeout(() => {
                        button.style.opacity = '1';
                        button.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
                websiteObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    websiteObserver.observe(websitesSection);

    // Set initial styles for animation
    websiteButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px)';
        button.style.transition = 'all 0.6s ease';
    });
}


/**
 * =====================================================================================
 * SECTION 3: DYNAMIC CONTENT GENERATION & GLOBAL LISTENERS
 * Handles content that is created on page load and sets up global event handlers.
 * =====================================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // ---- Generate Skills List ----
    const skillsData = [
        { name: 'Python', level: 4, description: 'Automation, data analysis, GUI applications with Tkinter' },
        { name: 'HTML/CSS/JS', level: 4, description: 'Game development with Unreal Engine, data structures, algorithms' },
        { name: 'Machine Learning', level: 2, description: 'Game mechanics, level design, blueprints, C++ integration' },
        { name: 'C/C++', level: 3, description: 'Web development, interactive features, DOM manipulation' },
        { name: 'SQL', level: 3, description: 'Responsive design, modern layouts, animations' },
        { name: 'Git/Github', level: 3, description: 'Game prototyping, mobile development, C# integration' },
        { name: 'PowerBI/Tableau', level: 4, description: 'Version control, collaboration, project management' },
        { name: 'Google Colab', level: 2, description: 'Database design, queries, data management' }
    ];

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillsData.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';

            const skillHeader = document.createElement('div');
            skillHeader.className = 'skill-header';

            const skillName = document.createElement('div');
            skillName.className = 'skill-name';
            skillName.textContent = skill.name;

            const skillLevel = document.createElement('div');
            skillLevel.className = 'skill-level';
            for (let i = 1; i <= 5; i++) {
                const dot = document.createElement('div');
                dot.className = (i <= skill.level) ? 'dot filled' : 'dot';
                skillLevel.appendChild(dot);
            }

            const skillInfo = document.createElement('div');
            skillInfo.className = 'skill-info';
            skillInfo.textContent = skill.description;

            skillHeader.appendChild(skillName);
            skillHeader.appendChild(skillLevel);
            skillCard.appendChild(skillHeader);
            skillCard.appendChild(skillInfo);
            skillsContainer.appendChild(skillCard);
        });
    }

    // ---- Initialize Animations ----
    startFSASlideshow();
    animateWebsiteButtons();

    // ---- Disable Context Menu & Copying ----
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserDrag = 'none';
    document.body.style.MozUserSelect = 'none';
    document.addEventListener('dragstart', event => event.preventDefault());
    document.addEventListener('keydown', event => {
        // Disable Ctrl+C
        if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'C')) {
            event.preventDefault();
            return true;
        }
    });
});


/**
 * =====================================================================================
 * SECTION 4: INFINITE CERTIFICATE SCROLLER (BUG-FIXED)
 * Creates a draggable, auto-scrolling infinite carousel for certificates.
 * =====================================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for all content including images to load before calculating widths
    window.addEventListener('load', setupCertificateScroller);
});

function setupCertificateScroller() {
    const certificatesGroup = document.querySelector('.certificates-group');
    if (!certificatesGroup) return;

    const clonedGroup = certificatesGroup.cloneNode(true);
    const certificatesTrack = document.querySelector('.certificates-track');
    if (!certificatesTrack) return;
    
    certificatesTrack.appendChild(clonedGroup);

    const groupWidth = certificatesGroup.offsetWidth;
    let isDragging = false;
    let startX, scrollLeft, animationFrameId; // This will hold the ID of our animation loop
    let scrollSpeed = 0.5;
    let currentTranslateX = 0;

    // Create dedicated functions to start and stop the animation loop safely.
    function stopScrolling() {
        cancelAnimationFrame(animationFrameId);
    }

    function startScrolling() {
        // IMPORTANT: Always stop any previous loop before starting a new one.
        stopScrolling(); 
        
        function scrollLoop() {
            if (groupWidth > 0 && Math.abs(currentTranslateX) >= groupWidth) {
                currentTranslateX = 0; // Reset position for infinite effect
            }
            currentTranslateX -= scrollSpeed;
            certificatesTrack.style.transform = `translateX(${currentTranslateX}px)`;
            animationFrameId = requestAnimationFrame(scrollLoop);
        }
        scrollLoop();
    }

    // Start the scrolling initially
    startScrolling();

    const scrollContainer = document.querySelector('.certificates-scroll-container');
    if (!scrollContainer) return;

    // --- MOUSE DRAG EVENTS ---
    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - certificatesTrack.offsetLeft;
        scrollLeft = currentTranslateX;
        stopScrolling();
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
        startScrolling();
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
        startScrolling();
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - certificatesTrack.offsetLeft;
        const walk = (x - startX) * 2;
        currentTranslateX = scrollLeft + walk;
        certificatesTrack.style.transform = `translateX(${currentTranslateX}px)`;
    });

    // --- TOUCH DRAG EVENTS ---
    scrollContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - certificatesTrack.offsetLeft;
        scrollLeft = currentTranslateX;
        stopScrolling();
    }, { passive: true });

    scrollContainer.addEventListener('touchend', () => {
        isDragging = false;
        startScrolling();
    });

    scrollContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - certificatesTrack.offsetLeft;
        const walk = (x - startX) * 2;
        currentTranslateX = scrollLeft + walk;
        certificatesTrack.style.transform = `translateX(${currentTranslateX}px)`;
    }, { passive: true });


    // --- CERTIFICATE CARD EVENTS ---
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });

        // Pause scrolling on hover
        card.addEventListener('mouseenter', function() {
            stopScrolling();
            this.style.boxShadow = '0 15px 35px rgba(100, 100, 255, 0.4), 0 0 20px rgba(100, 100, 255, 0.2)';
        });

        // Resume scrolling on mouse leave
        card.addEventListener('mouseleave', function() {
            startScrolling();
            this.style.boxShadow = '';
        });
    });
    
    // --- RESPONSIVE SCROLL SPEED ---
    function adjustScrollSpeed() {
         scrollSpeed = window.innerWidth > 752 ? 0.8 : 0.5;
    }

    window.addEventListener('resize', () => {
         adjustScrollSpeed();
    });

    adjustScrollSpeed();
}