$(document).ready(function () {

    var w_width = $(window).width();
    var w_height = $(window).height();

    //маска для телефона
    $('input[name="user_phone"]').mask('+9 (999) 999-99-99');

    //слайдеры простые с изображениями
    $('.slick').slick({
        infinite: true,
        autoplay: true,
        fade: true,
        prevArrow: '<button id="prev" type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: '<button id="next" type="button" class="slick-arrow slick-next"></button>'
    });
    $('.works-slider .slick-arrow').appendTo('.works-slider-nav-arrows');

    $('.works-slider .left').each(function () {
        $(this).slick({
            infinite: true,
            autoplay: true,
            fade: true,
            prevArrow: '<button id="prev" type="button" class="slick-arrow slick-prev"></button>',
            nextArrow: '<button id="next" type="button" class="slick-arrow slick-next"></button>'
        });
        var this_nav = $(this).parent().parent().parent().find('.works-slider-nav-arrows');
        $(this).find('.slick-prev').appendTo(this_nav);
        $(this).find('.slick-next').appendTo(this_nav);
    });

    //слайдер фото в личном кабинете
    $('.pers-slider').each(function () {
        $(this).slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500,
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: '<button id="prev" type="button" class="slick-arrow slick-prev"></button>',
            nextArrow: '<button id="next" type="button" class="slick-arrow slick-next"></button>',
            responsive: [
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true
                    }
                }
            ]
        });
        var this_nav = $(this).next();
        $(this).find('.slick-arrow').appendTo(this_nav);
    });

    //страница FAQ
    $('.faq-item').click(function () {
        if ($(this).hasClass('open')) {
            $('.faq-item.open .faq-item-info').slideUp();
            $(this).removeClass('open');
        } else {
            $('.faq-item.open .faq-item-info').slideUp();
            $('.faq-item.open').removeClass('open');
            $(this).find('.faq-item-info').slideToggle();
            $(this).toggleClass('open');
        }
    });


    //модальные окна
    $('.magnific').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        removalDelay: 250
    });

    //фиксирование меню при скролле
    // $(function () {
    //     var header_height = $('.header-nav').outerHeight();
    //     var header_mrg = -1 * $('.header-nav').offset().top;
    //     var elem = $('.header-nav');
    //     var screen_height = $('.header').outerHeight();
    //     var top = $(this).scrollTop();
    //     if (top > header_height) {
    //         elem.css('top', header_mrg);
    //     }
    //     $(window).scroll(function () {
    //         top = $(this).scrollTop();
    //         if (top + header_height > screen_height) {
    //             elem.addClass('fixed');
    //         } else {
    //             elem.removeClass('fixed');
    //         }
    //     });
    // });


    //плавная прокрутка якорных ссылок
    $(document).on('click', '.down', function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({scrollTop: target.offset().top - 20}, 1000);
                event.preventDefault();
            }
        }
    });

    //отправка заявки
    $(document).on("submit", '.form', function () {
        var form = $(this);
        console.log('yes');
        $.post('/post.php', form.serializeArray(), function (data) {
            if (data) {
                form.trigger('reset');
                $('.form-block').hide();
                $('.order-result').fadeIn();
            }
        });
        return false;
    });


    //анимации
    var wow = new WOW(
        {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0
        }
    );
    wow.init();


    //слайдер сертификатов
    if (w_width > 1500) {
        var carousel = $('#carousel').waterwheelCarousel({
            speed: 600,
            separation: 340,
            opacityMultiplier: .7,
            flankingItems: 2
        });
    }
    else if ((w_width > 850) && (w_width < 1501)){
        var carousel = $('#carousel').waterwheelCarousel({
            speed: 600,
            separation: 340,
            opacityMultiplier: .7,
            flankingItems: 1
        });
    }
    else if (w_width < 851) {
        $('#carousel').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            centerMode: true,
            autoplaySpeed: 1500,
            speed: 1000,
            prevArrow: '<button id="prev" type="button" class="slick-arrow slick-prev"></button>',
            nextArrow: '<button id="next" type="button" class="slick-arrow slick-next"></button>',
            responsive: [
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('#carousel').find('.slick-arrow').appendTo('.sert-slider-nav-850');
    }


    count_slides = $('#carousel img').length;
    total_slides = $('#carousel img').length;

    if (count_slides < 10) {
        count_slides = '0' + count_slides
    }
    $('#carousel_amount').html(count_slides);

    count_current = 1;

    function slideCurrent(count_current) {
        if (count_current < 10) {
            count_current = '0' + count_current
        }
        $('#carousel_current').html(count_current);
        return count_current;
    }

    $('#carousel_prev').bind('click', function () {
        carousel.prev();
        count_current--;
        if (count_current < 1) {
            count_current = total_slides;
        }
        slideCurrent(count_current);
        return false;
    });
    $('#carousel_next').bind('click', function () {
        carousel.next();
        count_current++;
        if (count_current > total_slides) {
            count_current = 1;
        }
        slideCurrent(count_current);
        return false;
    });

    $('.how-item').mouseenter(function(){
        $('.how-item').removeClass('active');
    });
    $('.how-item').mouseleave(function(){
        $('.how-item:first-child').addClass('active');
    });

    if (w_width < 700) {
        $('.header .personal').appendTo('.header .menu');
        $('.header .lang').appendTo('.header .menu');
    }

    $('.burger').click(function(){
        $(this).toggleClass('open');
        $('.menu').slideToggle();
    });

    if (w_width < 700) {
        $('.clients-block tr:last-child td').appendTo('.clients-block tr:first-child');
    }

});