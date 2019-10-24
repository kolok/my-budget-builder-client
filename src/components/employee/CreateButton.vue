<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="handleAddEmployee"
      >
        {{ $t('Create a new employee') }}
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
    handleAddEmployee: function() {
      this.$router.push('/employeeCreate')
    },
  }
}
</script>
