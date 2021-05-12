<template>
  <div>
    <div class="Content__ObjectManagement">
      <budget-selector :exists-budgets="existsBudgets" />
    </div>
    <div v-if="existsBudgets">
      <el-tabs v-model="activeTab">
        <el-tab-pane
          :label="$t('Hiring Plan Builder')"
          name="builder"
        >
          <employee-list
            v-if="activeBudgetID"
            :budget-i-d="activeBudgetID"
          />
          <employee-create-button />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('Insights')"
          name="insights"
        >
          <BudgetInsights :employee-list="employees" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BudgetSelector from '../../components/budget/Selector.vue'
import EmployeeList from '../../components/employee/List.vue'
import EmployeeCreateButton from '../../components/employee/CreateButton.vue'
import BudgetInsights from '../../components/budget/Insights.vue'

export default {
  components: {
    BudgetSelector,
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

