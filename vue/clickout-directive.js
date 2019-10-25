Vue.directive('click-out', {
  bind(el, binding, vnode) {
    binding.stop = e => e.stopPropagation()
    binding.event = () => vnode.context[binding.expression]()
​
    document.body.addEventListener('click', binding.event)
    el.addEventListener('click', binding.stop)
  },
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.event)
    el.removeEventListener('click', binding.stop)
  }
})
