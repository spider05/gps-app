<template>
  <div>
    <el-table
      :data="tableData"
      height="218"
      size="medium"
      :header-row-style="{height:'25px',background:'#F3F4F7',color:'#555'}"
      :header-cell-style="{padding:'3px 0',background:'#F3F4F7'}"
      :row-style="{height:'10px'}"
      :cell-style="{padding:'5px 0'}"
      border
      fit
      stripe
      highlight-current-row
      style="width:calc(100% - 220px)"
    >
      <el-table-column label="序号" prop="sn" sortable align="left" width="75" />
      <el-table-column label="状态" prop="status" sortable align="left" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.status===0?"不在线":"在线" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终端名称" align="left" width="120">
        <template slot-scope="scope">
          <a style="color:rgb(50, 6, 247)">{{ scope.row.terminal_no }}</a>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="orientation_time" sortable align="left" width="180" />
      <el-table-column label="经度" align="left" width="100">
        <template slot-scope="scope">
          {{ scope.row.longitude.toFixed(6) }}
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="left" width="100">
        <template slot-scope="scope">
          {{ scope.row.latitude.toFixed(6) }}
        </template>
      </el-table-column>
      <el-table-column label="方向" prop="direction" align="left" width="80" />
      <el-table-column label="速度" prop="speed" align="left" width="80" />
      <el-table-column label="位置" prop="current_location" align="left" />
    </el-table>
  </div>

</template>

<script>
import { GPSServer } from '../../../axios/axiosServer.js'

const spanTime = 3000
export default {
  props: {
    monitorData: {
      type: Array,
      required: true,
      default() {
        return data
      }
    }
  },
  data() {
    return {
      interval: 0,
      tableData: this.monitorData || []

    }
  },
  watch: {
    monitorData(newValue, preValue) {
      this.tableData = newValue
      return newValue
    }
  },
  methods: {
    handleGetGPSData() {
      const mData = this.monitorData
      if (mData) {
        const arr = mData.map(item => {
          return item.vid
        })
        // if(this.n>2)return
        const values = arr
        // 后台获取数据
        GPSServer.getDynamicGPSByIDS({ ids: JSON.stringify(values) }).then((data) => {
          this.n++
          if (data && data.data && data.success) {
            const arr = data.data
            const tData = this.monitorData
            if (tData) {
              const tempArr = tData.map(item => {
                const findItem = arr.find(x => x.vid === item.vid)
                if (findItem) {
                // 计算是否在线
                  const strNowTime = findItem.nowtime// 服务端现在时间
                  const strGPSTime = findItem.orientation_time
                  const status = this.compareTime(strGPSTime, strNowTime)
                  const key = findItem.key
                  const terminal_no = findItem.terminal_no
                  const longitude = findItem.longitude
                  const latitude = findItem.latitude
                  // GPSMap.updateOrCreateEntity(key,terminal_no,longitude,latitude)
                  return { ...item, ...findItem, status }
                }
                return item
              })
              this.tableData = tempArr
            }
          }
        }
        )
      }
    },
    /** 时间比较 */
    compareTime(strGPSTime, strNowTime) {
      if (!strGPSTime || !strNowTime) {
        return 0
      } else {
        const gpsTime = this.stringToDate(strGPSTime)
        const nowTime = this.stringToDate(strNowTime)
        const milliS = nowTime.getTime() - gpsTime.getTime()
        const h = milliS / (1000 * 60 * 60)// 转化为小时
        if (h > 0.5) {
          return 0// 超过半个小时的离线
        } else {
          return 1
        }
      }
    },
    /* 'yyyy-MM-dd HH:mm:ss'格式的字符串转日期*/
    stringToDate(str) {
      const tempStrs = str.split(' ')
      const dateStrs = tempStrs[0].split('-')
      const year = parseInt(dateStrs[0], 10)
      const month = parseInt(dateStrs[1], 10) - 1
      const day = parseInt(dateStrs[2], 10)
      const timeStrs = tempStrs[1].split(':')
      const hour = parseInt(timeStrs[0], 10)
      const minute = parseInt(timeStrs[1], 10)
      const second = parseInt(timeStrs[2], 10)
      const date = new Date(year, month, day, hour, minute, second)
      return date
    },
    // 定时器开关
    operatorInterval(flag) {
      if (flag) {
        this.interval = setInterval(this.handleGetGPSData, spanTime)
      } else {
        clearInterval(this.interval)
        // 清空表格数据
        this.tableData = []
      }
    }
  }

}
</script>
