<template>
  <div>
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="userRule"
      label-width="250px"
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

      <el-form-item prop="role">
        <el-switch v-model="isAdmin" active-text="Admin" inactive-text="User" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleCancel('userForm')">{{ $t('Cancel') }}</el-button>
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
    isAdmin: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    submitForm: function(formName) {
      // Create user
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdmin) {
            this.userForm.userCompanies[0].role = "client_admin";
            this.userForm.role = "client_admin";
          } else {
            this.userForm.userCompanies[0].role = "client_user";
            this.userForm.role = "client_user";
          }

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
