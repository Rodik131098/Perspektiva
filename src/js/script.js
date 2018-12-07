$(document).ready(function(){
    (function(){
        $('.perspectiva_ajax_search').parent().addClass('ajax_search');
    })();
    //Кнопка наверх
    (function () {
        var topArrow = $('#up-arrow');
        var topShow = 550;
        var delay = 1000;
        $(window).on('scroll', function () {
            if($(this).scrollTop() > topShow){
                topArrow.show();
            }else{
                topArrow.hide();
            }
        });
        $(topArrow).on('click', function () {
            $('body, html').animate({
                scrollTop: 0
            }, delay);
        });
    })();

    //Мобильное меню
    (function(){
        var mobileMenu = $('.nav__mobile-action-menu'),
            mobileMenuIcon = $(mobileMenu).find('.fa'),
            menuNav = $(mobileMenu).closest('.nav').find('.nav__list');
        $(mobileMenu).on('click', function(){
            mobileMenuIcon.toggleClass('fa-bars');
            mobileMenuIcon.toggleClass('fa-times');
            window.setTimeout(function() {
                menuNav.toggleClass('nav__list_enter');
            }, 0)
        })
    })();

    //слайдеры
    (function(){
        var windowWidth = $(window).width();
        var speed = 500;
        var timeout;
        var $commentsSlider = $('.comments__slider');
        var category = $('.category');
        var cardsElem = $('.cards');
        var slidersSettings = {
            startSection: {
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: $('.start-section__slider-arrow-left'),
                nextArrow: $('.start-section__slider-arrow-right'),
                speed: speed
            },
            cards: {
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 915,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 630,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            dots: true,
                            slidesToShow: 1,
                            arrows: false
                        }
                    }
                ]
            },
            news: {
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: $('.news__arrow-prev'),
                nextArrow: $('.news__arrow-next'),
                responsive: [
                    {
                        breakpoint: 1230,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 830,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 470,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true
                        }
                    },
                ]
            },
            comments: {
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: $('.comments__arrow-prev'),
                nextArrow: $('.comments__arrow-next'),
                speed: speed,
                responsive: [
                    {
                        breakpoint: 1230,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true
                        }
                    },
                ]
            },
            category: {
                slidesToShow: 4,
                slidesToScroll: 1,
                speed: speed,
                responsive: [
                    {
                        breakpoint: 1270,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 950,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 650,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true
                        }
                    }
                ]
            }
        };

        $('.start-section__slider').slick(slidersSettings.startSection);


        $(cardsElem).each(function () {
            var slider = $(this).find('.cards__slider'),
                prevArrow = $(this).find('.cards__arrow-prev'),
                nextArrow = $(this).find('.cards__arrow-next');
            if($(slider).children().length > 4){
                slidersSettings.cards.prevArrow = prevArrow;
                slidersSettings.cards.nextArrow = nextArrow;
                $(slider).slick(slidersSettings.cards);
            }
        });


        $('.news__slider').slick(slidersSettings.news);

        $commentsSlider.slick(slidersSettings.comments);

        scaleSlides();
        initCategorySliders();
        $(window).on('resize', function(){
            windowWidth =  $(window).width();
            timeout = setTimeout(function(){
                scaleSlides();
                initCategorySliders();
            }, 500);
        });

        //Функция изменения размера центрального слайда на слайдере отзывов
        function scaleSlides(){
            if(windowWidth>550){ // Маштабируем слайд при улсовии
                //
                removeScaleOnSlides();
                onScaleCenterSlide();

                $commentsSlider.on('beforeChange', function (){
                    removeScaleOnSlides();
                    setTimeout(function () {
                        onScaleCenterSlide();
                    },100)
                });
            }else{ // Удаляем маштабирование с слайдов
                removeScaleOnSlides();
                $commentsSlider.off('beforeChange');
            }

            function onScaleCenterSlide(){
                var centerSlide,
                    slides = $commentsSlider.find(' .slick-active');
                if(slides.length > 1){
                    centerSlide = slides[1];
                }else{
                    centerSlide = slides[0];
                }
                centerSlide = $(centerSlide).find('.comments__comment');
                $(centerSlide).addClass('comments__comment_current');
            }

            function removeScaleOnSlides(){
                var scaleSlides = $('.comments__slider .slick-slide').find('.comments__comment_current');
                scaleSlides.removeClass('comments__comment_current');
            }
        }

        //Функция по иницализации слайдеров в категория образовательных программ
        function initCategorySliders(){
            $(category).each(function(item){
                var that = this;
                var slider = $(this).find('.category__themes-list');
                var themes = $(this).find('.category__theme');
                if( (themes.length > 4)
                    || (themes.length === 4 && windowWidth < 1270)
                    || (themes.length === 3 && windowWidth < 950)
                    || (themes.length === 2 && windowWidth < 650)
                ){
                    slidersSettings.category.prevArrow = $(this).find('.category__arrow-prev');
                    slidersSettings.category.nextArrow = $(this).find('.category__arrow-next');
                    $(slider).not('.slick-initialized').slick(slidersSettings.category);
                }else if($(slider).hasClass('slick-initialized')){
                    $(slider).slick('unslick');
                }
            });
        }
    })();

    //Выбор режима просмотра на странице "Инетересные статьи"
    (function () {
        var viewMode = $('#int-art-view-mode');

        $(viewMode).on('change', function (e) {

            var value = this.value.toLowerCase();

            if(value === "списком"){
                $('.interesting-articles__articles').addClass('interesting-articles__articles_list');
            }else{
                $('.interesting-articles__articles').removeClass('interesting-articles__articles_list');
            }

        });
    })();

    //Всплывающие окна
    (function () {
        //popup на странице образовательных программ
        dynamicPopup($('.category__stock'), $('#stock-popup'));

        //popup на странице "Педагоги"
        dynamicPopup($('.teachers__list .news__card'),  $('#teacher-popup'));

        //popup на главной "Отзовы"
        dynamicPopup($('.comments__comment-button'),  $('#js-comment-inf'));

        //popup а странице "Оплата"
        popup($('#js-payment-link'),  $('#payment-popup'));

        //popup информации о отзыве на странице отзывов
        dynamicPopup($('.comment__button'), $('#js-comment-inf'));

        //popup акций и скидок
        dynamicPopup($('.stock'), $('#js-stock-inf'));

        //popup форма отзыва на странице отзывов
        popup($('#js-comment-form-button'), $('#js-comment-form'));

        function popup(initElem, elem) {
            $(initElem).on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(document.body).css('overflow', 'hidden');
                $(elem).css('display', 'flex');
                $(elem).on('click', function(e){
                    if(this === e.target){
                        $(this).css('display', 'none');
                        $(document.body).css('overflow', 'auto');
                    }
                })
            });
        }
        function dynamicPopup(initElem, popup) {
            $(initElem).on('click', function(e){
                e.stopPropagation();
                e.preventDefault();
                var root;
                var dataElem;
                if($(this).hasClass('js-root')){
                    root = $(this);
                }else{
                    root = $(this).closest('.js-root');
                }
                dataElem = $(root).find('[data-popup]');
                $(dataElem).each(function () {
                    var dataValue = $(this).attr('data-popup');
                    var elemContent = $(this).html();
                    var popupDataElement = $(popup).find('[data-popup=' + dataValue + ']');
                    $(popupDataElement).html(elemContent);
                });
                $(document.body).css('overflow', 'hidden');
                $(popup).css('display', 'flex');
                $(popup).on('click', function(e){
                    if(this === e.target){
                        $(this).css('display', 'none');
                        $(document.body).css('overflow', 'auto');
                    }
                })
            });
        }
    })();

    //Добавление обертки для таблиц
    (function() {
        var tables = document.querySelectorAll('table');
        for(var i = 0; i < tables.length; i++){
            var parent = tables[i].parentElement;
            var element = document.createElement('div');
            var nextElement = tables[i].nextSibling; 
            element.className = 'article__table-container';
            parent.style.width = "100%";
            element.appendChild(tables[i]);
            parent.insertBefore(element, nextElement);
        }
    })();

});