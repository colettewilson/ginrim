require("fslightbox")

const defaults = {
  gallery: ".js-gallery-item",
}

export default class Lightbox {
  constructor(wrap) {
    this.wrap = wrap
    this.options = defaults
    this.gallery = this.wrap.querySelectorAll(this.options.gallery)

    this.gallery.forEach(image => image.addEventListener('click', this.initLightbox))
  }
    
  initLightbox = evt => {
    evt.preventDefault()

    const lightbox = new FsLightbox()
    const images = this.wrap.querySelectorAll("img")
    const sources = []

    images.forEach(image => sources.push(image.src))

    let index
    sources.forEach((source, i) => {
      if (source === evt.currentTarget.href) index = i
    })

    lightbox.props.sources = sources
    lightbox.open(index ?? 0)
  }
}
