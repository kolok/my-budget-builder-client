<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Google Chart" name="google"></el-tab-pane>
    <el-tab-pane label="ApexChart" name="apex"></el-tab-pane>
    <el-tab-pane label="EChart" name="echarts"></el-tab-pane>
    <el-tab-pane label="D3.js" name="d3"></el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    props: {
      activeName: {
        type: String,
        required: true
      },

    },
    methods: {
      handleClick(tab, event) {
        if (this.activeName === 'google') {
          this.$router.push('/teamDashboard')
        }
        if (this.activeName === 'apex') {
          this.$router.push('/teamDashboard2')
        }
        if (this.activeName === 'echarts') {
          this.$router.push('/teamDashboard3')
        }
        if (this.activeName === 'd3') {
          this.$router.push('/teamDashboard4')
        }
      }
    }
  }
</script>
