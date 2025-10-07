/**
 * Islamic & Educational Hero Animations
 * Dynamically adds beautiful animations to all hero sections
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroAnimations);
    } else {
        initHeroAnimations();
    }
    
    function initHeroAnimations() {
        // Find all hero sections (including free-trial-hero)
        const heroSections = document.querySelectorAll('.hero, .courses-hero, .course-detail-hero, .course-hero, .free-trial-hero');
        
        if (heroSections.length === 0) return;
        
        // Add animations to each hero section
        heroSections.forEach(function(hero) {
            // Make sure hero is positioned relatively
            if (getComputedStyle(hero).position === 'static') {
                hero.style.position = 'relative';
            }
            
            // Create animation container
            const animationContainer = document.createElement('div');
            animationContainer.className = 'hero-animation-container';
            
            // Add Islamic geometric stars (8-point stars)
            for (let i = 0; i < 6; i++) {
                const star = createIslamicStar();
                animationContainer.appendChild(star);
            }
            
            // Add educational icons
            const eduIcons = ['📖', '✏️', '🎓', '📚', '🕌'];
            eduIcons.forEach(function(icon, index) {
                const eduIcon = document.createElement('div');
                eduIcon.className = 'edu-icon icon-' + (index + 1);
                eduIcon.textContent = icon;
                animationContainer.appendChild(eduIcon);
            });
            
            // Add Quran pages
            for (let i = 0; i < 3; i++) {
                const page = document.createElement('div');
                page.className = 'quran-page';
                animationContainer.appendChild(page);
            }
            
            // Add particles
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                animationContainer.appendChild(particle);
            }
            
            // Add sparkles
            for (let i = 0; i < 4; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                animationContainer.appendChild(sparkle);
            }
            
            // Add gradient orbs
            for (let i = 0; i < 3; i++) {
                const orb = document.createElement('div');
                orb.className = 'gradient-orb orb-' + (i + 1);
                animationContainer.appendChild(orb);
            }
            
            // Add calligraphy glow
            const glow = document.createElement('div');
            glow.className = 'calligraphy-glow';
            animationContainer.appendChild(glow);
            
            // Add mosque icon (only if Font Awesome is loaded)
            if (typeof FontAwesome !== 'undefined' || document.querySelector('link[href*="font-awesome"]')) {
                const mosqueIcon = document.createElement('i');
                mosqueIcon.className = 'fas fa-mosque mosque-icon';
                animationContainer.appendChild(mosqueIcon);
            }
            
            // Add overlay for better text readability
            const overlay = document.createElement('div');
            overlay.className = 'hero-animation-overlay';
            
            // Insert at the beginning of hero section
            hero.insertBefore(overlay, hero.firstChild);
            hero.insertBefore(animationContainer, hero.firstChild);
        });
    }
    
    /**
     * Create an Islamic 8-point star SVG
     */
    function createIslamicStar() {
        const div = document.createElement('div');
        div.className = 'islamic-star';
        
        // Create SVG 8-point star
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // 8-point star path
        star.setAttribute('d', 'M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z');
        star.setAttribute('fill', '#3498db');
        
        svg.appendChild(star);
        div.appendChild(svg);
        
        return div;
    }
    
    /**
     * Optimize animations based on device performance
     */
    function optimizeForPerformance() {
        // Reduce motion if user prefers
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                .hero-animation-container,
                .hero-animation-container * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            const containers = document.querySelectorAll('.hero-animation-container');
            containers.forEach(function(container) {
                // Remove some elements for better performance
                const orbs = container.querySelectorAll('.gradient-orb');
                orbs.forEach(function(orb) {
                    orb.remove();
                });
            });
        }
    }
    
    // Call optimization
    setTimeout(optimizeForPerformance, 100);
    
})();
