<template>
  <div class="Content__Select">
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
