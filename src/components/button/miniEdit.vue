<template>
  <el-button
    @click="actionFunc"
    circle
    class="Content__Button"
    icon="el-icon-edit"
    size="mini"
    type="primary"
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
};
</script>