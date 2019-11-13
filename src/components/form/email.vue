<template>
  <el-form-item prop="email" label="Email" :rules="emailRule">
    <el-input v-model="myForm.email" placeholder="email" />
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
      emailRule: [
        { required: true, message: "Email is required", trigger: "blur" },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"]
        }
      ]
    };
  }
};
</script>
