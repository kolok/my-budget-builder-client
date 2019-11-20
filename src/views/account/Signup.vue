<template>
  <div class="Content__CardContainer">
    <el-card class="Content__Card">
      <div slot="header" class="Content__CardHeader">
        <span>{{ $t('Sign up') }}</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="signupForm"
          :model="signupForm"
          :rules="ruleSignup"
          @keyup.enter.native="submit('signupForm')"
        >
          <el-form-item prop="companyname" :label="$t('Company name')">
            <el-input
              v-model="signupForm.companyname"
              :placeholder="$t('Company name')"
              @input="updateSubDomain"
            />
          </el-form-item>
          <el-form-item prop="subdomain" :label="$t('Subdomain')">
            <el-input
              v-model="signupForm.subdomain"
              :placeholder="$t('Subdomain')"
            >
              <template slot="append">.pipauls.com</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="name" :label="$t('Name')">
            <el-input v-model="signupForm.name" :placeholder="$t('Name')" />
          </el-form-item>
          <email-form-item :myForm="signupForm" />
          <password-form-item :myForm="signupForm"/>
          <retype-pwd-form-item :myForm="signupForm"/>
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('signupForm')"
            >{{ $t('Sign up') }}</el-button>
          </el-form-item>
        </el-form>
        <p>
          {{ $t('Already have an account?') }}
          <router-link to="/login">{{ $t('Login') }}</router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EmailFormItem from "../../components/form/email.vue"
import PasswordFormItem from "../../components/form/password.vue"
import RetypePwdFormItem from "../../components/form/retypePwd.vue"
import { i18n } from '../../i18n'

export default {
  components: {
    EmailFormItem,
    PasswordFormItem,
    RetypePwdFormItem
  },
  data() {
    return {
      signupForm: {
        companyname: "",
        subdomain: "",
        name: "",
        email: "",
        password: "",
        retypePwd: ""
      },
      ruleSignup: {
        companyname: [
          { required: true, message: this.$t("Company name can't be blank") },
          { max: 25, message: this.$t("Too long") },
          { min: 3, message: this.$t("Too short") }
        ],
        name: [
          { required: true, message: this.$t("Name can't be blank") },
          { max: 255, message: this.$t("Too long") }
        ],
        subdomain: [
          { required: true, message: this.$t("Subdomain can't be blank") },
          { max: 25, message: this.$t("Too long") },
          { min: 3, message: this.$t("Too short") },
          {
            validator: (rule, value, callback) => {
              if (value.match(/[^a-z]/) !== null) {
                callback(
                  new Error(
                    "subdomain should contain only lower case ascii characters"
                  )
                );
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["signup"]),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    submit: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signupForm.defaultLanguage = i18n.locale
          this.signup(this.signupForm)
            .then(() => {
              this.$cs({
                h: this.$createElement,
                title: this.$t('Log on'),
                message: this.$t("Your user {name} was created", {name: this.signupForm.name}),
                type: "success"
              });
              this.$router.push("/hiringPlan");
            })
            .catch(err => {
              console.log('error', err)
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateSubDomain: function() {
      this.signupForm.subdomain = this.signupForm.companyname
        .toLowerCase()
        .replace(/[^a-z]/g, "");
    }
  }
};
</script>
