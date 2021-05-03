<template>
  <el-button
    @click="actionFunc(count)"
    circle
    class="Content__Button"
    icon="el-icon-delete"
    size="mini"
    type="danger"
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
      required: false
    }
  },
};
</script>