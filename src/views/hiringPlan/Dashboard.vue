<template>
  <div>
    <div class="Content__ObjectManagement">
      <budget-create :exists-budgets="existsBudgets" />
      <budget-selector v-if="existsBudgets" />
      <budget-actions v-if="existsBudgets" />
    </div>
    <div v-if="existsBudgets">
      <budget-dates />
      <el-tabs v-model="activeTab">
        <el-tab-pane
          :label="$t('Hiring Plan Builder')"
          name="builder"
        >
          <employee-list :budgetID="this.activeBudgetID" v-if="this.activeBudgetID" />
          <employee-create-button />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('Insights')"
          name="insights"
        >
          <BudgetInsights :employee-list="this.employees" />
        </el-tab-pane>
      </el-tabs>
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
import BudgetInsights from '../../components/budget/Insights.vue'

export default {
  components: {
    BudgetCreate,
    BudgetDates,
    BudgetSelector,
    BudgetActions,
    EmployeeList,
    EmployeeCreateButton,
    BudgetInsights
  },
  data() {
    return {
      activeTab: 'builder'
    }
  },
  computed: {
    ...mapGetters(['budgets', 'employees', 'activeBudgetID']),
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
          this.$store.dispatch('setActiveBudgetID', budgets[0].id)
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
