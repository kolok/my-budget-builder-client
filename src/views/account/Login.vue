<template>
  <div class="Content__CardContainer">
    <el-card class="Content__Card">
      <div
        slot="header"
        class="Content__CardHeader"
      >
        <span>{{ $t('Login') }}</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="loginForm"
          :model="loginForm"
          @keyup.enter.native="submit('loginForm')"
        >
          <email-form-item :my-form="loginForm" />
          <password-form-item :my-form="loginForm" />
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('loginForm')"
            >
              {{ $t('Submit') }}
            </el-button>
          </el-form-item>
        </el-form>
        <p>
          <router-link to="/forgotPassword">
            {{ $t('Forgot Password') }}
          </router-link>
        </p>
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
import EmailFormItem from '../../components/form/email.vue'
import PasswordFormItem from '../../components/form/password.vue'

export default {
  components: {
    EmailFormItem,
    PasswordFormItem
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    submit: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(this.loginForm)
            .then(data => {
              this.$cs({
                title: this.$t('Login success'),
                h: this.$createElement,
                message: this.$t('Welcome {name}', {name: data.user.name}),
                type: 'success'
              })
              this.$router.push('/hiringPlan')
            })
            .catch( () => {
              this.$cs({
                title: this.$t('Login failed'),
                h: this.$createElement,
                message: this.$t('Invalid login or password.'),
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
