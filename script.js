// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Hamburger menu toggle
        hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active', this.isMenuOpen);
        hamburger.classList.toggle('active', this.isMenuOpen);
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (this.isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }

    closeMenu() {
        if (this.isMenuOpen) {
            this.toggleMenu();
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Add/remove navbar background on scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        this.updateActiveLink();
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Enhanced Particles.js Configuration
class ParticlesManager {
    constructor() {
        this.init();
    }

    init() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 100,
                        density: {
                            enable: true,
                            value_area: 1000
                        }
                    },
                    color: {
                        value: ['#ffffff', '#FFD700', '#C0C0C0']
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 4,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 300,
                            size: 6,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
}

// Enhanced Scroll Animations
class ScrollAnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                this.observerOptions
            );
            this.observeElements();
        } else {
            // Fallback for browsers without IntersectionObserver
            this.fallbackAnimation();
        }
    }

    observeElements() {
        // Enhanced element selection with staggered animations
        const elementsToAnimate = {
            'fade-in': document.querySelectorAll('.section-header, .about-text, .contact-item'),
            'slide-in-left': document.querySelectorAll('.timeline-item:nth-child(odd)'),
            'slide-in-right': document.querySelectorAll('.timeline-item:nth-child(even)'),
            'scale-in': document.querySelectorAll('.skill-card, .project-card, .achievement-card, .stat-card')
        };

        Object.entries(elementsToAnimate).forEach(([animationType, elements]) => {
            elements.forEach((element, index) => {
                element.classList.add(animationType);
                element.style.animationDelay = `${index * 0.1}s`;
                this.observer.observe(element);
            });
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with a slight delay for better effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                this.observer.unobserve(entry.target);
            }
        });
    }

    fallbackAnimation() {
        // Simple fallback - just add visible class to all elements
        const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        elementsToAnimate.forEach(element => {
            element.classList.add('visible');
        });
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let speed = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            speed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            speed = 500; // Pause before next text
        }

        setTimeout(() => this.type(), speed);
    }
}

// Form Management
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual form handling)
            await this.simulateFormSubmission();
            
            // Show success message
            this.showMessage('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            // Show error message
            this.showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure (80% success rate)
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Style the message
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #48bb78;' : 'background: #f56565;'}
        `;

        document.body.appendChild(messageEl);

        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 5000);
    }
}

// Performance Monitoring
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
        
        // Monitor performance
        this.monitorPerformance();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    preloadResources() {
        // Preload critical CSS and fonts
        const resources = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];

        resources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                // Log performance metrics (you can send this to analytics)
                console.log(`Page load time: ${loadTime}ms`);
                
                // Show performance warning if load time is too high
                if (loadTime > 3000) {
                    console.warn('Page load time is high. Consider optimizing resources.');
                }
            });
        }
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isMobile() {
        return window.innerWidth <= 768;
    }

    static isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    static isDesktop() {
        return window.innerWidth > 1024;
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize core components
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.scrollAnimationManager = new ScrollAnimationManager();
            this.formManager = new FormManager();
            this.performanceManager = new PerformanceManager();

            // Initialize particles background
            this.particlesManager = new ParticlesManager();

            // Initialize typing animation for hero tagline
            const taglineElement = document.querySelector('.hero-tagline');
            if (taglineElement) {
                const taglines = [
                    'Electronics & Communication Engineer',
                    'Data Analytics Specialist',
                    'Embedded Systems Developer',
                    'FPGA/Verilog Expert',
                    'IoT Solutions Architect',
                    'Optical Communication Engineer'
                ];
                
                // Store original text and start typing animation after delay
                const originalText = taglineElement.textContent;
                setTimeout(() => {
                    new TypingAnimation(taglineElement, taglines, 80);
                }, 2000);
            }

            // Add resize listener for responsive adjustments
            window.addEventListener('resize', Utils.debounce(() => {
                this.handleResize();
            }, 250));

            // Add additional interactive effects
            this.addInteractiveEffects();

            console.log('Portfolio app initialized successfully!');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    handleResize() {
        // Handle responsive changes
        if (Utils.isMobile() && this.navigationManager.isMenuOpen) {
            this.navigationManager.closeMenu();
        }

        // Reinitialize particles on resize
        if (typeof pJSDom !== 'undefined' && pJSDom[0]) {
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    addInteractiveEffects() {
        // Add hover effects to cards
        this.addCardHoverEffects();
        
        // Add parallax scrolling to hero section
        this.addParallaxEffect();
        
        // Add smooth reveal animations
        this.addRevealAnimations();
    }

    addCardHoverEffects() {
        const cards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                e.currentTarget.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.transform = '';
            });

            // Add subtle rotation on hover for project cards
            if (card.classList.contains('project-card')) {
                card.addEventListener('mouseenter', (e) => {
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.05) rotate(1deg)';
                });
            }
        });
    }

    addParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero || Utils.isMobile()) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 10));
    }

    addRevealAnimations() {
        // Add staggered animations to grid items
        const gridContainers = document.querySelectorAll('.skills-grid, .projects-grid, .achievements-grid');
        
        gridContainers.forEach(container => {
            const items = container.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('fade-in');
            });
        });
    }
}

// Start the application
const app = new App();

// Export for potential external use
window.PortfolioApp = app;
