<template>
  <div id="gps-app">
    <div id="gps-left" :class="[isActive]">
      <div id="gps-tree">
        <device-tree ref="dvTree" :gps-tree-data="this.$store.state.gps.gpsTreeData" />
      </div>
      <div id="gps-oper">
        <com-select @openCOM="openCOM" />
        <el-button class="first-button gps-button" size="mini" type="primary" @click="handleMonitor">
          {{ this.$store.state.gps.checkedItems.length > 0?"停止监控":"开始监控" }}
        </el-button>
        <el-button class="gps-button" size="mini" type="primary" @click="handleRefresh">刷新终端</el-button>
        <el-button class="gps-button" :disabled="!connect" size="mini" type="primary">IC卡信息</el-button>
        <el-button class="gps-button" :disabled="!connect" size="mini" type="primary" @click="sendDWSQ({bdUser:456514,type:0,freq:0})">定位申请</el-button>
        <!-- <el-button class="gps-button" :disabled="!connect" size="mini" type="primary" @click="sendDWSQ({bdUser:456514,type:2,freq:6})">连续定位</el-button>
        <el-button class="gps-button" :disabled="!connect" size="mini" type="primary" @click="sendDWSQ({bdUser:456514,type:1,freq:0})">紧急定位</el-button> -->
        <el-button class="gps-button" :disabled="!connect" size="mini" type="primary" @click="handleShowMsgForm(true)">发送短信</el-button>
        <el-button class="gps-button" :disabled="!connect" size="mini" type="primary" @click="sendWZBG">位置报告</el-button>
      </div>
    </div>
    <div id="gps-map">
      <cesium-map />
    </div>

    <div id="gps-bottom">
      <GPSInfo ref="gpsInfoComp" :monitor-data="monitorData" />
    </div>

    <el-dialog width="510px" :visible.sync="dialogVisible" title="发送报文">
      <message-form :default-node="this.$refs.dvTree?this.$refs.dvTree.selectNode:null" @showmsgform="handleShowMsgForm" />
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import * as signalR from '@microsoft/signalr'
import CesiumMap from '../map/index'
import DeviceTree from './components/DeviceTree'
import ComSelect from './components/ComSelect'
import MessageForm from './components/MessageForm'
import GPSInfo from './components/GPSInfo'
import { GPSServer } from '../../axios/axiosServer.js'
import './gpsStyle.scss'

const rootOrgID = { orgID: 1 }// 跟目录ID
export default {
  components: { CesiumMap, DeviceTree, ComSelect, MessageForm, GPSInfo },
  data() {
    return {
      isActive: 'aaaa',
      dialogVisible: false,
      checkedItems: this.$store.state.gps.checkedItems || [], // 树选中的节点
      monitorData: [], // 根据选中的树节点，帅选监控的终端设备
      testData: '000'
    }
  },
  computed: {
    connect() {
      return this.$store.state.gps.deviceInfo.connect
    }
  },
  mounted() {
    // this.getDeviceData()
    this.$store.dispatch('getGPSTreeData', rootOrgID)
    this.OpenSignalR()
  },
  methods: {
    OpenSignalR() {
      const hubUrl = 'http://localhost:5000/chatHub'
      // .net core 版本中默认不会自动重连，需手动调用 withAutomaticReconnect
      const connection = new signalR.HubConnectionBuilder().withAutomaticReconnect().withUrl(hubUrl).build()

      if (connection.state === signalR.HubConnectionState.Disconnected) {
        connection.start().then(function() {
          console.log('connection33333:', connection)
        }).catch(function(err) {
          return console.log('err66:', err)
        })

        connection.onclose((err) => {
          console.log('通信关闭:', err)
          this.$store.commit('SET_CONNECT', { connect: false })
        })

        connection.on('ReceiveMessage', function(user, message) {
          console.log('ReceiveMessage:', user, message)
        })

        connection.on('BDReceive', function(user, header, message) {
          console.log('BDReceive:', user, header, message)
        })
      }
    },
    getDeviceData() {
      GPSServer.getOrgTreeByOrgID(rootOrgID).then((data) => {
        console.log('data:', data)
        if (data && data.data && data.success) {
          const arr = data.data
          this.gpsTreeData = arr
          console.log('arr:', this.gpsTreeData)
        }
      }
      )
    },
    handleRefresh() {
      this.$store.dispatch('getGPSTreeData', rootOrgID)
    },
    handleMonitor(e) {
      const text = e.target.innerText
      if (text === '开始监控') {
        const chks = this.$refs.dvTree.getCheckedNodes()
        //  console.log(chks)
        if (chks.length < 1) {
          Message({
            message: '请选中需要监控的对象',
            type: 'warning',
            duration: 3 * 1000
          })
        } else {
          // 放全局变量里
          this.$store.dispatch('getCheckedItems', chks)
          // 获取选中的终端
          const arr = this.getCheckedTermianls(chks)
          // console.log("arr",arr);
          this.monitorData = arr
          // 定时器
          this.$refs.gpsInfoComp.operatorInterval(true)
        }
      } else {
        // 关闭定时器
        this.$refs.gpsInfoComp.operatorInterval(false)
        this.monitorData = []
        this.$store.dispatch('getCheckedItems', [])
      }
    },
    /** 获取选中的终端 */
    getCheckedTermianls(chks) {
      let n = 0
      const arr = chks.filter(x => x.modeltype === 1).map(item => {
        n++
        const tempItem = { key: item.key, sn: n, status: 0, vid: item.key, terminal_no: item.title,
          orientation_time: '', longitude: 0, latitude: 0, direction: 0, speed: 0, current_location: '' }
        return tempItem
      })
      return arr
    },

    openCOM(values) {
      if (!values || values.portName === '') {
        Message({
          message: '请选择串口',
          type: 'error',
          duration: 3 * 1000
        })
      } else {
        this.$store.dispatch('openCOM', values)
      }
    },
    sendDWSQ(values) {
      GPSServer.sendDWSQ(values).then((data) => {
        // console.log('data:', data)
        if (data && data.data && data.success) {
        }
      }
      )
    },
    sendWZBG(values) {
      // 112.288584
      values = { fromUser: 456514, toUser: 456514, x: 112.456514, y: 23.456514 }
      GPSServer.sendWZBG(values).then((data) => {
        // console.log('data:', data)
        if (data && data.data && data.success) {
        }
      }
      )
    },
    handleShowMsgForm(flag) {
      this.dialogVisible = flag
    },
    test() {
    }

  }

}
</script>

<style lang="scss">
#gps-left{
  border:solid 1px #0000FF;
  position: absolute;
   width: 220px;
   height: 100%;
}

#gps-tree{
    overflow-y: auto;
    height: calc(100vh - 280px);
}

#gps-oper{
    overflow-y: auto;
    margin:10px 15px;
}

.gps-button{
        /* margin-right: 5px; */
        margin-top: 8px;
    }

.first-button{
  margin-left:10px;
}

#gps-map{
    border:solid 1px red;
    position: absolute;
    left: 220px;
    height: calc(100% - 220px);
    width:100%;
}

#gps-bottom{
  border:solid 1px rgb(16, 230, 80);
  position:absolute;
  bottom:1px;
  left: 220px;
  overflow-y: auto;
  width:100%;
  height: 220px;
}

</style>
