<template>
  <div>
    <template>
      <el-button
        type="primary"
        @click="createDialog = true"
      >
        Create a new user
      </el-button>
    </template>

    <el-dialog
      title="Create an user"
      :visible.sync="createDialog"
    >
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
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      currencyList: [],
      createDialog: false,
      userForm: {
        name: '',
      },
      userRule: {
        name: [
          { required: true, message: 'User name can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ],
        countryID: [
          { required: true, message: 'A country should be selected' }
        ],
        defaultCurrencyID: [
          { required: true, message: 'A currency should be selected' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['createUser']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleCreateUser: function(formName) { // Create user
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createUser(this.userForm)
            .then(response => {
              // reset form data
              this.$refs[formName].resetFields()
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
      this.createDialog = false
    }
  }
}
</script>
