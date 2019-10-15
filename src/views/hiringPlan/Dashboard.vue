<template>
  <div>
    <div class="Content__ObjectManagement">
      <BudgetCreate :existsBudgets="existsBudgets"/>
        <BudgetSelector v-if="existsBudgets"/>
        <BudgetActions v-if="existsBudgets"/>
    </div>
    <div v-if="existsBudgets">
      <EmployeeList />
      <EmployeeCreateButton />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import BudgetCreate from '../../components/budget/Create.vue'
  import BudgetSelector from '../../components/budget/Selector.vue'
  import BudgetActions from '../../components/budget/Actions.vue'
  import EmployeeList from '../../components/employee/List.vue'
  import EmployeeCreateButton from '../../components/employee/CreateButton.vue'

  export default {
    components: {
      BudgetCreate,
      BudgetSelector,
      BudgetActions,
      EmployeeList,
      EmployeeCreateButton,
    },
    created(){
      this.setActiveBudget()
    },
    computed: {
      ...mapGetters(['budgets']),
      existsBudgets: function() {
        return this.budgets.length > 0;
      },
    },
    methods: {
      ...mapActions(['getBudgets']),
      setActiveBudget: function() {
        this.getBudgets().then( budgets => {
          if (budgets !== undefined && budgets.length > 0) {
            this.$store.commit('SET_ACTIVEBUDGETID', budgets[0].id)
          }
        })
      },
    },
  }
</script>

<style>
  .Content__ObjectManagement {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
</style>
