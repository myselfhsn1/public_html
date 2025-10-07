// Header and Footer Components - Optimized without dark mode
function getBasePath() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(Boolean).length;
    return depth > 1 ? '../'.repeat(depth - 1) : './';
}

// Header and Footer Components
document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    
    // Header HTML - No theme toggle
    const headerHTML = `
    <header>
        <div class="container nav-container">
            <a href="${basePath}" class="logo">
                <i class="fas fa-mosque"></i>
                <div class="logo-text">Islam<span>Hub</span></div>
            </a>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
            <nav>
                <ul>
                    <li><a href="${basePath}">Home</a></li>
                    <li><a href="${basePath}courses">Courses</a></li>
                    <li><a href="${basePath}#testimonials" class="testimonials-link">Testimonials</a></li>
                    <li><a href="${basePath}#contact" class="contact-link">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `;

    // Footer HTML
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-about">
                    <div class="footer-logo">
                        <i class="fas fa-mosque"></i>
                        <div class="logo-text">Islam<span>Hub</span></div>
                    </div>
                    <p>Empowering Muslims worldwide with quality Islamic education through flexible, personalized online learning.</p>
                    <div class="social-media">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="${basePath}">Home</a></li>
                        <li><a href="${basePath}courses">Courses</a></li>
                        <li><a href="${basePath}#testimonials" class="testimonials-link">Testimonials</a></li>
                        <li><a href="${basePath}#contact" class="contact-link">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Courses</h3>
                    <ul class="footer-links">
                        <li><a href="${basePath}quran-reading">Quran Reading</a></li>
                        <li><a href="${basePath}quran-memorization">Quran Memorization</a></li>
                        <li><a href="${basePath}tafseer">Tafseer Classes</a></li>
                        <li><a href="${basePath}arabic">Arabic Language</a></li>
                        <li><a href="#">Islamic Studies</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <div class="footer-contact">
                        <p><i class="fas fa-phone"></i> +92 318 360 7077</p>
                        <p><i class="fas fa-envelope"></i> islamhubemails@gmail.com</p>
                        <p><i class="fas fa-globe"></i> www.islamhub.org</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 IslamHub.org. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;

    // Insert header - check if already exists
    let headerElement = document.querySelector('header');
    if (!headerElement || !headerElement.querySelector('.nav-container')) {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHTML;
        } else if (!headerElement) {
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    // Insert footer - check if already exists
    let footerElement = document.querySelector('footer');
    if (!footerElement || !footerElement.querySelector('.footer-content')) {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHTML;
        } else if (!footerElement) {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }

    // Add WhatsApp floating button if it doesn't exist
    if (!document.querySelector('.whatsapp-button')) {
        const whatsappButton = document.createElement('a');
        whatsappButton.className = 'whatsapp-button';
        whatsappButton.href = 'https://wa.me/923183607077';
        whatsappButton.setAttribute('aria-label', 'Contact us on WhatsApp');
        whatsappButton.setAttribute('target', '_blank');
        whatsappButton.setAttribute('rel', 'noopener noreferrer');
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsappButton);
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize navbar scroll behavior
    initNavbarScroll();
});

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.querySelector('body');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Add overlay for mobile menu if it doesn't exist
        if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);

            overlay.addEventListener('click', () => {
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active')) {
                if (!nav.contains(e.target) && !mobileBtn.contains(e.target)) {
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            }
        });
    }
}

// Add navbar scroll behavior
function initNavbarScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    if (header) {
        header.style.transition = 'transform 0.3s ease-in-out';
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
    
    // Handle navigation to sections on other pages
    const sectionLinks = document.querySelectorAll('.testimonials-link, .contact-link');
    
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');
            
            if (hashIndex > -1) {
                const hash = href.substring(hashIndex + 1);
                const path = href.substring(0, hashIndex);
                const currentPath = window.location.pathname;
                
                // If we're on the home page or the link is to current page
                if (currentPath === '/' || currentPath.endsWith('index') || currentPath.includes(path)) {
                    e.preventDefault();
                    const section = document.getElementById(hash);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
}
