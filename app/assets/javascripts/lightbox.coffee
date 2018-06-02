Hammer = require("hammerjs/hammer.js")
featherlight = require("featherlight/src/featherlight.js")
featherlightGallery = require("featherlight/src/featherlight.gallery.js")

class Lightbox
  @defaults:
    gallery: ".js-gallery-item"
    gallerySettings:
      gallery: {
        fadeIn: 300,
        fadeOut: 300
       }
      openSpeed: 300,
      closeSpeed: 300
      closeIcon: '&#10005;'
      previousIcon: '<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg>'
      nextIcon: '<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg>'

  constructor: (@$wrap) ->
    @options = Lightbox.defaults
    @$gallery = @$wrap.find(@options.gallery)
    @hammer = new Hammer(@$wrap[0])

    @hammer
      .on("tap", @onTapEvt)
      .on("pan swipe", @onSwipeEvt)

  onTapEvt: (evt) =>
    @$gallery.featherlightGallery(@options.gallerySettings)

  onSwipeEvt: (evt) =>
    @$gallery.unbind("click.featherlight")

module.exports = Lightbox
