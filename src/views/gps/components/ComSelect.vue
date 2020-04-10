<template>
  <div>
    <el-select
      v-model="value"
      class="com-style"
      filterable
      placeholder="请选择"
      size="mini"
      width="60"
      @change="changeHandle"
    >
      <el-option
        v-for="item in getCom"
        :key="item.key"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button
      class="gps-button btn-style"
      size="mini"
      type="primary"
      @click="connect===false?openCOMHandle({portName:value}):closeCOMHandle()"
    >
      {{ connect===true?'关闭':'连接' }}</el-button>
    <!-- {{`com:${this.value}`}} -->

  </div>
</template>

<script>
import { GPSServer } from '../../../axios/axiosServer.js'

export default {
  data() {
    return {
      com: 'COM',
      value: ''

    }
  },
  computed: {
    getCom() {
      const arr = []
      for (let i = 1; i < 15; i++) {
        const com = {
          value: this.com + i,
          key: this.com + i,
          label: this.com + i
        }
        arr.push(com)
      }
      // console.log('getCom:',arr);
      return arr
    },
    connect() {
      return this.$store.state.gps.deviceInfo.connect
    }
  },
  methods: {
    openCOMHandle(values) {
      this.$emit('openCOM', values)
    },
    closeCOMHandle() {
      this.$store.dispatch('closeCOM')
    },
    changeHandle(e) {
      // console.log('changeHandle:',e)
    }

  }
}
</script>

<style lang="scss" scoped>
.com-style{
  /* width:90px; */
  width:120px;
  margin-left:10px;
}

.btn-style{
  margin-left: -6px;
  z-index: 0;
}
</style>
