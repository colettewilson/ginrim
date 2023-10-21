require("svgxuse")

function domReady() {
  const components = [
    ['.js-nav', require("./nav")],
    ['.js-slider', require("./slider")],
    ['.js-lightbox', require("./lightbox")],
  ]
  
  components && components.map(comp => {
    const fn = (window || this)
    // Find all elements by class name with given class name i.e. first item in comp array
    let elements = document.querySelectorAll(`${comp[0]}`)
  
    // Map array of elements and init a new class
    Array.from(elements).map(el => new comp[1].default(el))
  })
  // inits.default(document)
}

window.addEventListener('load', domReady)

// Only used in dev
if (module.hot) {
  module.hot.accept()
}