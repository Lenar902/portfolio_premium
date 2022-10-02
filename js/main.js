$(document).ready(function(){

  const navIcon = document.querySelector('.nav-icon');
  const overlay = document.querySelector('.overlay');
  const nav = document.querySelector('.active-navigation');
  const navLinks = document.querySelectorAll('.active-navigation__list a');
  const body = document.querySelector('body');

  const input = document.querySelector('.input');
  const textarea = document.querySelector('#msg');
  const input_email = document.querySelector('#input_email');
  const input_msg = document.querySelector('#input_msg');


  navIcon.addEventListener('click', function() {
      this.classList.toggle('nav-icon--active');
      overlay.classList.toggle('overlay--active');
      nav.classList.toggle('active-navigation--active');
      body.classList.toggle('lock');
    });

  navLinks.forEach(function(item) {
      item.addEventListener('click', function() {
        navIcon.classList.remove('nav-icon--active');
        overlay.classList.remove('overlay--active');
        nav.classList.remove('active-navigation--active');
        body.classList.remove('lock');
      })
  });


  //добавляем/удалем класс при фокусе/за фокусом  
  input.addEventListener('focus', function() { 
    input_email.classList.add('form__item--active');
  });

  input.addEventListener('focusout', function() { 
    if (input.value == '') {
      input_email.classList.remove('form__item--active');
    }
  });

  textarea.addEventListener('focus', function() { 
    input_msg.classList.add('form__item--active');
  });

  textarea.addEventListener('focusout', function() { 
    if (textarea.value == '') {
      input_msg.classList.remove('form__item--active');
    }
  });

  // закрываем мобильное меню и оверлей при ресайзе
  window.onresize = function() {
      navIcon.classList.remove('nav-icon--active');
      overlay.classList.remove('overlay--active');
      nav.classList.remove('active-navigation--active');
      body.classList.remove('lock');
  }

   
  // plagin pageNav
  $('#header-menu').onePageNav({
      currentClass: 'active',
      changeHash: false,
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      filter: '',
      easing: 'swing',
  });



  /*======================FORM VALIDATE========================*/
  $('.form').validate({
    rules: {
      email: {
        required: true,
        email: true
      },

      message: {
        required: true
      }
    },

    messages: {
      email: {
        required: 'Введите email',
        email: 'отсутвует символ @'
      },

      message: {
        required: 'Поле не должно быть пустым'
      }
    },

    submitHandler: function(form) {
      ajaxFormSubmit();
    }
  });

  //Функция  Ajax
  function ajaxFormSubmit() {
    let str = $('.form').serialize();

    $.ajax({
      type: "POST",
      url: "./php/mail.php",
      data: str,

      success: function(html) {
        $('.form').slideUp(800);
        $('#answer').html(html);
      }
    });

    return false;
  }


})

