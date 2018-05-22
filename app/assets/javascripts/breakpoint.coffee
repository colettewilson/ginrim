quoteRe = /^["']|["']$/g

class Breakpoint
  @initialize: =>
    @sizes = @unquote(@grabContent("::after")).split(" ")

    @resize()
    $(window).on("resize", @resize)

  @resize: => (this[size] = do (size) => do => @at(size)) for size in @sizes

  @at: (size) => @grabContent("::before").indexOf(size) > -1

  @unquote: (string) -> string.replace(quoteRe, "")

  @grabContent: (pseudoElement) ->
    getComputedStyle(document.body, pseudoElement).getPropertyValue("content")

module.exports = Breakpoint
