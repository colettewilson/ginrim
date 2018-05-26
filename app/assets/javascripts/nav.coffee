class Nav
  @defaults:
    dropdownTrigger: ".js-nav-dropdown-trigger"
    dropdown: ".js-nav-dropdown"
    dropdownOpenClass: "dropdown-is-open"

  constructor: (@$wrap) ->
    @options = Nav.defaults
    @$dopdownTrigger = @$wrap.find(@options.dropdownTrigger)
    @$dopdown = @$wrap.find(@options.dropdown)

    @$dopdownTrigger.on("click", @onTriggerClick)

  onTriggerClick: (evt) =>
    if !($(evt.target).hasClass("js-nav-dropdown-link"))
      evt.preventDefault()
      if @isOpen then @closeDropdown() else @openDropdown()

  openDropdown: =>
    unless @isOpen
      @isOpen = true
      @$dopdownTrigger.addClass(@options.dropdownOpenClass)

  closeDropdown: =>
    if @isOpen
      @isOpen = false
      @$dopdownTrigger.removeClass(@options.dropdownOpenClass)

module.exports = Nav
