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
        label="Employee"
      >
        <el-input
          v-model="employeeForm.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        prop="email"
        label="Email"
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
      <el-button @click="handleCancel('employeeForm')">Cancel</el-button>
      <el-button
        type="primary"
        @click="handleEdit('employeeForm')"
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
      employeeForm: {},
      employeeRule: {
        name: [
          { required: true, message: 'Employee name can\'t be blank' },
          { max:255, message: 'Too long'}
        ],
        email: [
          { required: true, message: 'You cannot use a blank email' },
          { type: 'email', message: 'Please input correct email address'}
        ],
      }
    }
  },
  created(){
    this.initEmployee()
  },
  methods: {
    ...mapActions(['getEmployee', 'updateEmployee']),

    initEmployee: function() {
      this.getEmployee(this.$route.params.id).then(response => {
        console.log('Get employee ',response.data)
        this.employeeForm = response.data
      })
    },
    handleEdit: function(formName) { // Create employee
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.updateEmployee(this.employeeForm)
            .then( () => {
              const h = this.$createElement
              this.$notify({
                title: 'Update employee',
                message: h('i', { style: 'color: teal' }, 'employee ' + this.employeeForm.name + ' was updated'),
                type: 'success'
              })
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
