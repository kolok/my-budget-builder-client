<template>
  <div>
    <div class="Content__ObjectManagement">
      <budget-create :exists-budgets="existsBudgets" />
      <budget-selector v-if="existsBudgets" />
      <budget-actions v-if="existsBudgets" />
    </div>
    <div v-if="existsBudgets">
      <budget-dates />
      <employee-list />
      <employee-create-button />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BudgetCreate from '../../components/budget/Create.vue'
import BudgetDates from '../../components/budget/Dates.vue'
import BudgetSelector from '../../components/budget/Selector.vue'
import BudgetActions from '../../components/budget/Actions.vue'
import EmployeeList from '../../components/employee/List.vue'
import EmployeeCreateButton from '../../components/employee/CreateButton.vue'

export default {
  components: {
    BudgetCreate,
    BudgetDates,
    BudgetSelector,
    BudgetActions,
    EmployeeList,
    EmployeeCreateButton
  },
  computed: {
    ...mapGetters(['budgets']),
    existsBudgets: function() {
      return this.budgets.length > 0
    }
  },
  created() {
    this.setActiveBudget()
  },
  methods: {
    ...mapActions(['getBudgets']),
    setActiveBudget() {
      this.getBudgets().then(budgets => {
        if (budgets !== undefined && budgets.length > 0) {
          this.$store.commit('SET_ACTIVEBUDGETID', budgets[0].id)
        }
      })
    }
  }
}
</script>

<style>
.Content__ObjectManagement {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
