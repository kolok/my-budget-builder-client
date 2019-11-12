<template>
  <div>
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="userRule"
      class="Dialog__Form"
      @keyup.enter.native="submitForm('employeeForm')"
    >
      <el-form-item prop="name" :label="$t('User')">
        <el-input v-model="userForm.name" autocomplete="off" />
      </el-form-item>

      <el-form-item prop="email" :label="$t('Email')">
        <el-input v-model="userForm.email" autocomplete="off" />
      </el-form-item>

      <el-form-item prop="defaultLanguage" :label="$t('Language')">
        <el-select v-model="userForm.defaultLanguage" placeholder="Select a defaultLanguage">
          <el-option
            v-for="language in ['en','fr']"
            :key="language"
            :label="language"
            :value="language"
          />
        </el-select>
      </el-form-item>

      <el-radio-group :value="userForm.role" @input="changeRole" :label="$t('Role')">
        <el-radio label="client_admin">Admin</el-radio>
        <el-radio label="client_user">User</el-radio>
      </el-radio-group>

    </el-form>
    <span slot="footer">
      <el-button v-if="isCancelable" @click="handleCancel('userForm')">{{ $t('Cancel') }}</el-button>
      <el-button type="primary" @click="submitForm('userForm')">{{ $t('Save') }}</el-button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    userForm: {
      type: Object,
      required: true
    },
    isCancelable: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    changeRole(data) {
      this.userForm.role = data;
    },
    submitForm: function(formName) {
    // Create user
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submitForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel: function() {
      this.$emit("cancel");
    }
  }
};
</script>
