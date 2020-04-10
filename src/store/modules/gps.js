import { Message } from 'element-ui'
import { GPSServer } from '../../axios/axiosServer'

const gps = {
  state: {
    msg: '',
    gpsTreeData: [],
    checkedItems: [],
    monitor: false,
    deviceInfo: { connect: false }
  },
  mutations: {
    SET_MSG: (state, msg) => {
      state.msg = msg
    },
    SET_GPSTREEDATA: (state, gpstreedata) => {
      state.gpsTreeData = gpstreedata
    },
    SET_CHECKEDITEMS: (state, checkedItems) => {
      state.checkedItems = checkedItems
    },
    SET_MONITOR: (state, monitor) => {
      state.monitor = monitor
    },
    SET_DEVICEINFO: (state, deviceinfo) => {
      state.deviceInfo = { ...state.deviceInfo, ...deviceinfo }
    },
    SET_CONNECT: (state, connect) => {
      state.deviceInfo = { ...state.deviceInfo, ...connect }
    }
  },
  actions: {
    getGPSTreeData({ commit }, values) {
      GPSServer.getOrgTreeByOrgID(values).then((data) => {
        if (data && data.data && data.success) {
          const arr = data.data
          console.log('arr:', arr)
          commit('SET_GPSTREEDATA', arr)
        }
      }
      )
    },
    openCOM({ commit }, values) {
      if (!values) {
        this.errMsg('请选择串口')
      } else {
        GPSServer.openUart(values).then(data => {
          if (data && data.success) {
            commit('SET_CONNECT', ({ connect: true }))
          } else {
            // this.errMsg(data.msg)
          }
        })
      }
    },
    getCheckedItems({ commit }, cks) {
      commit('SET_CHECKEDITEMS', cks)
    },
    closeCOM({ commit }) {
      GPSServer.closeUart().then(data => {
        if (data && data.success) {
          commit('SET_CONNECT', ({ connect: false }))
        } else {
          // this.errMsg(data.msg)
        }
      })
    },
    setDeviceInfo({ commit }, icInfo) {
      if (icInfo) {
        console.log('icinfo:', icInfo)
        commit('SET_DEVICEINFO', { ...icInfo })
      }
    }

  },
  errMsg: (msg) => {
    if (msg) {
      Message({
        message: msg,
        type: 'error',
        duration: 3 * 1000
      })
    }
  }
}

export default gps
