$ ->
  $('.open-menu__button').on 'click', ->
    targetAction = $(@).data('show')
    if targetAction == 'left-menu'
      $('html').toggleClass('open-left-mobile-menu')
    else
      $('html').toggleClass('open-right-mobile-menu')

  $('.mobile-overlay').on 'click', ->
    $('html').attr("class", '')

