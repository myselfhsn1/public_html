// Combined Header/Footer - Ultra-optimized for mobile
(function(){
'use strict';
function getBasePath(){const p=window.location.pathname;const d=p.split('/').filter(Boolean).length;return d>1?'../'.repeat(d-1):'./';}
const bp=getBasePath();

// Use requestIdleCallback for non-critical renders
function whenIdle(cb){
    if('requestIdleCallback' in window){
        requestIdleCallback(cb,{timeout:1000});
    }else{
        setTimeout(cb,50);
    }
}

document.addEventListener('DOMContentLoaded',function(){
    // Header (immediate - above fold)
    let headerEl=document.querySelector('header');
    if(!headerEl||!headerEl.querySelector('.nav-container')){
        if(!headerEl){
            headerEl=document.createElement('header');
            document.body.insertBefore(headerEl,document.body.firstChild);
        }
        headerEl.innerHTML=`<div class="container nav-container"><a href="${bp}" class="logo"><i class="fas fa-mosque"></i><div class="logo-text">Islam<span>Hub</span></div></a><div class="mobile-menu-btn"><i class="fas fa-bars"></i></div><nav><ul><li><a href="${bp}">Home</a></li><li><a href="${bp}courses">Courses</a></li><li><a href="${bp}#testimonials">Testimonials</a></li><li><a href="${bp}#contact">Contact</a></li></ul></nav></div>`;
    }
    
    // Dispatch custom event to notify header is ready
    setTimeout(function(){
        document.dispatchEvent(new CustomEvent('headerReady'));
    },0);
    
    // Footer (deferred - below fold)
    whenIdle(function(){
        let footerEl=document.querySelector('footer');
        if(!footerEl||!footerEl.querySelector('.footer-content')){
            if(!footerEl){
                footerEl=document.createElement('footer');
                document.body.appendChild(footerEl);
            }
            footerEl.innerHTML=`<div class="container"><div class="footer-content"><div class="footer-about"><div class="footer-logo"><i class="fas fa-mosque"></i><div class="logo-text">Islam<span>Hub</span></div></div><p>Empowering Muslims worldwide with quality Islamic education through flexible, personalized online learning.</p><div class="social-media"><a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a><a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a><a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a><a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a></div></div><div class="footer-section"><h3>Quick Links</h3><ul class="footer-links"><li><a href="${bp}">Home</a></li><li><a href="${bp}courses">Courses</a></li><li><a href="${bp}#testimonials">Testimonials</a></li><li><a href="${bp}#contact">Contact</a></li></ul></div><div class="footer-section"><h3>Courses</h3><ul class="footer-links"><li><a href="${bp}quran-reading">Quran Reading</a></li><li><a href="${bp}quran-memorization">Quran Memorization</a></li><li><a href="${bp}tafseer">Tafseer Classes</a></li><li><a href="${bp}arabic">Arabic Language</a></li><li><a href="#">Islamic Studies</a></li></ul></div><div class="footer-section"><h3>Contact Info</h3><div class="footer-contact"><p><i class="fas fa-phone"></i> +92 318 360 7077</p><p><i class="fas fa-envelope"></i> islamhubemails@gmail.com</p><p><i class="fas fa-globe"></i> www.islamhub.org</p></div></div></div><div class="footer-bottom"><p>&copy; 2025 IslamHub.org. All rights reserved.</p></div></div>`;
        }
    });
    
    // WhatsApp button (deferred)
    whenIdle(function(){
        if(!document.querySelector('.whatsapp-button')){
            const wa=document.createElement('a');
            wa.href='https://wa.me/923183607077';
            wa.className='whatsapp-button';
            wa.target='_blank';
            wa.rel='noopener noreferrer';
            wa.setAttribute('aria-label','WhatsApp Contact');
            wa.innerHTML='<i class="fab fa-whatsapp"></i>';
            document.body.appendChild(wa);
        }
    });
    
    // Smooth scroll for hash links (deferred)
    whenIdle(function(){
        document.addEventListener('click',function(e){
            const link=e.target.closest('a[href^="#"]');
            if(link&&link.hash){
                const target=document.querySelector(link.hash);
                if(target){
                    e.preventDefault();
                    target.scrollIntoView({behavior:'smooth',block:'start'});
                }
            }
        });
    });
});
})();
