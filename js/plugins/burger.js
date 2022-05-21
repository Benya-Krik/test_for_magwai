$.burger = function() {

    const $burger = document.getElementById('menu')
    const animationSpeed = 200

    const burger = {
        open() {
            const burgerMenu = document.querySelector('.menu');
            const icon = document.querySelector('.header__burger');
            icon.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            setTimeout(()=> burgerMenu.classList.toggle('animate'), 1);
        }
    }

    const menuLinks = [...document.querySelectorAll('.menu__item--link')];

    menuLinks.forEach(item => { 
        item.addEventListener('click', burger.open)
    });

    return burger
}