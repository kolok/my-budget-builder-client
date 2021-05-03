<template>
  <el-form-item
    prop="email"
    :label="emailLabel"
    :rules="emailRule"
  >
    <el-input
      v-model="myForm.email"
      placeholder="email"
    />
  </el-form-item>
</template>

<script>
export default {
  props: {
    myForm: {
      type: Object,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      emailRule: [
        { required: this.required, message: this.$t('Email is required'), trigger: 'blur' },
        {
          type: 'email',
          message: this.$t('Please input correct email address'),
          trigger: ['blur']
        }
      ]
    }
  },
  computed: {
    emailLabel: function() {
      return this.$t('Email') + ' ' + (this.required ? '' : this.$t('(Optional)'))
    }
  }
}
</script>
