const istouch = ( !!('ontouchstart' in window)) ? 'touchstart' : 'click';
const toConsole = (obj) => {
    /*
        rules{
            exp: $
            success: "Есть jquery",
            error: "Нет Jquery"
        }
     */

    if (obj.exp) {
        $('.console').append(obj.success + '<br/>')
        console.log(obj.success)
    } else {
        $('.console').append(obj.error + '<br/>')
        console.error(obj.error)
    };
}


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
    let targetAppend = $(".off-canvas.position-right");

    $(".search-form").clone().appendTo(targetAppend);
    $(".login-form").clone().appendTo(targetAppend);
    $(".profile-info").clone().appendTo(targetAppend);
});

$(() => {
    //hideShowPassword
    $('.hideShowPassword').hidePassword(true);

    $(".dropdown-toggle").on(istouch, function (e) {})

    $('input, select:not(.form-control)').styler();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.disabled').on(istouch, () => {return false;})
});

$(() => {
    let target = $('.seo-text');
    let readmoreSettings = {
        speed: 75,
        moreLink: '<a href="#" class="btn btn-orange seo-text__button table-center">Подробнее</a>',
        lessLink: '<a href="#" class="btn btn-orange seo-text__button table-center">Свернуть</a>'
    }
    let readmoreInit = (item, height) => {
        let settings = $.extend(readmoreSettings, {
            collapsedHeight: height
        })
        item.readmore(settings);
    }
    let targetMap = () => {
        target.map((i, item) => {
            let height = $(item).data("collapsed-height");
            readmoreInit($(item), height);
        })
    };

    if ($(window).width() > 992) {
        targetMap();
    }

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

    $('.console-close').on(istouch, function () {
        $('.console-wrap').remove();
    })
});

$(() => {
    toConsole({
        exp: $,
        error: "Нет Jquery",
        success: "Есть Jquery"
    });

    toConsole({
        exp: $('.seo-text').length,
        error: "Нет SEO текста на странице",
        success: "Есть SEO текст на странице"
    })
});

// --- affix top menu script ---
$(() => {
    let target = $('.nav-afix');
    let startPosition = target.offset().top;

    $(window).scroll(() => {
        if ($(window).scrollTop() >= startPosition) {
            if (!target.hasClass()) {
                target.addClass('affix')
            };
        } else {
            target.removeClass('affix')
        };
    });
});

