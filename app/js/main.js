'use strict';

$(function () {
    $('.open-menu__button').on('click', function () {
        var targetAction = $(this).data('show');
        if (targetAction === 'left-menu') {
            $('html').toggleClass('open-left-mobile-menu');
        } else {
            $('html').toggleClass('open-right-mobile-menu');
        }
    });

    $('.mobile-overlay').on('click', function () {
        $('html').attr("class", '');
    });

    $('.search-form, .login-form').on('click', function (event) {
        var events = $._data(document, 'events') || {};
        events = events.click || [];
        for (var i = 0; i < events.length; i++) {
            if (events[i].selector) {
                if ($(event.target).is(events[i].selector)) {
                    events[i].handler.call(event.target, event);
                }

                $(event.target).parents(events[i].selector).each(function () {
                    events[i].handler.call(this, event);
                });
            }
        }
        event.stopPropagation();
    });

    $('input, select:not(.form-control)').styler();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.disabled').on('click', function () {
        return false;
    });
});

$(function () {
    var _this2 = this;

    if (device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet() || device.tablet()) {

        $('body').addClass("browser-mobile");

        $('.first-menu__has-menu').on('click', function () {
            var _this = $(_this2);
            _this.find('.second-menu__list').css({
                'display': 'block'
            });
        });

        $('.second-menu__has-menu').on('click', function () {
            var _this = $(_this2);
            _this.find('.third-menu__list').css({
                'display': 'block'
            });
        });
    }

    $(".pages-menu__close").on('click', function () {
        $(".pages-menu").empty();
    });
});