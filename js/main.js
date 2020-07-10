'use strict';

// Check page

function pageIs(page) {
    if (window.location.toString().indexOf(page) > 0) {
        return true;
    }

    return false;
}

// Preloader

{
    window.onload = () => {
        document.body.classList.add('loaded');
    };
}


// Header parallax effects
{   
    if (pageIs('index.html')) {

            parallaxHeaderSquare({
                elem: document.querySelector('.home .header .svg-square-1'),
                speed: 0.2,
            });

            parallaxHeaderItems({
                elem: document.querySelector('.home .header .header-title'),
                speed: 0.1,
            });

            parallaxHeaderItems({
                elem: document.querySelector('.home .header .icon-down'),
                speed: 0.4,
            });

            parallaxProjectsSquare({
                elem: document.querySelector('.home .projects .svg-square-2'),
                speed: 0.08,
            });
    }


    function parallaxHeaderSquare({
        elem,
        speed = 0.1,
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



    function parallaxProjectsSquare({
        elem,
        speed = 0.1,
    }) {
        let elemWidth = elem.offsetWidth;
        let elemParent = elem.offsetParent;

        window.addEventListener('scroll', makeParallax);
        window.addEventListener('DOMContentLoaded', makeParallax);

        function makeParallax() {
            let scrollTop = elemParent.getBoundingClientRect().top;
            //console.log( (elemWidth/2) + (-scrollTop / 3 * -speed ) );

            elem.style.transform = `translateX(-${(elemWidth/2) + (-scrollTop / 3 * -speed)}px)`;
        }
    }

}




// Scroll opacity
{
    if (pageIs('index.html')) {
        scrollTopOpacity({
            elem: document.querySelector('.home .header .description'),
            speed: 0.3,
        });

        scrollTopOpacity({
            elem: document.querySelector('.home .header .header-title'),
            speed: 0.2,
        });

        scrollTopOpacity({
            elem: document.querySelector('.home .header .icon-down'),
            speed: 0.1,
        });
    }

    

    scrollOpacity();
    
    function scrollOpacity() {

        if (('IntersectionObserver' in window)) {
            document.querySelectorAll('.scroll-opacity').forEach(item => {
                item.classList.add('no-opacity');
            });

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
    }
    



    function scrollTopOpacity({
        elem,
        speed = 0.01,
    }) {
        let elemParent = elem.offsetParent;

        window.addEventListener('scroll', () => {
            let scrollTop = elemParent.getBoundingClientRect().top;
            let opacity = scrollTop * (-speed / 100);
            
            //console.log(opacity);

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
        let openButtons = document.querySelectorAll('.open-overlay-nav');
        let closeButton = document.querySelector('.close-overlay-nav');

        for (let openButton of openButtons) {
            openButton.addEventListener('click', () => {
                overlay.classList.add('open');
                overlay.classList.add('fade-in');
                overlay.classList.remove('fade-out');
                document.body.style.overflowY = 'hidden';
            });
        }

        closeButton.addEventListener('click', () => {
            overlay.classList.add('fade-out');
            overlay.classList.remove('fade-in');
            setTimeout(() => overlay.classList.remove('open'), 300);
            document.body.style.overflowY = '';
        });

    }
}


//Sliders initialization

let projectSlider = new Swiper('.projects .projects-slider', {
    loop: true,
    speed: 600,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,

    pagination: {
        el: '.projects .projects-slider .swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.projects .projects-slider .swiper-button-next',
        prevEl: '.projects .projects-slider .swiper-button-prev',
    },

    debugger: true,

    breakpoints: {
        
        700: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40,
        },
        1050: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
        },
        1550: {
            spaceBetween: 70,
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
    }
});

let ourClientsSlider = new Swiper('.our-clients .our-clients-slider', {
    init: false,
    loop: true,
    speed: 600,
    slidesPerView: 1,
    slidesPerGroup: 1,

    pagination: {
        el: '.our-clients .our-clients-slider .swiper-pagination',
        clickable: true,
    },

    debugger: true,
});

function ourClientsSliderInit() {
    if (window.matchMedia("(max-width: 600px)").matches) {
        ourClientsSlider.init();
    }
}

if (pageIs('index.html')) {
    window.addEventListener('DOMContentLoaded', ourClientsSliderInit);
    window.addEventListener('resize', ourClientsSliderInit);
    window.addEventListener('orientationchange', ourClientsSliderInit);
}