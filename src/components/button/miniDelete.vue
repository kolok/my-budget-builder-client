<template>
  <el-button
    circle
    class="Content__Button"
    icon="el-icon-delete"
    size="mini"
    type="danger"
    @click="actionFunc(count)"
  />
</template>

<script>
export default {
  props: {
    actionFunc: {
      type: Function,
      required: true
    },
    count: {
      type: Number,
      required: false,
      default: 0
    }
  },
}
</script>
