# $(document).on 'click', (event) ->
#     if $(event.target).closest(".search-input").length
#       return

#     $('.search-input')
#       .removeClass('hover-transform-after')

#     event.stopPropagation()

$('.nav-search__find').on 'click', ->
  $(@)
    .toggleClass('active')
    .siblings('.search-input')
    .toggleClass('hover-transform-after')
