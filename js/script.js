$(window).on('load', function () {
  'use strict';

  $('.contact-form').parsley();

  //CHECK FOR CLICK EVENTS ON THE NAVBAR BURGER ICON.
  $('.navbar-burger').on('click', function () {
    //TOGGLE THE 'IS-ACTIVE' CLASS ON BOTH THE NAVBAR-BURGE AND THE NAVBAR-MENU.
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });

  //CHECK FOR CLICK EVENTS ON NAVBAR-ITEM LINKS
  $('.scrolled-link').on('click', function () {
    $('html, body').animate(
      {
        //SCROLL TO SELCTED SECTION.
        scrollTop: $('#' + $(this).data('scroll')).offset().top - 70,
      },
      600
    );
  });

  //WHEN SCROLLING WEBSITE
  $(window).on('scroll', function () {
    //SWITCH NAVBAR FIXED AND TRANSPARENT
    if ($(window).scrollTop() >= $('.navbar').innerHeight()) {
      $('.navbar').addClass('is-fixed-top').removeClass('is-transparent');
    } else {
      $('.navbar').addClass('is-transparent').removeClass('is-fixed-top');
    }
  });

  //FORM SUBMIT
  $('.contact-form').on('submit', function (e) {
    e.preventDefault();

    if ($(this).parsley().isValid()) {
      $.ajax({
        type: $(this).attr('method'),
        url: './php/request.php',
        data: $(this).serialize(),
      })
        .done(function (response) {
          $('.form-msg').html(response);
          if ($('.notification').hasClass('is-success')) {
            $('.input, .textarea').val('');
            $('.form-msg').fadeOut(7000, function () {
              $(this).remove();
            });
          }
        })
        .fail(function (data) {
          if (data.responseText !== '') {
            $('.form-msg').html(data.responseText);
          } else {
            $('.form-msg').text(
              'Oops! An error occured and your message could not be sent.'
            );
          }
        });
    }
  });
});
