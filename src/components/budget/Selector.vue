<template>
  <div>
    <div class="Content__ObjectManagement">
      <budget-create :exists-budgets="existsBudgets" />
      <div
        v-if="existsBudgets"
        class="Content__Select"
      >
        <el-select
          :value="activeBudgetID"
          @input="handleSelectBudget"
        >
          <el-option
            v-for="budget in budgets"
            :key="budget.id"
            :label="budget.name"
            :value="budget.id"
          />
        </el-select>
      </div>
      <budget-actions v-if="existsBudgets" />
    </div>
    <budget-dates v-if="existsBudgets" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BudgetCreate from './Create.vue'
import BudgetDates from './Dates.vue'
import BudgetActions from './Actions.vue'

export default {
  components: {
    BudgetCreate,
    BudgetDates,
    BudgetActions,
  },
  props: {
    existsBudgets: Boolean
  },
  computed: {
    ...mapGetters(['budgets', 'activeBudgetID']),
  },
  methods: {
    handleSelectBudget: function(val) {
      this.$store.dispatch('setActiveBudgetID', val)
    },
  },
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
