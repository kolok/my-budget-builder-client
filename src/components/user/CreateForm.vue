<template>
  <div>
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="userRule"
      label-width="250px"
      class="Dialog__Form"
    >
      <el-form-item
        prop="name"
        label="User"
      >
        <el-input
          v-model="userForm.name"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        prop="email"
        label="Email"
      >
        <el-input
          v-model="userForm.email"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        prop="defaultLanguage"
        label="Default Language"
      >
        <el-select
          v-model="userForm.defaultLanguage"
          placeholder="Select a defaultLanguage"
        >
          <el-option
            v-for="language in ['en','fr']"
            :key="language"
            :label="language"
            :value="language"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        prop="role"
      >
        <el-switch
          v-model="isAdmin"
          active-text="Admin"
          inactive-text="User">
        </el-switch>
      </el-form-item>

    </el-form>
    <span
      slot="footer"
    >
      <el-button @click="handleCancel">Cancel</el-button>
      <el-button
        type="primary"
        @click="handleCreateUser('userForm')"
      >Save</el-button>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      userForm: {
        name: '',
        email: '',
        defaultLanguage: 'en',
        role: '',
      },
      isAdmin: false,
      userRule: {
        name: [
          { required: true, message: 'User name can\'t be blank' },
          { max:255, message: 'Too long'}
        ],
        defaultLanguage: [
          { required: true, message: 'defaultLanguage is required' }
        ],
        email: [
          { required: true, message: 'You cannot use a blank email' },
          { type: 'email', message: 'Please input correct email address'}
        ],
      }
    }
  },
  methods: {
    ...mapActions(['createUser']),

    handleCreateUser: function(formName) { // Create user
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.isAdmin) {
            this.userForm.role = "client_admin"
          }
          else {
            this.userForm.role = "client_user"
          }
          console.log('this.userForm',this.userForm)
          this.createUser(this.userForm)
            .then(response => {
              // reset form data
              this.$refs[formName].resetFields()
              this.$router.push('/users')
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel: function(){
      this.$router.push('/users')
    }
  }
}
</script>
