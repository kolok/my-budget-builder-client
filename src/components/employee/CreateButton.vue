<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="handleAddEmployee"
      >
        Create a new employee
      </el-button>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
      }
    },
    methods: {
      /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      handleAddEmployee: function() {
        this.$router.push('/employeeCreate')
      },
    }
  }
</script>
