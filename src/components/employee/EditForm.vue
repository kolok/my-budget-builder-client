<template>
  <employee-form
    :employee-form="employeeForm"
    :positions-form="employeeForm.positions"
    :budget-i-d="activeBudgetID()"
    @submitForm="handleEdit"
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
      employeeForm: {}
    }
  },
  created() {
    this.initEmployee()
  },
  methods: {
    ...mapActions(['getEmployee', 'updateEmployee']),
    ...mapGetters(['activeBudgetID']),

    initEmployee: function() {
      this.getEmployee(this.$route.params.id).then(employee => {
        employee.expenses.forEach( expense => {
          if (expense.expense_type == 'payroll') {
            employee.payroll = expense.amount
          }
          if (expense.expense_type == 'bonus') {
            employee.bonus = expense.amount
          }
        })
        if (employee.positions[0]) {
          employee.position = employee.positions[0].name
          employee.teamID = employee.positions[0].teamID
        }

        this.employeeForm = employee
      })
    },
    handleEdit: function() {
      this.employeeForm.expenses = [
        {expense_type: 'payroll', amount: this.employeeForm.payroll || 0},
        {expense_type: 'bonus', amount: this.employeeForm.bonus || 0}
      ]

      this.updateEmployee(this.employeeForm)
        .then(() => {
          this.$cs({
            title: this.$t('Update employee'),
            h: this.$createElement,
            message: this.$t('Employee {name} was updated', { name: this.employeeForm.name }),
            type: 'success'
          })
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
