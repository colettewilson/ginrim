FontFaceObserver = require("fontfaceobserver/fontfaceobserver")

fonts = [
  # {name: "Font Name"}
  # {name: "Font Name", weight: 700}
  # {name: "Font Name", style: "italic"}
]

CLASS_NAME = "fonts-loaded"
COOKIE_NAME = "fonts_loaded"

###*
# Creates and returns a FFO instance for loading a single font variant.
# @param {Object} font Font variant data.
# @param {string} font.name CSS `font-family` value.
# @param {string} font.weight CSS `font-weight` value. FFO defaults to `400` if undefined.
# @param {string} font.style CSS `font-style` value. FFO defaults to `"regular"` if undefined.
# @param {string} font.testString Text used in DOM to check font load state. FFO defaults to
#  `"BESbswy"` if undefined.
# @return {Promise<FontFaceObserver.Observer>}
###
loadFont = (font) ->
  observer = new FontFaceObserver(font.name,
    weight: font.weight
    style: font.style
  )

  observer.load font.testString, 10000

addHtmlClass = -> document.documentElement.className += " #{CLASS_NAME}"

onAllFontsLoaded = ->
  addHtmlClass()

  # Trigger native resize event - lets app JS respond to any layout changes caused by
  # fallback -> real font switch.
  ev = null
  try
    ev = new (window.Event)("resize")
  catch error
    ev = document.createEvent("HTMLEvents")
    ev.initEvent "resize", true, false
  window.dispatchEvent ev

  # Set cookie - used on later page views to check if fonts have already loaded.
  date = new Date
  date.setTime date.getTime() + 365 * 24 * 60 * 60 * 1000
  document.cookie = "#{COOKIE_NAME}=1; expires#{date.toGMTString()}; path=/"

# Load fonts (FFO includes a Promise polyfill).
if document.cookie.indexOf("#{COOKIE_NAME}=") > 0
  addHtmlClass()
else
  Promise.all(fonts.map(loadFont))
    .then(onAllFontsLoaded)
    .catch (err) -> console.error(err)
