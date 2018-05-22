sectionReady = ({$node, returnInstances = false}) ->
  instances = [] if returnInstances

  for component in sectionReady.components
    for element in $node[0].getElementsByClassName(component.class)
      instance = new component.Component($(element))
      instances.push(instance) if returnInstances

  instances

sectionReady.components = []

sectionReady.addComponents = (components) ->
  sectionReady.components = sectionReady.components.concat(components)

sectionReady.destroy = (instances) ->
  for instance, i in instances
    instance.destroy() if typeof instance.destroy == "function"
    instances[i] = null

  instances = null

module.exports = sectionReady
