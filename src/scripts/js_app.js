var _functions = {}, winWidth, shareButton;

jQuery(function ($) {
    var isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    if (isTouchScreen)
        $('html').addClass('touch-screen');
    var winScr, winHeight, is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
        is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;
    winWidth = $(window).width();
    winHeight = $(window).height();
    if (is_Mac) {
        $('html').addClass('mac');
    }
    if (is_IE) {
        $('html').addClass('ie');
    }
    if (is_Chrome) {
        $('html').addClass('chrome');
    }

    /*new slider*/
    _functions.getSwOptions = function (swiper) {
        var options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        var $p = swiper.closest('.swiper-entry'),
            slidesLength = swiper.find('>.swiper-wrapper>.swiper-slide').length;
        if (options.progressbar)
            options.pagination = {
                el: $p.find('.swiper-pagination')[0],
                type: 'progressbar',
                clickable: true
            };

        if (!options.pagination)
            options.pagination = {
                el: $p.find('.swiper-pagination')[0],
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + '0' +(index + 1) + "</span>";


                },
            };
        if (!options.navigation)
            options.navigation = {
                nextEl: $p.find('.swiper-button-next')[0],
                prevEl: $p.find('.swiper-button-prev')[0]
            };
        options.preloadImages = false;
        options.lazy = {
            loadPrevNext: true
        };
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.speed = 500;
        options.direction = "horizontal";
        options.roundLengths = false;
        if (!options.centerInsufficientSlides)
            options.centerInsufficientSlides = false;
        if (isTouchScreen)
            options.direction = "horizontal";
        if (options.customFraction) {
            $p.addClass('custom-fraction');
            if (slidesLength > 1 && slidesLength < 10) {
                $p.find('.custom-current').text('01');
                $p.find('.custom-total').text('0' + slidesLength);
            } else if (slidesLength > 1) {
                $p.find('.custom-current').text('01');
                $p.find('.custom-total').text('0' + slidesLength);
            }
        }
        return options;
    }
    ;
    _functions.initSwiper = function (el) {
        var swiper = new Swiper(el[0], _functions.getSwOptions(el));
    };
    $('.swiper-entry .swiper-container').each(function () {
        _functions.initSwiper($(this));
    });


    //custom fraction
    $('.custom-fraction').each(function () {
        var $this = $(this),
            $thisSwiper = $this.find('.swiper-container')[0].swiper,
            currentSlide = $thisSwiper.realIndex + 1;
        $thisSwiper.on('slideChange', function () {
            $this.find('.custom-current').text(
                function () {
                    currentSlide = $thisSwiper.realIndex + 1;
                    if ($thisSwiper.realIndex < 9) {
                        return ('0' + currentSlide)
                    } else {
                        return '0' + currentSlide
                    }
                }
            )
        });
    });


    $('.swiper-thumbs').each(function () {
        var top = $(this).find('.swiper-container.swiper-thumbs-top')[0].swiper
            , bottom = $(this).find('.swiper-container.swiper-thumbs-bottom')[0].swiper;
        top.thumbs.swiper = bottom;
        top.thumbs.init();
        top.thumbs.update();
    });
    $('.swiper-control').each(function () {
        var top = $(this).find('.swiper-container')[0].swiper
            , bottom = $(this).find('.swiper-container')[1].swiper;
        top.controller.control = bottom;
        bottom.controller.control = top;
    });

    function slideLength() {
        $('.swiper-entry .swiper-container').each(function () {
            var th = $(this)
                , slidesLength = $(this).find('.swiper-slide').length
                , visibleSlidesLength = $(this).find('.swiper-slide-visible').length;
            if (slidesLength <= visibleSlidesLength) {
                th.addClass('swiper-no');
            }
        });
    }

    slideLength();
    $(window).on('resize', function () {
        slideLength();
    });


    /*new slider*/


    //popup
    let popupTop = 0;
    _functions.removeScroll = function () {
        popupTop = $(window).scrollTop();
        $('html').css({
            "position": "fixed",
            "top": -$(window).scrollTop(),
            "width": "100%"
        });
    }
    _functions.addScroll = function () {

        $('html').css({
            "position": "static"
        });
        // $('html').css({}).removeClass("overflow-hidden");
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {

        $('.popup-content').removeClass('active');

        // $('.popup-content').removeClass('animate-away').addClass('animate-in');

        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {


        //$('.popup-content').removeClass('animate-in').addClass('animate-away');

        $('.popup-wrapper, .popup-content').removeClass('active');
        _functions.addScroll();
    };

    $(document).on('click', '.open-popup', function (e) {
        e.preventDefault();
        _functions.openPopup('.popup-content[data-rel="' + $(this).data('rel') + '"]');
    });

    $(document).on('click', '.popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .btn-back', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });

/*(window).scrollTop() > 30 ? r.removeClass("transparent") : r.addClass("transparent")
            }
        ));
    };
    _functions.coolNav();
*/


    /* Function on page scroll */
    $(window).on('scroll', function () {
        _functions.scrollCall();
    });

    var prevScroll = 0;
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > prevScroll) {
            $('header').addClass('scrolled');
        } else if (winScr <= 10) {
            $('header').removeClass('scrolled');
            prevScroll = 0;
        };
    };
    _functions.scrollCall();





});

function scrollAnime() {
    if ($('.animation').length) {
        $('.animation').not('.animated').each(function () {
            var th = $(this);
            if ($(window).width() < 768) {
                if ($(window).scrollTop() >= th.offset().top - ($(window).height() * 0.95)) {
                    th.addClass('animated');
                }
            } else {
                if ($(window).scrollTop() >= th.offset().top - ($(window).height() * 0.85)) {
                    th.addClass('animated');
                }
            }
        });
    }
}

scrollAnime();
$(window).on('scroll', function () {
    scrollAnime();
});


jQuery(function () {
    $(".burger__wrap").on("click", function () {
        $(this).toggleClass("active"),
            $(".navbar").toggleClass("is-visible")
    })

    _functions.scrollWidth = function () {
        let scrWidth = $(window).outerWidth() - $('body').innerWidth();
        $('body,  .h-menu-toggle, .h-search-wrapp').css({
            "paddingRight": `${scrWidth}px`
        });
    }
    // Open menu
    $(document).on('click', '.h-burger', function () {
        //_functions.scrollWidth();
        $('html').toggleClass('overflow-menu');
        $(this).closest('header').toggleClass('open-menu');
    });


});


