const istouch = ( !!('ontouchstart' in window)) ? 'touchstart' : 'click';

$(function() {

    let clearMobileClasses = function () {
        $(".off-canvas-wrapper-inner")
            .removeClass("is-off-canvas-open")
            .removeClass("is-open-right")
            .removeClass("is-open-left")

        $(".off-canvas.position-left")
            .removeClass("is-open")

        $(".off-canvas.position-right")
            .removeClass("is-open")
    }

    $('.open-menu__button').on(istouch, function() {
        clearMobileClasses();
        let targetAction = $(this).data('show');
        let offCanvasWrapperInner = $(".off-canvas-wrapper-inner");

        if (targetAction === 'left-menu') {
            offCanvasWrapperInner
                .addClass("is-off-canvas-open")
                .addClass("is-open-left")
            $(".off-canvas.position-left")
                .addClass('is-open')
        } else {
            offCanvasWrapperInner
                .addClass("is-off-canvas-open")
                .addClass("is-open-right")
            $(".off-canvas.position-right")
                .addClass('is-open')
        }
    });

    $(".js-off-canvas-exit").on(istouch, function () {
        clearMobileClasses();
    })

    $(".login-form").clone().appendTo(".off-canvas.position-right");

    //hideShowPassword
    $('.hideShowPassword').hidePassword(true);

    // //don't click menu block
    // $('.search-form, .login-form').on('click', function(event){
    //   var events = $._data(document, 'events') || {};
    //   events = events.click || [];
    //   for(var i = 0; i < events.length; i++) {
    //       if(events[i].selector) {

    //           //Check if the clicked element matches the event selector
    //           if($(event.target).is(events[i].selector)) {
    //               events[i].handler.call(event.target, event);
    //           }

    //           // Check if any of the clicked element parents matches the
    //           // delegated event selector (Emulating propagation)
    //           $(event.target).parents(events[i].selector).each(function(){
    //               events[i].handler.call(this, event);
    //           });
    //       }
    //   }
    //   event.stopPropagation(); //Always stop propagation
    // });

    $('input, select:not(.form-control)').styler();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.disabled').on('click', () => {return false;})


    var readmoreSettings = {
        speed: 75,
        moreLink: '<a href="#" class="btn btn-orange btn-read-more table-center">Подробнее</a>',
        lessLink: '<a href="#" class="btn btn-orange btn-read-more table-center">Свернуть</a>',
        collapsedHeight: $('.read-more-block').data("collapsed-height"),
    }

    $('.read-more-block').readmore(readmoreSettings);

    $(window).resize(function () {
        if ($(window).width() < 992) {
            $('.read-more-block').readmore('destroy');
        } else {
            $('.read-more-block').readmore(readmoreSettings);
        };
    })
});

// $(function() {
//     $(window).on('scroll', (e) => {
//         if ($('.grand-content').height() > $('.sidebar').height()) {

//             // вычисляем высоту верхних блоков
//             var headerHeight = $('header.main').outerHeight() + $('.affix-wrap').outerHeight() + $('.hot-news').outerHeight() + $('.welcome-block').outerHeight();

//             // вычисляем разницу между .grand-content и .sidebar
//             var heigthResult = $('.grand-content').height() - $('.sidebar').height();

//             // вычисляем постоянную константу
//             var constant = heigthResult / $('.grand-content').height();

//             // заносим в переменную высоту окна
//             var windowHeight = $(window).height();

//             if ($(window).scrollTop() > headerHeight && $(window).scrollTop() < headerHeight + $('.grand-content').height() - windowHeight * 2) {
//                 $('.sidebar').css({
//                     "top": ($(window).scrollTop() - headerHeight) * constant,
//                     "bottom": "auto"
//                 });
//             } else if($(window).scrollTop() < headerHeight){
//                 $('.sidebar').css({
//                     "top": 0,
//                     "bottom": "auto"
//                 })
//             } else if($(window).scrollTop() > headerHeight + ($('.grand-content').height() - $(window).height() * 2)){
//                 $('.sidebar').css({
//                     "top": "auto",
//                     "bottom": 0
//                 })
//             }
//         };
//     })
// });

$(function() {
//     if(device.ipad() ||
//         device.androidTablet() ||
//         device.blackberryTablet() ||
//         device.windowsTablet() ||
//         device.fxosTablet() ||
//         device.tablet()){

//         $('.first-menu__has-menu').on('click', () => {
//             var _this = $(this);
//             _this.find('.second-menu__list').css({
//                 'display': 'block'
//             });
//         });

//         $('.second-menu__has-menu').on('click', () => {
//             var _this = $(this);
//             _this.find('.third-menu__list').css({
//                 'display': 'block'
//             });
//         });
//     }

    $(document).on('click', '.yamm .dropdown-menu', (e) => {
      e.stopPropagation()
    })

    $(".pages-menu__close").on('click', () =>{
        $(".pages-menu").empty();
    })
});

// $(() => {

//     let menuJson = [];

//     $(".main-menu").children().children().map((i, item) => {
//         if ($(item).children('ul').length) {
//             menuJson.push({
//                 link: $(item).children('a').text(),
//                 href: $(item).children('a').attr("href"),
//                 subMenu: {

//                 }
//             })
//         } else {
//             menuJson.push({
//                 link: $(item).children('a').text(),
//                 href: $(item).children('a').attr("href")
//             })
//         };

//     })

//     console.log(menuJson);
// });
