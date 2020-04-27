<template>
  <div>
    <el-tree
      ref="tree"
      :data="getData"
      show-checkbox
      :default-expanded-keys="getDefaultKey"
      node-key="id"
      highlight-current
      :props="defaultProps"
      @node-click="getCurrentNode"
    />
  </div>
</template>

<script>
export default {
  props: {
    gpsTreeData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // treeData: [],
      // defaultExpKey:[],
      selectNode: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    getData() {
      const arr = this.gpsTreeData.filter(x => x.modeltype == 0)
      // console.log('computed:', arr)
      return this.gpsTreeData
    },
    getDefaultKey() {
      if (this.gpsTreeData && this.gpsTreeData.length > 0) {
        return [this.gpsTreeData[0].id]
      } else {
        return []
      }
    }
  },

  watch: {
    // gpsTreeData(){
    //   console.log('watch:');
    //   if(this.gpsTreeData&&this.gpsTreeData.length>0){
    //     this.defaultExpKey=[this.gpsTreeData[0].id];
    //   }
    //   this.treeData=this.gpsTreeData;
    // }
  },
  methods: {
    getCheckedNodes() {
      // console.log(this.$refs.tree.getCheckedNodes())
      return this.$refs.tree.getCheckedNodes()
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    getCurrentNode(p1, p2, p3) {
      if (p1) {
        this.selectNode = p1
      }
      // console.log("p1:",p1,"p2:",p2,"p3:",p3)
    }
  }

}
</script>

<style lang="scss">

</style>
