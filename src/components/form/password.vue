<template>
  <el-form-item
    :label="$t('Password')"
    prop="password"
    :rules="passwordRule"
  >
    <el-input
      v-model="myForm.password"
      type="password"
      autocomplete="off"
      :placeholder="$t('Password')"
    />
  </el-form-item>
</template>

<script>
export default {
  props: {
    myForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      passwordRule: [
        { required: true, message: this.$t('You cannot use a blank password'), trigger: ['blur'] },
        { min: 6, message: this.$t('Too short'), trigger: ['blur'] }
      ]
    }
  }
}
</script>
