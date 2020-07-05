'use strict';


// Header parallax effects
{   
    parallaxHeaderSquare({
        elem: document.querySelector('.svg-square-1'),
        speed: 0.2,
    });

    parallaxHeaderItems({
        elem: document.querySelector('.header .header-title'),
        speed: 0.1,
    });

    parallaxHeaderItems({
        elem: document.querySelector('.header .icon-down'),
        speed: 0.4,
    });


    function parallaxHeaderSquare({
        elem,
        speed = 0.1,
        direction = 'top',
    }) {
        let elemHeight = elem.offsetHeight;
        let elemParent = elem.offsetParent;
        
        window.addEventListener('scroll', () => {
            let scrollTop = elemParent.getBoundingClientRect().top;
            //console.log(scrollTop);
            
            elem.style.transform = `translate(-50%,-${(elemHeight/2) + (scrollTop * -speed)}px)`;
        })
    }



    function parallaxHeaderItems({
        elem,
        speed = 0.1,
    }) {
        let elemParent = elem.offsetParent;

        window.addEventListener('scroll', () => {
            let scrollTop = elemParent.getBoundingClientRect().top;
            //console.log(scrollTop);
            
            elem.style.transform = `translateY(${scrollTop * -speed}px)`;
        })
    }

}




// Scroll opacity
{
    
    scrollTopOpacity({
        elem: document.querySelector('.header .description'),
        speed: 0.3,
    });

    scrollTopOpacity({
        elem: document.querySelector('.header .header-title'),
        speed: 0.2,
    });

    scrollTopOpacity({
        elem: document.querySelector('.header .icon-down'),
        speed: 0.1,
    });
    
/*
    scrollBottomOpacity({
        elem: document.querySelector('.main'),
        speed: 0.3,
    });  */

    scrollOpacity();
    
    function scrollOpacity() {
        const items = [...document.querySelectorAll('.scroll-opacity')];

        let options = {
            rootMargin: '0px',
            threshold: 0.20
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                const { target } = entry;
                console.log(entry, target)
                
                if (entry.intersectionRatio >= 0.20) {
                    target.classList.add("is-visible");
                } else {
                    target.classList.remove("is-visible");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        items.forEach((item, index) => {
            observer.observe(item);
        });
    }
    



    function scrollTopOpacity({
        elem,
        speed = 0.01,
    }) {
        let elemParent = elem.offsetParent;

        window.addEventListener('scroll', () => {
            let scrollTop = elemParent.getBoundingClientRect().top;
            let opacity = scrollTop * (-speed / 100);
            
            console.log(opacity);

            elem.style.opacity =  1 - opacity;
        })
    }




    function scrollBottomOpacity({
        elem,
        speed = 0.1,
    }) {
        let elemParent = elem.offsetParent;
        elem.style.opacity = 0;

        window.addEventListener('scroll', () => {
            let scrollTop = elemParent.getBoundingClientRect().top;
            let opacity = scrollTop * (-speed / 100);
            
            //console.log(opacity);

            elem.style.opacity = opacity;
        });
    }
}



// Sticky nav
{
    showStickyNav();

    function showStickyNav() {
        let stickyNav = document.querySelector('.sticky-nav');
        let headerHeight = document.querySelector('.header').offsetHeight;

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset;

            if (scrollTop >= headerHeight) {
                stickyNav.classList.add('scroll');
            } else {
                stickyNav.classList.remove('scroll');
            }
        });
    }

}

//Overlay nav 
{
    overlayNav();

    function overlayNav() {
        let overlay = document.querySelector('.overlay-nav');
        let overlayWrapper = document.querySelector('.overlay-nav-wrapper');
        let openButtons = document.querySelectorAll('.open-overlay-nav');
        let closeButton = document.querySelector('.close-overlay-nav');

        for (let openButton of openButtons) {
            openButton.addEventListener('click', () => {
                overlay.classList.add('open');
            });
        }

        closeButton.addEventListener('click', () => {
            overlay.classList.remove('open');
        });

    }
}


//Sliders initialization

let projectSlider = new Swiper('.projects .projects-slider', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 70,
    speed: 600,

    pagination: {
        el: '.projects .projects-slider .swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.projects .projects-slider .swiper-button-next',
        prevEl: '.projects .projects-slider .swiper-button-prev',
    },

    debugger: true,


});