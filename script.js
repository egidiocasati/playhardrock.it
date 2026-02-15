// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.message) {
        showMessage('Per favore compila tutti i campi obbligatori.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Per favore inserisci un indirizzo email valido.', 'error');
        return;
    }

    try {
        const response = await fetch('https://formspree.io/f/xjgewwvo', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showMessage('Grazie per il tuo messaggio! Ti contatteremo al più presto.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showMessage('Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente.', 'error');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.member-card, .tech-card, .setlist-col').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========================================
// GLITCH EFFECT ON HERO TITLE (optional enhancement)
// ========================================

const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(196, 30, 58, 0.8),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(192, 192, 192, 0.8)
            `;
            setTimeout(() => {
                glitchText.style.textShadow = `
                    0 0 10px rgba(196, 30, 58, 0.8),
                    0 0 20px rgba(196, 30, 58, 0.6),
                    0 0 30px rgba(196, 30, 58, 0.4),
                    3px 3px 10px rgba(0, 0, 0, 0.8)
                `;
            }, 50);
        }
    }, 100);
}

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHT
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🎸 PLAY HARD 🎸', 'font-size: 20px; font-weight: bold; color: #c41e3a;');
console.log('%cWhen rock history meets the present', 'font-size: 14px; color: #c0c0c0;');
console.log('%cWebsite developed with passion for rock and metal', 'font-size: 12px; color: #666;');

// ========================================
// SOUND WAVES BACKGROUND
// ========================================

const canvas = document.getElementById('soundWaves');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;
    let waves = [];
    const numWaves = 5;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initWaves();
    }

    function initWaves() {
        waves = [];
        for (let i = 0; i < numWaves; i++) {
            waves.push({
                y: canvas.height * (0.3 + Math.random() * 0.4),
                amplitude: 20 + Math.random() * 40,
                frequency: 0.005 + Math.random() * 0.01,
                speed: 0.04 + Math.random() * 0.05,
                phase: Math.random() * Math.PI * 2,
                lineWidth: 0.5 + Math.random() * 1,
                opacity: 0.1 + Math.random() * 0.3
            });
        }
    }

    function drawWave(wave, time) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 80, 100, ${wave.opacity + 0.2})`;
        ctx.lineWidth = wave.lineWidth;

        for (let x = 0; x < canvas.width; x++) {
            const y = wave.y +
                Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                Math.sin(x * wave.frequency * 2.5 + time * wave.speed * 1.5) * (wave.amplitude * 0.3);

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        waves.forEach(wave => {
            drawWave(wave, time * 0.01);
        });

        // Add subtle vertical bars (equalizer style)
        const barCount = 60;
        const barWidth = canvas.width / barCount;

        for (let i = 0; i < barCount; i++) {
            const x = i * barWidth;
            const height = (Math.sin(time * 0.004 + i * 0.3) * 0.5 + 0.5) *
                          (50 + Math.sin(time * 0.002 + i * 0.5) * 30);
            const opacity = 0.03 + Math.sin(time * 0.003 + i * 0.2) * 0.02;

            ctx.fillStyle = `rgba(255, 80, 100, ${opacity + 0.05})`;
            ctx.fillRect(x, canvas.height / 2 - height / 2, barWidth - 2, height);
        }

        // Random lightning
        if (Math.random() > 0.995 && lightningFrames <= 0) {
            createLightning();
        }
        drawLightning();

        animationId = requestAnimationFrame(animate);
    }

    let lightningFrames = 0;
    let lightningData = null;

    function createLightning() {
        const centerX = canvas.width / 2;
        // Posizione casuale attorno al logo
        const angle = Math.random() * Math.PI * 2;
        const distance = 180 + Math.random() * 180;
        const startX = centerX + Math.cos(angle) * distance;
        const startY = Math.random() * canvas.height * 0.2;

        const points = [{ x: startX, y: startY }];
        let currentX = startX;
        let currentY = startY;

        while (currentY < canvas.height * 0.9) {
            const nextY = currentY + 20 + Math.random() * 35;
            const nextX = currentX + (Math.random() - 0.5) * 70;
            points.push({ x: nextX, y: nextY, branch: Math.random() > 0.7 });
            currentX = nextX;
            currentY = nextY;
        }

        lightningData = points;
        lightningFrames = 60; // Dura 60 frame
    }

    function drawLightning() {
        if (!lightningData || lightningFrames <= 0) return;

        const alpha = lightningFrames / 60;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.shadowBlur = 30;

        ctx.moveTo(lightningData[0].x, lightningData[0].y);

        for (let i = 1; i < lightningData.length; i++) {
            const p = lightningData[i];
            ctx.lineTo(p.x, p.y);

            if (p.branch) {
                const branchX = p.x + (Math.random() - 0.5) * 50;
                const branchY = p.y + 25 + Math.random() * 20;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(branchX, branchY);
                ctx.moveTo(p.x, p.y);
            }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
        lightningFrames--;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate(0);

    // Stop animation when not in view
    const heroSection = document.getElementById('home');
    const waveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animate(0);
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
    }, { threshold: 0.1 });

    waveObserver.observe(heroSection);
}
