console.log('hola');

const $ = (element) => document.querySelector(element)

const burger = $('.home__header__burger_menu')
const menu = $('#menu')
const body = $('body')

console.log(menu.classList);

$('#burger').addEventListener('click', () => {
    burger.classList.toggle('menu-open')
    if (burger.classList.contains('menu-open')) {
        menu.classList.replace('fa-bars', 'fa-x');
        body.style.overflow = "hidden"
      } else {
        menu.classList.replace('fa-x', 'fa-bars');
        body.style.overflow = "visible"
      }
})

