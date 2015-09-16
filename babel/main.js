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

    //don't click menu block
    $('.search-form, .login-form').on('click', function(event){
      var events = $._data(document, 'events') || {};
      events = events.click || [];
      for(var i = 0; i < events.length; i++) {
          if(events[i].selector) {

              //Check if the clicked element matches the event selector
              if($(event.target).is(events[i].selector)) {
                  events[i].handler.call(event.target, event);
              }

              // Check if any of the clicked element parents matches the
              // delegated event selector (Emulating propagation)
              $(event.target).parents(events[i].selector).each(function(){
                  events[i].handler.call(this, event);
              });
          }
      }
      event.stopPropagation(); //Always stop propagation
    });

    $('input, select:not(.form-control)').styler();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.disabled').on('click', () => {return false;})
});
