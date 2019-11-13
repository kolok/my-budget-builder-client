<template>
  <div class="Content__CardContainer">
    <el-card
      class="Content__Card"
    >
      <div
        slot="header"
        class="Content__CardHeader"
      >
        <span>Forgot Password</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="forgotPasswordForm"
          :model="forgotPasswordForm"
          @keyup.enter.native="submit('forgotPasswordForm')"
        >
          <email-form-item :myForm="forgotPasswordForm" />
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('forgotPasswordForm')"
            >
              Submit
            </el-button>
          </el-form-item>
        </el-form>
        <p>
          Don't have an account?
          <router-link to="/signup">
            Sign up
          </router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import emailFormItem from "../../components/form/email.vue"
import AuthService from '../../api/auth.service'

export default {
  components: {
    emailFormItem
  },
  data() {
    return {
      forgotPasswordForm: {
        email: ''
      }
    }
  },
  methods: {
    ...mapActions(['forgotPassword']),

    submit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          AuthService.updatePasswordRequest({ email: this.forgotPasswordForm.email })
            .then( () => {
              console.log("update password email sent")
            })
            .catch( err => {
              console.log("Oops ! something went wrong")
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
