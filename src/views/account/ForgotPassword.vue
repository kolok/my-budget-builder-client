<template>
  <div class="Content__CardContainer">
    <el-card
      class="Content__Card"
    >
      <div
        slot="header"
        class="Content__CardHeader"
      >
        <span>{{ $t('Forgot Password') }}</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="forgotPasswordForm"
          :model="forgotPasswordForm"
          @keyup.enter.native="submit('forgotPasswordForm')"
        >
          <email-form-item :my-form="forgotPasswordForm" />
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('forgotPasswordForm')"
            >
              {{ $t('Submit') }}
            </el-button>
          </el-form-item>
        </el-form>
        <p>
          {{ $t("Don't have an account?") }}
          <router-link to="/signup">
            {{ $t('Sign up') }}
          </router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AuthService from '../../api/auth.service'
import emailFormItem from '../../components/form/email.vue'

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
              this.$cs({
                title: this.$t('Update password request'),
                h: this.$createElement,
                message: this.$t('An email to reset your password was sent'),
                type: 'success'
              })
              this.$router.push('/login')
            })
            .catch( () => {
              this.$cs({
                title: this.$t('Update password request'),
                h: this.$createElement,
                message: this.$t('Oops ! Something went wrong'),
                type: 'error'
              })
              console.log('Oops ! Something went wrong')
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
