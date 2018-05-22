class Thumbnails
  @defaults:
    toggleTrigger: ".js-slider-toggle"
    toggleOpenLabel: ".toggle-open"
    toggleCloseLabel: ".toggle-close"
    slider: ".js-slider"
    thumbnailsOpenClass: "thumbnails-open"

  constructor: (@$wrap) ->
    @options = Thumbnails.defaults
    @$toggleTrigger = $(document).find(@options.toggleTrigger)
    @$toggleOpenLabel = @$toggleTrigger.find(@options.toggleOpenLabel)
    @$toggleCloseLabel = @$toggleTrigger.find(@options.toggleCloseLabel)
    @$slider = $(document).find(@options.slider)

  toggleThumbnails: =>
    if @isOpen then @closeThumbnails() else @openThmbnails()

  openThmbnails: =>
    unless @isOpen
      @isOpen = true

      @$toggleTrigger.addClass(@options.thumbnailsOpenClass)
      @$wrap.addClass(@options.thumbnailsOpenClass)

      # Show correct aria label
      @$toggleOpenLabel.attr("aria-hidden", true)
      @$toggleCloseLabel.attr("aria-hidden", false)

  closeThumbnails: =>
    if @isOpen
      @isOpen = false

      @$toggleTrigger.removeClass(@options.thumbnailsOpenClass)
      @$wrap.removeClass(@options.thumbnailsOpenClass)

      # Show correct aria label
      @$toggleCloseLabel.attr("aria-hidden", true)
      @$toggleOpenLabel.attr("aria-hidden", false)

module.exports = Thumbnails
