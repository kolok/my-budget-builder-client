<template>
  <employee-form :employeeForm="employeeForm" @submitForm="handleCreate" @cancel="handleCancel" />
</template>

<script>
import { mapActions } from "vuex"
import employeeForm from "./Form.vue"

export default {
  components: {
    employeeForm
  },
  data() {
    return {
      employeeForm: {}
    }
  },
  methods: {
    ...mapActions(["createEmployee"]),
    handleCreate: function(formName) {
      this.employeeForm.expenses = []
      if (this.employeeForm.salary) {
        this.employeeForm.expenses.push( {expense_type: "payroll", amount: this.employeeForm.salary} )
      }
      if (this.employeeForm.bonus) {
        this.employeeForm.expenses.push( {expense_type: "bonus", amount: this.employeeForm.bonus} )
      }
      // Create employee
      this.createEmployee(this.employeeForm)
        .then(() => {
          // reset form data
          this.employeeForm = {}
          this.$router.push("/hiringPlan")
        })
        .catch(e => {
          console.log(e)
        });
    },
    handleCancel: function() {
      this.$router.push("/hiringPlan")
    }
  }
};
</script>
