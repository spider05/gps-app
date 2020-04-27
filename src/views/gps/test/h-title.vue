<script>
export default {
  name: 'HTitle',
  props: {
    id: { type: Number, default: 1 }
  },
  data() {
    return {
      txtlists: ['一', '二', '三']
    }
  },
  render() {
    // jsx语法
    const htxt = `<h${this.id}>标题${this.txtlists[this.id - 1]}</h${this.id}>`
    return <div domPropsInnerHTML={htxt}></div>
  }
}

</script>
