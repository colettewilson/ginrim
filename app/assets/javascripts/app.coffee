require("svgxuse")
Breakpoint = require("./breakpoint")
FocusFix = require("./focus-fix")
sectionReady = require("./section-ready")

$document = $ document
app = {}

# App entry point
app.setup = ->
  sectionReady.addComponents([
    # A list of class names matched to components, e.g.:
    {class: "js-nav", Component: require("./nav")}
    {class: "js-slider", Component: require("./slider")}
    {class: "js-lightbox", Component: require("./lightbox")}
  ])

  $document.ready(app.onDocumentReady)

# DOM ready things.
app.onDocumentReady = ->
  Breakpoint.initialize()
  FocusFix.initialize()

  sectionReady($node: $document)

app.setup()
