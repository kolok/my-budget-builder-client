<template>
  <el-button
    @click="actionFunc"
    icon="el-icon-circle-plus-outline"
    style="font-size:30px;"
    type="text"
  />
</template>

<script>
export default {
  props: {
    actionFunc: {
      type: Function,
      required: true
    }
  }
};
</script>