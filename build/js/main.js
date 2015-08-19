(function() {
  $('.open-menu__button').on('click', function() {
    var targetAction;
    targetAction = $(this).data('show');
    if (targetAction === 'left-menu') {
      return $('html').toggleClass('open-left-mobile-menu');
    } else {
      return $('html').toggleClass('open-right-mobile-menu');
    }
  });

  $('.mobile-overlay').on('click', function() {
    return $('html').attr("class", '');
  });

}).call(this);
