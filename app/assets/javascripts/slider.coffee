Flickity = require("flickity/dist/flickity.pkgd.js")

class Slider
  @defaults:
    thumbnails: ".js-thumbnails"
    sliderToggle: ".js-slider-toggle"
    flickityDataSettings: "data-flickity-settings"
    flickitySettings:
      adaptiveHeight: false
      pageDots: false
      prevNextButtons: true,
      wrapAround: true
      imagesLoaded: true
      percentPosition: false
    toggleOpenLabel: ".toggle-open"
    toggleCloseLabel: ".toggle-close"
    thumbnailsOpenClass: "thumbnails-open"

  constructor: (@$wrap) ->
    @options = Slider.defaults
    @$slider = @$wrap.find(@options.contentSelector)
    @$sliderToggle = $(document).find(@options.sliderToggle)
    @$thumbnails = $(document).find(@options.thumbnails)
    @$toggleOpenLabel = @$sliderToggle.find(@options.toggleOpenLabel)
    @$toggleCloseLabel = @$sliderToggle.find(@options.toggleCloseLabel)

    @setupSlider()
    @$sliderToggle.on("click", @toggleThumbnails)
    @$thumbnails.on("click", ".thumbnail", @onThumbnailClick)

  setupSlider: =>
    settings = @$wrap.attr(@options.flickityDataSettings)
    settings = JSON.parse settings if settings?
    settings = $.extend({}, @options.flickitySettings, settings)
    @flickity = new Flickity(@$wrap[0], settings)

  getIndex: (selector) =>
    for thumb, index in @$thumbnails.find(".thumbnail")
      if $(selector).is($(thumb))
        return index

  onThumbnailClick: (evt) =>
    evt.preventDefault()
    index = @getIndex(evt.currentTarget)

    @flickity.select(index)
    @closeThumbnails()

  toggleThumbnails: =>
    if @isOpen then @closeThumbnails() else @openThmbnails()

  openThmbnails: =>
    unless @isOpen
      @isOpen = true

      @$sliderToggle.addClass(@options.thumbnailsOpenClass)
      @$thumbnails.addClass(@options.thumbnailsOpenClass)

      # Show correct aria label
      @$toggleOpenLabel.attr("aria-hidden", true)
      @$toggleCloseLabel.attr("aria-hidden", false)

  closeThumbnails: =>
    if @isOpen
      @isOpen = false

      @$sliderToggle.removeClass(@options.thumbnailsOpenClass)
      @$thumbnails.removeClass(@options.thumbnailsOpenClass)

      # Show correct aria label
      @$toggleCloseLabel.attr("aria-hidden", true)
      @$toggleOpenLabel.attr("aria-hidden", false)
      @flickity.focus()

module.exports = Slider
