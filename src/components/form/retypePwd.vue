<template>
  <el-form-item
    :label="$t('Confirm Password')"
    prop="retypePwd"
    :rules="retypePwdRule"
  >
    <el-input
      v-model="myForm.retypePwd"
      type="password"
      autocomplete="off"
      :placeholder="$t('Type password again')"
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
      retypePwdRule: [
        {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error(this.$t('Please enter your password again')))
            } else if (value !== this.myForm.password) {
              callback(new Error(this.$t('The two input passwords do not match')))
            } else {
              callback()
            }
          },
          trigger: ['blur']
        }
      ]
    }
  }
}
</script>
