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
    {class: "js-slider", Component: require("./slider")}
  ])

  $document.ready(app.onDocumentReady)

# DOM ready things.
app.onDocumentReady = ->
  Breakpoint.initialize()
  FocusFix.initialize()

  sectionReady($node: $document)

app.setup()
