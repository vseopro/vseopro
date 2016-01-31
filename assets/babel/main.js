const istouch = ( !!('ontouchstart' in window)) ? 'touchstart' : 'click';

$(() => {
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

    $(window).resize(function () {
        if ($(window).width() > 768) {
            clearMobileClasses();
        }
    })
});

$(() => {
    $(".search-form").clone().appendTo(".off-canvas.position-right");
    $(".login-form").clone().appendTo(".off-canvas.position-right");
    $(".profile-info").clone().appendTo(".off-canvas.position-right");

    //hideShowPassword
    $('.hideShowPassword').hidePassword(true);

    $(".dropdown-toggle").on(istouch, function (e) {})

    $('input, select:not(.form-control)').styler();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.disabled').on(istouch, () => {return false;})
});

$(() => {
    let target = $('.seo-text'),
            readmoreSettings = {
            speed: 75,
            moreLink: '<a href="#" class="btn btn-orange seo-text__button table-center">Подробнее</a>',
            lessLink: '<a href="#" class="btn btn-orange seo-text__button table-center">Свернуть</a>'
        },readmoreInit = (item, height) =>{
            let settings = $.extend(readmoreSettings, {
                collapsedHeight: height
            })
            item.readmore(settings);
        },targetMap = () =>{
            target.map((i, item) => {
                let height = $(item).data("collapsed-height");
                readmoreInit($(item), height);
            })
        };

    if ($(window).width() > 992) {
        targetMap();
    }

    if (target.length) {toConsole("Есть SEO текст на странице: " + target.length)};

    $(window).resize(function () {
        if ($(window).width() < 992) {
            $('.read-more-block').readmore('destroy');
        } else {
            targetMap();
        };
    })

});

$(() => {
    $(document).on(istouch, '.yamm .dropdown-menu', (e) => {
        e.stopPropagation()
    })

    $(".pages-menu__close").on('click', () =>{
        $(".pages-menu").empty();
    })
});

function toConsole (argument) {
    $('.console').append(argument + '<br/>')
}

$(() => {
    if ($) {
        toConsole('Jquery есть');
    };

    $('.console-close').on(istouch, function () {
        $('.console-wrap').remove();
    })
});

