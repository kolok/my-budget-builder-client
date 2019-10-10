<template>
  <div class="Content__Select">
    <el-select
      @input="handleSelectBudget"
      placeholder="Select a budget"
      no-data-text="No budget"
      :value="activeBudgetID"
    >
      <el-option
        v-for="budget in budgets"
        :key="budget.id"
        :label="budget.name"
        :value="budget.id">
      </el-option>
    </el-select>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['budgets', 'activeBudgetID']),
    },
    methods: {
      handleSelectBudget: function(val) {
        this.$store.commit('SET_ACTIVEBUDGETID', val)
      },
    },
  }
</script>
