class Nav
  @defaults:
    navTrigger: ".js-nav-trigger"
    mobileNav: ".js-mobile-nav"
    dropdownTrigger: ".js-nav-dropdown-trigger"
    dropdown: ".js-nav-dropdown"
    dropdownOpenClass: "dropdown-is-open"
    navOpenClass: "nav-is-open"

  constructor: (@$wrap) ->
    @options = Nav.defaults
    @$navTrigger = $(document).find(@options.navTrigger)
    @$nav = $(document).find(@options.mobileNav)
    @$dopdownTrigger = @$wrap.find(@options.dropdownTrigger)
    @$dopdown = @$wrap.find(@options.dropdown)
    @minWidth = 1024

    @setupNav()
    $(window).on("resize", @resizeEvent)
    @$dopdownTrigger.on("click", @onDropdownTriggerClick)

  resizeEvent: =>
    @closeNav()
    @setupNav()

  setupNav: =>
    if $(window).width() < @minWidth
      @$navTrigger.on("click", @onNavTriggerClick)
    else
      @$navTrigger.off("click", @onNavTriggerClick)

  onNavTriggerClick: =>
    if @isNavOpen then @closeNav() else @openNav()

  openNav: =>
    unless @isNavOpen
      @isNavOpen = true
      @$nav.addClass(@options.navOpenClass)
      @$navTrigger.addClass(@options.navOpenClass)

  closeNav: =>
    if @isNavOpen
      @isNavOpen = false
      @$nav.removeClass(@options.navOpenClass)
      @$navTrigger.removeClass(@options.navOpenClass)

  onDropdownTriggerClick: (evt) =>
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
