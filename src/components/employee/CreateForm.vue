<template>
  <div>
    <el-form
      ref="employeeForm"
      :model="employeeForm"
      :rules="employeeRule"
      label-width="250px"
      class="Dialog__Form"
    >
      <el-form-item
        prop="name"
        :label="$t('Employee')"
      >
        <el-input
          v-model="employeeForm.name"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        prop="email"
        :label="$t('Email')"
      >
        <el-input
          v-model="employeeForm.email"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
    >
      <el-button @click="handleCancel">{{ $t('Cancel') }}</el-button>
      <el-button
        type="primary"
        @click="handleCreateEmployee('employeeForm')"
      >{{ $t('Save') }}</el-button>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      employeeForm: {
        name: '',
        email: '',
      },
      employeeRule: {
        name: [
          { required: true, message: this.$t('Employee name can\'t be blank') },
          { max:255, message: this.$t('Too long')}
        ],
        email: [
          { required: true, message: this.$t('You cannot use a blank email') },
          { type: 'email', message: this.$t('Please input correct email address')}
        ],
      }
    }
  },
  methods: {
    ...mapActions(['createEmployee']),

    handleCreateEmployee: function(formName) { // Create employee
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createEmployee(this.employeeForm)
            .then( () => {
              // reset form data
              this.$refs[formName].resetFields()
              this.$router.push('/hiringPlan')
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
      this.$router.push('/hiringPlan')
    }
  }
}
</script>
