<template>
  <employee-form
    :employee-form="employeeForm"
    :budget-i-d="activeBudgetID()"
    @submitForm="handleCreate"
    @cancel="handleCancel"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import employeeForm from './Form.vue'

export default {
  components: {
    employeeForm
  },
  data() {
    return {
      employeeForm: {
        payroll:0,
        bonus:0
      }
    }
  },
  methods: {
    ...mapActions(['createEmployee']),
    ...mapGetters(['activeBudgetID']),
    handleCreate: function() {
      this.employeeForm.expenses = [
        {expense_type: 'payroll', amount: this.employeeForm.payroll || 0},
        {expense_type: 'bonus', amount: this.employeeForm.bonus || 0}
      ]
      // Create employee
      this.createEmployee(this.employeeForm)
        .then(() => {
          // reset form data
          this.employeeForm = {}
          this.$router.push('/hiringPlan')
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleCancel: function() {
      this.$router.push('/hiringPlan')
    }
  }
}
</script>
