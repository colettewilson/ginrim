const Flickity = require("flickity")
const defaults = {
  thumbnails: ".js-thumbnails",
  sliderToggle: ".js-slider-toggle",
  flickityDataSettings: "data-flickity-settings",
  flickitySettings: {
    adaptiveHeight: false,
    pageDots: false,
    prevNextButtons: true,
    wrapAround: true,
    imagesLoaded: true,
    percentPosition: false
  },
  toggleOpenLabel: ".toggle-open",
  toggleCloseLabel: ".toggle-close",
  thumbnailsOpenClass: "thumbnails-open",
  noScrollClass: "no-scroll"
}

export default class Slider {
  constructor(wrap) {
    this.wrap = wrap
    this.options = defaults
    this.slider = this.wrap.querySelector(this.options.contentSelector)
    this.sliderToggle = document.querySelector(this.options.sliderToggle)
    this.thumbnails = document.querySelector(this.options.thumbnails)
    this.toggleOpenLabel = document.querySelector(this.options.toggleOpenLabel)
    this.toggleCloseLabel = document.querySelector(this.options.toggleCloseLabel)

    this.setupSlider()
    this.sliderToggle.addEventListener("click", this.toggleThumbnails)
    this.thumbnails.addEventListener("click", this.onThumbnailClick)
  }

  setupSlider = () => {
    let settings = this.wrap.getAttribute(this.options.flickityDataSettings)
    settings = JSON.parse(settings) ?? {}
    settings = {...this.options.flickitySettings, ...settings}
    this.flickity = new Flickity(this.wrap, settings)
  }

  getIndex = (selector) => {
    let index

    this.thumbnails.querySelectorAll(".thumbnail").forEach(function(thumb, i) {
      if (selector === thumb) index = i
    })

    return index
  }

  onThumbnailClick = (evt) => {
    evt.preventDefault()
    const thumb = evt.target.closest('.js-slider-thumb')
    let index = this.getIndex(thumb)

    this.flickity.select(index)
    this.closeThumbnails()
  }

  toggleThumbnails = () => {
    this.isOpen ? this.closeThumbnails() : this.openThmbnails()
  }

  openThmbnails = () => {
    if (!this.isOpen) {
      this.isOpen = true
      this.top = window.scrollTo(0, 0)

      this.sliderToggle.classList.add(this.options.thumbnailsOpenClass)
      this.thumbnails.classList.add(this.options.thumbnailsOpenClass)
      document.body.classList.add(this.options.noScrollClass)
      document.body.style.top = -this.top

      // Show correct aria label
      this.toggleOpenLabel.setAttribute("aria-hidden", true)
      this.toggleCloseLabel.setAttribute("aria-hidden", false)
    }
  }

  closeThumbnails = () => {
    if (this.isOpen) {
      this.isOpen = false

      this.sliderToggle.classList.remove(this.options.thumbnailsOpenClass)
      this.thumbnails.classList.remove(this.options.thumbnailsOpenClass)
      document.body.classList.remove(this.options.noScrollClass)
      document.body.style.top = ''
      window.scrollTo(0, this.top)

      // Show correct aria label
      this.toggleCloseLabel.setAttribute("aria-hidden", true)
      this.toggleOpenLabel.setAttribute("aria-hidden", false)
      this.flickity.focus()
    }
  }
}
