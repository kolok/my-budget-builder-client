<template>
  <div class="Content__CardContainer">
    <el-card class="Content__Card">
      <div slot="header" class="Content__CardHeader">
        <span>Update Password</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="passwordForm"
          :model="passwordForm"
          @keyup.enter.native="submit('updatePassword')"
        >
          <password-form-item :myForm="passwordForm" />
          <retype-pwd-form-item :myForm="passwordForm" />
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="updatePassword('passwordForm')"
            >Change Password</el-button>
          </el-form-item>
        </el-form>
        <p>
          Don't have an account?
          <router-link to="/signup">Sign up</router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import passwordFormItem from "../../components/form/password.vue"
import retypePwdFormItem from "../../components/form/retypePwd.vue"
import AuthService from "../../api/auth.service"

export default {
  components: {
    passwordFormItem,
    retypePwdFormItem
  },
  data() {
    return {
      passwordForm: {
        password: ""
      }
    };
  },
  methods: {
    updatePassword: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          AuthService.updatePassword(
            { "password": this.passwordForm.password,
              "passwordToken": this.$route.query.token
            }
          )
            .then(response => {
              console.log("update password done", response)
              //this.$router.push("/logout")
            })
            .catch(err => {
              console.log("Oops ! something went wrong")
            });
        } else {
          console.log("error submit!!")
          return false;
        }
      });
    }
  }
};
</script>
