// 函数式组件 2 childtwo.js  接收子集 children
export default {
  name: 'childtwo',
  functional: true,
  render(h, { props, listeners, children }) {
    return h('button', {
      attrs: props,
      on: {
        click: listeners.click
      }
    }, children)
  }
}
