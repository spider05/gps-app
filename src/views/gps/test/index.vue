<template>
  <div class="p-home">
    <childone>
      壹号按钮
    </childone>
    <!-- 添加点击事件 -->
    <childtwo @click="handleClick">二号按钮</childtwo>
    <hTitle v-for="item of [1,2,3]" :id="item" :key="item" />
  </div>
</template>
<script>
import childone from './childone.vue'
import childtwo from './childtwo.js'
import hTitle from './h-title.vue'
export default {
  name: 'Home',
  components: {
    childone, childtwo, hTitle
  },
  methods: {
    handleClick() {
      alert('你点击了二号按钮')
    }
  }
}
</script>

