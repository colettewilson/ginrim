const defaults = {
  navTrigger: ".js-nav-trigger",
  mobileNav: ".js-mobile-nav",
  dropdownTrigger: ".js-nav-dropdown-trigger",
  dropdown: ".js-nav-dropdown",
  dropdownOpenClass: "dropdown-is-open",
  navOpenClass: "nav-is-open"
} 

export default class Nav {
  constructor(wrap) {
    this.wrap = wrap
    this.options = defaults
    this.navTrigger = document.querySelector(this.options.navTrigger)
    this.nav = document.querySelector(this.options.mobileNav)
    this.dropdownTrigger = this.wrap.querySelectorAll(this.options.dropdownTrigger)
    this.dropdown = this.wrap.querySelector(this.options.dropdown)
    this.minWidth = 1024

    this.navTrigger.addEventListener("click", this.onNavTriggerClick)
    this.dropdownTrigger.forEach(trigger => trigger.addEventListener("click", this.onDropdownTriggerClick))
  }

  openNav = () => {
    if (this.isNavOpen) return

    this.isNavOpen = true
    this.nav.classList.add(this.options.navOpenClass)
    this.navTrigger.classList.add(this.options.navOpenClass)
  }

  closeNav = () => {
    if (!this.isNavOpen) return

    this.isNavOpen = false
    this.nav.classList.remove(this.options.navOpenClass)
    this.navTrigger.classList.remove(this.options.navOpenClass)
  }

  onNavTriggerClick = () => {
    this.isNavOpen ? this.closeNav() : this.openNav()
  }

  onDropdownTriggerClick = (evt) => {
    if (evt.target.classList.contains('js-nav-dropdown-trigger')) {
      evt.preventDefault()
      const trigger = evt.target

      this.isDropdownOpen ? this.closeDropdown(trigger) : this.openDropdown(trigger)
    }
  }

  openDropdown = (trigger) => {
    if (this.isDropdownOpen) return

    this.isDropdownOpen = true
    trigger.classList.add(this.options.dropdownOpenClass)
  }

  closeDropdown = (trigger) => {
    if (!this.isDropdownOpen) return

    this.isDropdownOpen = false
    trigger.classList.remove(this.options.dropdownOpenClass)
  }
}
