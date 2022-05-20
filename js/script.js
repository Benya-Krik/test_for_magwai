const burger = $.burger()

const popup = $.popup() 

// SLIDER

const intro = document.querySelector('.intro')

// swipe methods for slider

intro.addEventListener('touchstart', handleTouchStart, false)
intro.addEventListener('touchmove', handleTouchMove, false)

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }
  let x2 = event.touches[0].clientX;
  let y2 = event.touches[0].clientY;

  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if (Math.abs(xDiff)> Math.abs(yDiff)) {
    if(xDiff > 0) minusSlide()
    else plusSlide()
  }
}

// drag methods for slider


intro.onmousedown = function sliderSwipe(event) {
  event.preventDefault();
  let startX = event.clientX
  document.addEventListener('mouseup', onMouseUp)

  function onMouseUp(event) {
    const stopX = event.clientX
    if(startX > stopX+50) {
      plusSlide()
    } else if (startX+50< stopX){
      minusSlide()
  }
    document.removeEventListener('mouseup', onMouseUp);
  }
}

// сам слайдер

let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n)
}

function plusSlide() {
  showSlides(slideIndex+=1)
}

function minusSlide() {
  showSlides(slideIndex-=1)
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll('.intro__item')
  let pagination = document.getElementsByClassName('intro__link')

  if (n > slides.length) {
    slideIndex = 1
  }

  if (n < 1) {
    slideIndex = slides.length
  }

  for (i = 0; i < pagination.length; i++) {
    pagination[i].className = pagination[i].className.replace(' active', '')
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add('hide')
  }
  slides[slideIndex - 1].classList.remove('hide')
  pagination[slideIndex - 1].className += ' active'
}

// Вывод карточек

async function getCards() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const cards = await response.json()
  const loadedCards = cards.splice(0, 10)

  let list = document.querySelector('.posts__wrap')
  let key;

  for (key in loadedCards) {

    list.innerHTML += `
    <div class="posts__item post">
      <div class="post__image">
      <img src="/assets/img/carditem.jpg" alt="Post image">
      </div>
      <div class="post__content">
        <p class="post__label">Water</p>
        <h3 class="post__title">${loadedCards[key].title}</h3>
        <p class="post__article">${loadedCards[key].body}</p>
        <p class="post__info">Posted by <span class="post__author">Eugenia ${loadedCards[key].id}</span>, on July  24, 2019</p>
        <a href="#" class="post__button">Continue reading</a>
      </div>
    </div>
    `
  }
}

let currentElements = 10
const loadedElements = 6

async function loadMoreCards (){

  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const cards = await response.json()
  const loadedCards = cards.splice(currentElements, loadedElements)

  let list = document.querySelector('.posts__wrap')
  let key;

  for (key in loadedCards) {
    currentElements++
    list.innerHTML += `
    <div class="posts__item post">
      <div class="post__image">
      <img src="/assets/img/carditem.jpg" alt="Post image">
      </div>
      <div class="post__content">
        <p class="post__label">Water</p>
        <h3 class="post__title">${loadedCards[key].title}</h3>
        <p class="post__article">${loadedCards[key].body}</p>
        <p class="post__info">Posted by <span class="post__author">Eugenia ${loadedCards[key].id}</span>, on July  24, 2019</p>
        <a href="#" class="post__button">Continue reading</a>
      </div>
    </div>
    `
  }
}

getCards()

// Валидация формы

const form = document.querySelector('.popup__form')
const formInputs = document.querySelectorAll('.popup__input')
const inputEmail = document.querySelector('.popup__input--email')
const inputPhone = document.querySelector('.popup__input--phone')


function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function validatePhone(phone) {
  const re = /^[0-9\s]*$/;
  return re.test(String(phone));
}


form.onsubmit = function () {
  
  let emailValue = inputEmail.value
  let phoneValue = inputPhone.value
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '')

  formInputs.forEach( function (input){
    if(input.value === '') {
      input.classList.add('error')
    } else {
      input.classList.remove('error')
    }
  })

  if(emptyInputs.length !== 0) {
    alert('Все поля обязательны к заполнению')
    return false;
  }

  if(!validateEmail(emailValue)) {
    alert('Введите корректный email');
    inputEmail.classList.add('error');
    return false;
  } else {
    inputEmail.classList.remove('error');
  }

  if (!validatePhone(phoneValue)) {
    alert('Введите корректный номер телефона');
    inputPhone.classList.add('error');
    return false;
  } else {
    inputPhone.classList.remove('error');
  }
  alert('Форма отправлена')
}