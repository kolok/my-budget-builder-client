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
          inactive-text="User"
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
    >
      <el-button @click="handleCancel('userForm')">Cancel</el-button>
      <el-button
        type="primary"
        @click="handleEdit('userForm')"
      >
        Save
      </el-button>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userForm: {},
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
  created(){
    this.initUser()
  },
  methods: {
    ...mapActions(['getUser', 'updateUser']),

    initUser: function() {
      this.getUser(this.$route.params.id).then(response => {
        console.log('Get user ',response.data)
        this.userForm = response.data
        this.isAdmin = response.data.userCompanies[0].role == 'client_admin'
      })
    },
    handleEdit: function(formName) { // Create user
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.isAdmin) {
            this.userForm.userCompanies[0].role = 'client_admin'
            this.userForm.role = 'client_admin'
          }
          else {
            this.userForm.userCompanies[0].role = 'client_user'
            this.userForm.role = 'client_user'
          }

          this.updateUser(this.userForm)
            .then( () => {
              const h = this.$createElement
              this.$notify({
                title: this.$t('Update user'),
                message: h('i', { style: 'color: teal' }, 'user ' + this.userForm.name + ' was updated'),
                type: 'success'
              })
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
