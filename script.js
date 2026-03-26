document.addEventListener('DOMContentLoaded', () => {
    // === Menú móvil premium ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        const toggleMenu = () => {
            const isActive = hamburger.classList.toggle('active');
            navMenu.classList.toggle('show');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        };

        hamburger.addEventListener('click', toggleMenu);

        // Cerrar al click en enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar menú si se redimensiona a escritorio
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // === Detección automática de página activa ===
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const currentPage = path.split('?')[0];
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // === Navbar scroll inteligente ===
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > lastScroll && current > 80) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = current;
        });
    }

    // === Parallax sutil en logo hero (solo escritorio) ===
    const heroLogo = document.querySelector('.hero-logo');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroLogo && !prefersReducedMotion && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 35;
            const y = (window.innerHeight / 2 - e.clientY) / 35;
            heroLogo.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // === Animaciones de entrada con Intersection Observer ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.intro-section, .about-content, .prezi-container').forEach(el => {
        el.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        observer.observe(el);
    });

    // === Efecto shine en botones ===
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35), var(--primary))`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '';
        });
    });

    console.log('%c✅ CyberSafeLine V2 Ultra Premium cargada correctamente', 'color:#00f5ff; font-size:14px; font-weight:700');
});
