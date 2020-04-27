<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="名称" style="width:200px" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">查询</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-setting">重置</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit">添加</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-refresh">刷新</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"

      size="medium"
      :header-row-style="{height:'25px',background:'#F3F4F7',color:'#555'}"
      :header-cell-style="{padding:'3px 0',background:'#F3F4F7'}"
      :row-style="{height:'10px'}"
      :cell-style="{padding:'5px 0'}"
      border
      fit
      stripe
      highlight-current-row
      style="width:100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" prop="organize_id" sortable align="center" width="180" />
      <el-table-column label="名称" prop="organize_name" align="center" min-width="250" />
      <el-table-column label="上级" prop="parentname" align="center" width="250" />

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pagination.current" :limit.sync="pagination.pageSize" @pagination="getDataList" />
  </div>
</template>

<script>
import { GPSServer } from '../../axios/axiosServer.js'
import pagination from '../../components/Pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      tableData:[],
      pagination:{
        current: 1,
        pageSize: 10,
        showTotal: (total, range) => `总数:${total} 当前:${range[0]}-${range[1]}`
      },
      sorter: { field: 'organize_id', order: 'asc' },
      loading: false,
      total: 0,
      queryParam: { condition: 'organize_name', keyword: '' },
      visible: false,
      selectedRowKeys: [],
      menuName: ''
    }
  },
  mounted() {
    this.getDataList()
  },

  methods:{
    getDataList(aaa){
      const params = {
        PageIndex: this.pagination.current,
        PageRows: this.pagination.pageSize,
        SortField: this.sorter.field || 'Id',
        SortType: this.sorter.order,
        ...this.queryParam
      }
      GPSServer.getOrganizeDataList(params).then(data => {
        this.loading = false
        // console.log("data:",!!data.data2)
        // console.log("data:",data.data)
        this.total = data.total
        this.tableData = data.data
      })
    }
  }

}
</script>

<style lang="scss">

.app-container {
  padding: 20px;
}

.filter-container {
  padding-bottom: 10px;
}
.filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
</style>
