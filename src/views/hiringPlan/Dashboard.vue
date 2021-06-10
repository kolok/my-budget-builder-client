<template>
  <div>
    <el-alert
      :title="$t('Warning')"
      type="warning"
      style="margin-bottom:12px"
      v-if="this.offices === undefined || this.offices.length == 0">
      {{$t('To be able to use Budget and create employee, first, you need to create ')}}
      <a @click="redirectToEntitiesOffices">{{ $t('entities and offices') }}</a>
    </el-alert>
    <el-alert
      :title="$t('Warning')"
      type="warning"
      style="margin-bottom:12px"
      v-if="this.teams === undefined || this.teams.length == 0">
      {{$t('To be able to use Budget and create employee, first, you need to create ')}}
      <a @click="redirectToTeams">{{ $t('teams') }}</a>
    </el-alert>
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
    ...mapGetters(['budgets', 'employees', 'activeBudgetID', 'teams', 'offices']),
    existsBudgets: function() {
      return this.budgets.length > 0
    }
  },
  beforeCreate() {
    this.$store.dispatch('getCurrencies'),
    this.$store.dispatch('getEntitiesWithOffices')
    this.$store.dispatch('getTeams')
  },
  created() {
    this.setActiveBudget()
  },
  methods: {
    ...mapActions(['getBudgets', 'getEntitiesWithOffices']),
    setActiveBudget() {
      this.getBudgets().then(budgets => {
        if (this.activeBudgetID === undefined || this.activeBudgetID == 0) {
          if (budgets !== undefined && budgets.length > 0) {
            this.$store.dispatch('setActiveBudgetID', budgets[0].id)
          }
        }
      })
    },
    redirectToEntitiesOffices: function() {
      this.$router.push({ name: 'Account', params: {  activeRedirect: 'entities' } })
    },
    redirectToTeams: function() {
      this.$router.push({ name: 'Account', params: {  activeRedirect: 'teams' } })
    }
  }
}
</script>

