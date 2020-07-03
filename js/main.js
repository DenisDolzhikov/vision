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
/*
    scrollTopOpacity({
        elem: document.querySelector('.header .description'),
        speed: 0.4,
    });

    scrollBottomOpacity({
        elem: document.querySelector('.main'),
        speed: 0.3,
    }); */



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




    function scrollOpacity() {
        let scrollItemsList = document.querySelectorAll('.scroll-opacity');

        for (let item of scrollItemsList) {

            let itemParent = item.offsetParent;
            let speed = item.dataset.opacitySpeed;
            let direction = item.dataset.opacityDirection;

            window.addEventListener('scroll', () => {
                let scrollTop = item.getBoundingClientRect().top;

                console.log(scrollTop);

                if (direction == 'top') {
                    

                } else if (direction == 'bottom') {
                    let opacity = scrollTop * (-speed / 100);
                    item.style.opacity = opacity;

                    //console.log(opacity);
                }
            });
        }
    }

    scrollOpacity();



    function scrollTopOpacity({
        elem,
        speed = 0.1,
    }) {
        let elemParent = elem.offsetParent;

        window.addEventListener('scroll', () => {
            let scrollTop = elemParent.getBoundingClientRect().top;
            let opacity = scrollTop * (-speed / 100);
            
            console.log(opacity);

            elem.style.opacity =  1 + opacity;
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