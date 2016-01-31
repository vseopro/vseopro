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
});

$(() => {
    $(".search-form").clone().appendTo(".off-canvas.position-right");
    $(".login-form").clone().appendTo(".off-canvas.position-right");

    //hideShowPassword
    $('.hideShowPassword').hidePassword(true);

    $(".dropdown-toggle").on(istouch, function (e) {})

    $('input, select:not(.form-control)').styler();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.disabled').on(istouch, () => {return false;})
});

$(() => {
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

