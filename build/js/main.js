(function() {
  $('.nav-search__find').on('click', function() {
    return $(this).toggleClass('active').siblings('.search-input').toggleClass('hover-transform-after');
  });

}).call(this);
