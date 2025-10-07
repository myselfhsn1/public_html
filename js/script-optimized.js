// Optimized combined JavaScript - Mobile Performance
(function(){
'use strict';

// Defer non-critical initialization
function initializeWhenIdle(callback){
    if('requestIdleCallback' in window){
        requestIdleCallback(callback,{timeout:2000});
    }else{
        setTimeout(callback,100);
    }
}

// Critical: Mobile menu (immediate)
document.addEventListener('DOMContentLoaded',function(){
    const mobileBtn=document.querySelector('.mobile-menu-btn');
    const nav=document.querySelector('nav');
    const body=document.body;
    
    if(mobileBtn){
        const overlay=document.createElement('div');
        overlay.className='mobile-menu-overlay';
        body.appendChild(overlay);
        
        mobileBtn.addEventListener('click',function(e){
            e.stopPropagation();
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        },false);
        
        overlay.addEventListener('click',()=>{
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        },false);
        
        document.addEventListener('click',function(e){
            if(nav.classList.contains('active')&&!nav.contains(e.target)&&!mobileBtn.contains(e.target)){
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        },false);
    }
    
    // Smooth scroll (deferred)
    initializeWhenIdle(function(){
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
            anchor.addEventListener('click',function(e){
                e.preventDefault();
                const target=document.querySelector(this.getAttribute('href'));
                if(target){
                    target.scrollIntoView({behavior:'smooth',block:'start'});
                    if(nav&&nav.classList.contains('active')){
                        nav.classList.remove('active');
                        body.classList.remove('menu-open');
                    }
                }
            });
        });
    });
    
    // Form validation (deferred)
    initializeWhenIdle(function(){
        const forms=document.querySelectorAll('form');
        forms.forEach(function(form){
            form.addEventListener('submit',function(e){
                const inputs=form.querySelectorAll('input[required],select[required],textarea[required]');
                let isValid=true;
                
                inputs.forEach(function(input){
                    input.classList.remove('error');
                    const errorMsg=input.parentElement.querySelector('.error-message');
                    if(errorMsg)errorMsg.remove();
                    
                    if(!input.value.trim()){
                        isValid=false;
                        input.classList.add('error');
                        const msg=document.createElement('div');
                        msg.className='error-message';
                        msg.textContent='This field is required';
                        input.parentElement.appendChild(msg);
                    }
                    
                    if(input.type==='email'&&input.value.trim()){
                        const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if(!emailPattern.test(input.value)){
                            isValid=false;
                            input.classList.add('error');
                            const msg=document.createElement('div');
                            msg.className='error-message';
                            msg.textContent='Please enter a valid email';
                            input.parentElement.appendChild(msg);
                        }
                    }
                });
                
                if(!isValid){
                    e.preventDefault();
                    const firstError=form.querySelector('.error');
                    if(firstError){
                        firstError.scrollIntoView({behavior:'smooth',block:'center'});
                        firstError.focus();
                    }
                }
            });
        });
    });
    
    // Scroll animations (deferred, low priority)
    initializeWhenIdle(function(){
        const observerOptions={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
        const observer=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        },observerOptions);
        
        document.querySelectorAll('.course-card,.feature-card,.testimonial-card').forEach(function(el){
            observer.observe(el);
        });
    });
});

})();
