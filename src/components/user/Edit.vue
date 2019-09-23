<template>
  <div>
    <template>
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="addDialog = true"
      >
        Edit
      </el-button>
    </template>
    <template>
      <el-button
        size="mini"
        type="danger"
        icon="el-icon-delete"
        @click="handleDelete()"
      >
        Delete
      </el-button>
    </template>

    <el-dialog
      title="Create an user"
      :visible.sync="addDialog"
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
        <el-form-item
          label="Country"
          prop="country_id"
        >
          <el-select
            v-model="userForm.country_id"
            placeholder="Select a country"
          >
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Currency"
          prop="default_currency_id"
        >
          <el-select
            v-model="userForm.default_currency_id"
            placeholder="Select a currency"
          >
            <el-option
              v-for="currency in currencies"
              :key="currency.id"
              :label="currency.longName"
              :value="currency.id"
            />
          </el-select>
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
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    userForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      addDialog: false,
      userRule: {
        name: [
          { required: true, message: 'User name can\'t be blank' },
          { max:25, message: 'Too long'},
          { min:3, message: 'Too short'}
        ],
        country_id: [
          { required: true, message: 'A country should be selected' }
        ],
        default_currency_id: [
          { required: true, message: 'A currency should be selected' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currencies', 'countries'])
  },
  methods: {
    ...mapActions(['updateUser', 'deleteUser']),
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    handleEdit: function(formName) { // Create user
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUser(this.userForm)
            .then(response => {
              this.addDialog = false
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
    handleCancel: function(formName){
      this.$refs[formName].resetFields()
      this.addDialog = false
    },
    handleDelete() {
      this.$confirm('Do you really want to delete this User?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteUser(this.userForm.id)
      })
    }
  }
}
</script>
