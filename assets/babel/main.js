$(function() {
    $('.open-menu__button').on('click', function() {
        var targetAction = $(this).data('show');
        if (targetAction === 'left-menu') {
            $('html').toggleClass('open-left-mobile-menu');
        } else {
            $('html').toggleClass('open-right-mobile-menu');
        }
    });

    $('.mobile-overlay').on('click', () => {
        $('html').attr("class", '');
    });

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


// $(document).on("ready", function () {
//     $(".sidebar").children().css({"margin-bottom": "30px"});

//     function setMargin() {
//         var sidebar = $(".sidebar").outerHeight();
//         var content = $(".grand-content").outerHeight();
//         var childrenCoount = $(".sidebar").children().length;

//         if (content > sidebar) {
//             var childrenCoount = $(".sidebar").children().length;
//             var targetElement = $(".sidebar").children().splice(1, childrenCoount).splice(0, childrenCoount - 2);

//             targetElement.map(function (item) {
//                 $(item).css({
//                     "margin-bottom": (((content - sidebar)/targetElement.length) + 30) + "px"
//                 })
//             })
//         };
//     }

//     if ($(window).width() > 992) {
//         setMargin();
//     };

//     $(window).resize(function () {
//         if ($(window).width() > 992) {
//             setMargin();
//         };
//     })
// })

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

    $(document).on('click', '.dropdown-menu', function(e) {
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
