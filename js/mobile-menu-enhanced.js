// Enhanced Mobile Menu Functionality
(function() {
    'use strict';
    
    function initMobileMenu() {
        // Find the mobile menu button and navigation
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('nav ul li a');
        const body = document.body;
        
        // Early exit if critical elements are not found
        if (!mobileMenuBtn || !nav || !body) {
            console.log('Mobile menu elements not found, skipping initialization');
            return;
        }
        
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            body.appendChild(overlay);
        }
        
        // Toggle mobile menu
        function toggleMobileMenu() {
            if (!nav) return;
            
            const isMenuOpen = nav.classList.contains('active');
            
            if (isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        // Open mobile menu
        function openMobileMenu() {
            if (nav) nav.classList.add('active');
            if (body) body.classList.add('menu-open');
            if (overlay) overlay.style.display = 'block';
            if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            // Prevent scrolling when menu is open
            if (body) body.style.overflow = 'hidden';
            
            // Add animation class for smooth entry
            if (nav) {
                setTimeout(() => {
                    nav.style.transform = 'translateX(0)';
                }, 10);
            }
        }
        
        // Close mobile menu
        function closeMobileMenu() {
            if (nav) nav.classList.remove('active');
            if (body) body.classList.remove('menu-open');
            if (overlay) overlay.style.display = 'none';
            if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Restore scrolling
            if (body) body.style.overflow = '';
            
            // Add animation for smooth exit
            if (nav) nav.style.transform = 'translateX(100%)';
        }
        
        // Event listeners
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }
        
        // Close menu when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', closeMobileMenu);
        }
        
        // Close menu when clicking navigation links
        if (navLinks && navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Small delay to allow navigation to complete
                    setTimeout(closeMobileMenu, 100);
                });
            });
        }
        
        // Close menu when pressing escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize - close menu on desktop sizes
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Ensure proper state on page load and handle initial display
        closeMobileMenu();
        
        // Make sure the mobile-menu-btn is displayed correctly on small screens
        function handleWindowSize() {
            if (!nav || !mobileMenuBtn) return;
            
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'flex';
                nav.classList.remove('active');
                nav.style.transform = 'translateX(100%)';
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.style.transform = '';
                nav.classList.remove('active');
            }
        }
        
        // Initial check and add resize listener
        handleWindowSize();
        window.addEventListener('resize', handleWindowSize);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();