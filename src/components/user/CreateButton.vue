<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="handleAddUser"
      >
        Create a new user
      </el-button>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleAddUser: function() {
      this.$router.push('/userCreate')
    },
  }
}
</script>
