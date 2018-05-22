# Taken from https://github.com/wilddeer/focus-fix, updated to use requestAnimationFrame instead
# of setTimeout to avoid flicker of outline when clicking buttons.
class FocusFix
  @initialize: =>
    @mouseFocusedClass = "is-mouse-focused"

    $("body").on(
      mousedown: @checkApplyState
      mouseup: @checkApplyState
    )

    # Recheck state after switching tab/program/etc (may have false positives but should be OK).
    $(window).on(
      visibilitychange: @checkApplyState
      focus: @checkApplyState
    )

  @checkApplyState: => requestAnimationFrame(@doCheckApplyState)

  @doCheckApplyState: =>
    return if document.hidden || @activeElement == document.activeElement
    @activeElement = document.activeElement

    if @activeElement? && @activeElement != document.body
      @$activeElement = $(@activeElement)
      @$activeElement.addClass(@mouseFocusedClass).one("blur", @removeState)

  @removeState: =>
    @$activeElement.removeClass(@mouseFocusedClass)
    @activeElement = @$activeElement = null

module.exports = FocusFix
