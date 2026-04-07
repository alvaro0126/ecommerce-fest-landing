document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Particles
    const particlesContainer = document.getElementById('particles');
    Array.from({ length: 30 }, (_, i) => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;
        particlesContainer.appendChild(particle);
        return particle;
    });

    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString('es-CO');
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Agenda tabs
    document.querySelectorAll('.agenda-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.agenda-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.agenda-day').forEach(d => d.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`.agenda-day[data-day="${tab.dataset.day}"]`).classList.add('active');
        });
    });

    // Fade-in on scroll
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-card, .speaker-card, .pricing-card, .agenda-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        fadeObserver.observe(el);
    });
});