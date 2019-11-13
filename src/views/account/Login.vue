<template>
  <div class="Content__CardContainer">
    <el-card
      class="Content__Card"
    >
      <div
        slot="header"
        class="Content__CardHeader"
      >
        <span>Login</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="loginForm"
          :model="loginForm"
          @keyup.enter.native="submit('loginForm')"
        >
          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              { required: true, message: 'Email is required', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input
              v-model="loginForm.email"
              placeholder="email"
            />
          </el-form-item>
          <password-form-item :myForm="loginForm" />
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('loginForm')"
            >
              Submit
            </el-button>
          </el-form-item>
        </el-form>
        <p>
          <router-link to="/forgotPassword">
            Forgot your password ?
          </router-link>
        </p>
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
import passwordFormItem from "../../components/form/password.vue"

export default {
  components: {
    passwordFormItem
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.loginForm)
            .then(() => {
              this.$router.push('/hiringPlan')
            })
            .catch(err => {
              console.log(err)
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
