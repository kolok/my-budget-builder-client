<template>
  <el-button
    circle
    class="Content__Button"
    icon="el-icon-edit"
    size="mini"
    type="primary"
    @click="actionFunc"
  />
</template>

<script>
export default {
  props: {
    actionFunc: {
      type: Function,
      required: true,
    }
  },
}
</script>
