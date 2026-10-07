// ============================================
// 1. PARTICLES - CANVAS
// ============================================

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width;
let height;

let particles = [];

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 120;


function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}


resizeCanvas();

window.addEventListener('resize', resizeCanvas);


class Particle {

    constructor() {

        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.radius = Math.random() * 2 + 1;
    }


    update() {

        this.x += this.vx;
        this.y += this.vy;


        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
        }


        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
        }
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            'rgba(201, 24, 74, 0.6)';

        ctx.fill();
    }
}


function initParticles() {

    particles = [];

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {
        particles.push(
            new Particle()
        );
    }
}


function drawConnections() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                CONNECTION_DISTANCE
            ) {

                const opacity =
                    1 -
                    distance /
                    CONNECTION_DISTANCE;


                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(201, 24, 74, ${opacity * 0.25})`;

                ctx.lineWidth = 0.8;

                ctx.stroke();
            }
        }
    }
}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    for (const particle of particles) {

        particle.update();
        particle.draw();
    }


    drawConnections();


    requestAnimationFrame(
        animateParticles
    );
}


initParticles();
animateParticles();


// ============================================
// 2. TYPEWRITER
// ============================================

const typewriterElement =
    document.getElementById('typewriter');


const phrases = [

    'BTS Cybersecurity Student',

    'Penetration Testing enthusiast',

    'Red Team enthusiast',

    'Digital Forensics enthusiast',

    'Cybersecurity learner'

];


let phraseIndex = 0;

let charIndex = 0;

let isDeleting = false;

let typeSpeed = 80;


function typeEffect() {

    const currentPhrase =
        phrases[phraseIndex];


    if (isDeleting) {

        typewriterElement.textContent =
            currentPhrase.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        typeSpeed = 40;

    } else {

        typewriterElement.textContent =
            currentPhrase.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        typeSpeed = 80;
    }


    if (
        !isDeleting &&
        charIndex ===
            currentPhrase.length
    ) {

        isDeleting = true;

        typeSpeed = 2000;

    } else if (
        isDeleting &&
        charIndex === 0
    ) {

        isDeleting = false;

        phraseIndex =
            (phraseIndex + 1) %
            phrases.length;

        typeSpeed = 400;
    }


    setTimeout(
        typeEffect,
        typeSpeed
    );
}


typeEffect();


// ============================================
// 3. NAVIGATION
// ============================================

const navbar =
    document.getElementById('navbar');


const navLinks =
    document.querySelectorAll('.nav-link');


const sections =
    document.querySelectorAll(
        'section[id]'
    );


window.addEventListener(
    'scroll',
    () => {

        navbar.classList.toggle(
            'scrolled',
            window.scrollY > 60
        );

    }
);


function updateActiveLink() {

    let current = '';

    const scrollPosition =
        window.scrollY + 120;


    sections.forEach(section => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;


        if (
            scrollPosition >= top &&
            scrollPosition <
                top + height
        ) {

            current =
                section.getAttribute(
                    'id'
                );
        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            'active'
        );


        if (
            link.getAttribute('href') ===
            `#${current}`
        ) {

            link.classList.add(
                'active'
            );
        }

    });

}


window.addEventListener(
    'scroll',
    updateActiveLink
);


window.addEventListener(
    'load',
    updateActiveLink
);


// ============================================
// 4. HAMBURGER MENU
// ============================================

const hamburger =
    document.getElementById(
        'hamburger'
    );


const navLinksContainer =
    document.getElementById(
        'navLinks'
    );


hamburger.addEventListener(
    'click',
    () => {

        const isOpen =
            hamburger.classList.toggle(
                'active'
            );


        navLinksContainer.classList.toggle(
            'open'
        );


        hamburger.setAttribute(
            'aria-expanded',
            isOpen
        );

    }
);


navLinks.forEach(link => {

    link.addEventListener(
        'click',
        () => {

            hamburger.classList.remove(
                'active'
            );

            navLinksContainer.classList.remove(
                'open'
            );

            hamburger.setAttribute(
                'aria-expanded',
                'false'
            );

        }
    );

});


// ============================================
// 5. ANIMATED COUNTERS
// ============================================

const statNumbers =
    document.querySelectorAll(
        '.stat-number'
    );


function animateCounter(element) {

    const target =
        parseInt(
            element.getAttribute(
                'data-count'
            ),
            10
        );


    let current = 0;


    const increment =
        target / 40;


    const stepTime =
        1200 / 40;


    const timer =
        setInterval(() => {

            current += increment;


            if (
                current >= target
            ) {

                element.textContent =
                    target;

                clearInterval(timer);

            } else {

                element.textContent =
                    Math.floor(current);
            }

        }, stepTime);
}


const counterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    animateCounter(
                        entry.target
                    );


                    counterObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.5
        }
    );


statNumbers.forEach(
    element =>
        counterObserver.observe(
            element
        )
);


// ============================================
// 6. FAQ ACCORDION
// ============================================

const faqQuestions =
    document.querySelectorAll(
        '.faq-question'
    );


faqQuestions.forEach(
    question => {

        question.addEventListener(
            'click',
            () => {

                const currentItem =
                    question.closest(
                        '.faq-item'
                    );


                const isCurrentlyActive =
                    currentItem.classList.contains(
                        'active'
                    );


                document
                    .querySelectorAll(
                        '.faq-item'
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                'active'
                            );


                            const button =
                                item.querySelector(
                                    '.faq-question'
                                );


                            button.setAttribute(
                                'aria-expanded',
                                'false'
                            );
                        }
                    );


                if (
                    !isCurrentlyActive
                ) {

                    currentItem.classList.add(
                        'active'
                    );


                    question.setAttribute(
                        'aria-expanded',
                        'true'
                    );
                }

            }
        );

    }
);


// ============================================
// 7. CONSOLE
// ============================================

console.log(
    '🚀 Portfolio Inès Brakta – loaded successfully!'
);
