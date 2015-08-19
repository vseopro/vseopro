# SearchBoxButton = React.createClass
#   getInitialState: ->
#     show: false

#   getShowClass: ->
#     if @state.show
#       return 'search-input hover-transform-before hover-transform-after'
#     else
#       return 'search-input hover-transform-before'

#   getActiveClass: ->
#     if @state.show
#       return 'dib nav-search__find icon-search cur no-select nav-search__find--active'
#     else
#       return 'dib nav-search__find icon-search cur no-select'

#   handleClick: ->
#     @.setState
#       show: !this.state.show

#   render: ->
#     <span className='db'>
#       <span className={@getActiveClass()} onClick={@handleClick}></span>
#       <SearchBox class={@getShowClass()} />
#     </span>

# SearchBox = React.createClass
#   render: ->
#     <div className={@props.class}>
#         <form>
#             <input type="text" value="" className="search-input__field" placeholder="Введите текст" />
#         </form>
#     </div>

# React.render <SearchBoxButton />, document.getElementById('nav-search__item')

# $('.nav-search .dropdown-menu').on 'click', ->
  # false
  # $(@)
  #   .toggleClass('nav-search__find--active')
  #   .siblings('.search-input')
  #   .toggleClass('hover-transform-after')

$('.open-menu__button').on 'click', ->
  targetAction = $(@).data('show')
  if targetAction == 'left-menu'
    $('html').toggleClass('open-left-mobile-menu')
  else
    $('html').toggleClass('open-right-mobile-menu')

$('.mobile-overlay').on 'click', ->
  $('html').attr("class", '')

