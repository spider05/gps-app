<template>
  <div>
    <el-table
      :data="monitorData"
      height="200"
      border
      fit
      stripe
      highlight-current-row
      style="width:calc(100% - 220px)"
    >
      <el-table-column label="序号" prop="sn" align="center" width="70" />
      <el-table-column label="状态" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status===0?"不在线":"在线" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终端名称" align="center" width="120">
        <template slot-scope="scope">
          <a style="color:rgb(50, 6, 247)">{{ scope.row.terminal_no }}</a>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="orientation_time" align="center" width="180" />
      <el-table-column label="经度" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.longitude.toFixed(6) }}
        </template>
      </el-table-column>
      <el-table-column label="纬度" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.latitude.toFixed(6) }}
        </template>
      </el-table-column>
      <el-table-column label="方向" prop="direction" align="center" width="80" />
      <el-table-column label="速度" prop="speed" align="center" width="80" />
      <el-table-column label="位置" prop="current_location" align="center" />
    </el-table>
  </div>

</template>

<script>
const data = [
  { key: 1, sn: 1, status: '不在线', vid: 5656845125, terminal_no: '设顶顶顶顶顶',
    orientation_time: '', longitude: 0, latitude: 0, direction: 0,
    speed: 0, current_location: '' },
  { key: 2, sn: 2, status: '不在线', vid: 2, terminal_no: '设备2',
    orientation_time: '', longitude: 0, latitude: 0, direction: 0,
    speed: 0, current_location: '' },
  { key: 3, sn: 3, status: '不在线', vid: 3, terminal_no: '设备3',
    orientation_time: '', longitude: 0, latitude: 0, direction: 0,
    speed: 0, current_location: '' },
  { key: 4, sn: 4, status: '不在线', vid: 5656845125, terminal_no: '设备4',
    orientation_time: '', longitude: 0, latitude: 0, direction: 0,
    speed: 0, current_location: '' },
  { key: 5, sn: 5, status: '不在线', vid: 2, terminal_no: '设备5',
    orientation_time: '', longitude: 0, latitude: 0, direction: 0,
    speed: 0, current_location: '' },
  { key: 6, sn: 6, status: '不在线', vid: 3, terminal_no: '设备6',
    orientation_time: '', longitude: 0, latitude: 0, direction: 0,
    speed: 0, current_location: '' }

]

const data2 = [{
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-08',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-06',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-07',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}]

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
      interval: 0

    }
  },
  watch: {
    monitorData(newValue, preValue) {
      return newValue
    }
  },
  methods: {
    // 定时器开关
    operatorInterval(flag) {
      if (flag) {

        // this.interval= setInterval(this.handleGetGPSData,spanTime);
      } else {
        clearInterval(this.interval)
        // 清空表格数据
        // this.monitorData=[];
      }
    }
  }

}
</script>
