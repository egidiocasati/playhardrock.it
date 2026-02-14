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

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    // You can integrate with services like Formspree, EmailJS, or your own backend

    // Simulate form submission
    try {
        // For GitHub Pages, you can use a service like Formspree
        // Example: await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... })

        // For now, just simulate success
        await new Promise(resolve => setTimeout(resolve, 1000));

        showMessage('Grazie per il tuo messaggio! Ti contatteremo al più presto.', 'success');
        contactForm.reset();
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
