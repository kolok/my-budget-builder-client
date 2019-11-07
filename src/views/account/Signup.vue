<template>
  <div class="Content__CardContainer">
    <el-card class="Content__Card">
      <div slot="header" class="Content__CardHeader">
        <span>Sign up</span>
      </div>
      <div class="Content__CardFormContainer">
        <el-form
          ref="signupForm"
          :model="signupForm"
          :rules="ruleSignup"
          @keyup.enter.native="submit('signupForm')"
        >
          <el-form-item prop="companyname" label="Company name">
            <el-input
              v-model="signupForm.companyname"
              placeholder="Company name"
              @input="updateSubDomain"
            />
          </el-form-item>
          <el-form-item prop="subdomain" label="Pipauls sub-domain">
            <el-input
              v-model="signupForm.subdomain"
              placeholder="subdomain"
              class="Content__CardInput--Shorter"
            />
            <span class="Content__CardText--Suffix">.pipauls.com</span>
          </el-form-item>
          <el-form-item prop="name" label="Name">
            <el-input v-model="signupForm.name" placeholder="Name" />
          </el-form-item>
          <el-form-item prop="email" label="Email">
            <el-input v-model="signupForm.email" placeholder="email" />
          </el-form-item>
          <password-form-item :myForm="signupForm"/>
          <retype-pwd-form-item :myForm="signupForm"/>
          <el-form-item>
            <el-button
              type="primary"
              class="Content__CardButton--Large"
              @click="submit('signupForm')"
            >Sign me up</el-button>
          </el-form-item>
        </el-form>
        <p>
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import passwordFormItem from "../../components/form/password.vue"
import retypePwdFormItem from "../../components/form/retypePwd.vue"

export default {
  components: {
    passwordFormItem,
    retypePwdFormItem
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
          { required: true, message: "Company name can't be blank" },
          { max: 25, message: "Too long" },
          { min: 3, message: "Too short" }
        ],
        name: [
          { required: true, message: "Name can't be blank" },
          { max: 255, message: "Too long" }
        ],
        subdomain: [
          { required: true, message: "Subdomain can't be blank" },
          { max: 25, message: "Too long" },
          { min: 3, message: "Too short" },
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
        ],
        email: [
          { required: true, message: "You cannot use a blank email" },
          { type: "email", message: "Please input correct email address" }
        ],
      }
    };
  },
  methods: {
    ...mapActions(["signup"]),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    submit: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signup(this.signupForm)
            .then(() => {
              const h = this.$createElement;
              this.$notify({
                title: this.$t('Sign on'),
                message: h(
                  "i",
                  { style: "color: teal" },
                  this.$t("User {name} was created", {name: this.signupForm.name})
                ),
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
