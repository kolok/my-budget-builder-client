<template>
  <div class="Content__CardContainer">
    <el-card class="Content__Card">
      <div
        slot="header"
        class="Content__CardHeader"
      >
        <span>{{ $t('Update Password') }}</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="passwordForm"
          :model="passwordForm"
          @keyup.enter.native="submit('updatePassword')"
        >
          <password-form-item :my-form="passwordForm" />
          <retype-pwd-form-item :my-form="passwordForm" />
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="updatePassword('passwordForm')"
            >
              {{ $t('Change Password') }}
            </el-button>
          </el-form-item>
        </el-form>
        <p>
          {{ $t("Don't have an account?") }}
          <router-link to="/signup">
            {{ $t("Sign up") }}
          </router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import AuthService from '../../api/auth.service'
import passwordFormItem from '../../components/form/password.vue'
import retypePwdFormItem from '../../components/form/retypePwd.vue'

export default {
  components: {
    passwordFormItem,
    retypePwdFormItem
  },
  data() {
    return {
      passwordForm: {
        password: ''
      }
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    updatePassword: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          AuthService.updatePassword({
            password: this.passwordForm.password,
            passwordToken: this.$route.query.token
          })
            .then( () => {
              this.$cs({
                title: this.$t('Update Password'),
                h: this.$createElement,
                message: this.$t('Your password was updated'),
                type: 'success'
              })
              this.logout()
            })
            .catch( () => {
              this.$cs({
                title: this.$t('Update Password'),
                h: this.$createElement,
                message: this.$t('Oops ! Something went wrong'),
                type: 'error'
              })
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
