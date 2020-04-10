<template>
  <div>
    <el-form label-width="80px" label-position="left">
      <el-form-item label="卡号">
        <el-input :value="`${ics.title}(${ics.key})`" placeholder="请输入卡号!" />
      </el-form-item>
      <el-form-item label="信息">
        <el-input
          v-model="msg"
          :autosize="{ minRows: 5, maxRows: 8}"
          type="textarea"
          placeholder="请输入信息!"
        />
      </el-form-item>
    </el-form>
    <div style="text-align:right;">
      <el-button type="danger" @click="showMsgForm">取消</el-button>
      <el-button type="primary" @click="sendMsg">确定</el-button>
    </div>
  </div>
</template>

<script>
import { GPSServer } from '../../../axios/axiosServer.js'
export default {
// props: ['defaultid'],
  props: {
    defaultNode: {
      type: [Object, Number, String],
      required: false,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      ics: { key: 456514, title: 456514 },
      msg: ''
    }
  },
  watch: {
    defaultNode(newValue, preValue) {
      if (newValue) {
      // console.log(newValue)
        this.ics = { key: newValue.key, title: newValue.title }
      }
    }
  },
  methods: {
    showMsgForm() {
      this.$emit('showmsgform', false)
    },
    sendMsg() {
      const values = { fromICID: 456514, toICID: this.ics.key, msg: this.msg }
      GPSServer.sendMsg(values).then((data) => {
        console.log(data)
      })
    }
  }

}
</script>
