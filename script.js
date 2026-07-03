// ============== NAVBAR SCROLL EFFECT ==============
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============== MOBILE MENU TOGGLE ==============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const body = document.body;

const closeMenu = () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    body.style.overflow = '';
};

const openMenu = () => {
    navToggle.classList.add('active');
    navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    body.style.overflow = 'hidden';
};

navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// ============== FAQ ACCORDION ==============
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(other => other.classList.remove('open'));

        // Open current if it wasn't open
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// ============== SCROLL REVEAL ANIMATIONS ==============
const revealAllElements = () => {
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
    });
};

const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal class to elements that should animate in
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = [
        '.feature-card',
        '.step-card',
        '.usecase-card',
        '.pricing-card',
        '.testimonial-card',
        '.faq-item',
        '.highlight-feature',
        '.section-header',
        '.stats-container'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 50}ms`;
            observer.observe(el);
        });
    });

    // Safety fallback: reveal all elements after 3 seconds
    setTimeout(revealAllElements, 3000);
});

window.addEventListener('load', () => {
    setTimeout(revealAllElements, 100);
});

// ============== SMOOTH SCROLL FOR ANCHOR LINKS ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============== PHONE MOCKUP PARALLAX ==============
const phoneMockup = document.querySelector('.phone-mockup');

if (phoneMockup) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 1024) return;

        const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 60;

        phoneMockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        phoneMockup.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}

// ============== COUNTER ANIMATION ==============
const animateCounter = (element, target, duration = 1500) => {
    const isPercentage = target.includes('%');
    const numericTarget = parseInt(target);
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(start + (numericTarget - start) * eased);

        element.textContent = current + (isPercentage ? '%' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
};

// Observe stats section to trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNums = entry.target.querySelectorAll('.stat-num');
            statNums.forEach(stat => {
                const text = stat.textContent;
                // Animate only if it's a number (skip "Free" text)
                if (/\d/.test(text) && !text.includes('hr')) {
                    animateCounter(stat, text);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-container');
if (statsBar) statsObserver.observe(statsBar);

// ============== ACTIVE NAV LINK HIGHLIGHT ==============
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navAnchors.forEach(a => {
                if (a.getAttribute('href') === '#' + id) {
                    a.classList.add('active-nav');
                } else {
                    a.classList.remove('active-nav');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => navObserver.observe(section));

// ============== TILT EFFECT ON PRICING CARDS ==============
document.querySelectorAll('.pricing-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

console.log('%cChalkly - Tutor\'s Assistant', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 10px 20px; border-radius: 8px;');
console.log('%cLoved by tutors across India.', 'font-size: 14px; color: #6366F1;');