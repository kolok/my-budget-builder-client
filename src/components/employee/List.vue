<template>
  <div>
    <div class="Content__ScoreCardBoard">
      <score-card :title="$t('Head count')" :count="headcount" :unit="$t('People')"/>
      <score-card :title="$t('Payroll')" :count="totalPayroll" :unit="getCompanyCurrency"/>
      <score-card :title="$t('Bonus')" :count="totalBonus" :unit="getCompanyCurrency"/>
    </div>
    <p>activeBudgetID: {{ this.activeBudgetID }}</p>
    <el-table
      :data="employees"
      class="Content__Table"
      :default-sort="{prop: 'name', order: 'descending'}"
      row-key="id"
      stripe
      :empty-text="$t('No employee...')"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        fixed
      >
      </el-table-column>
      <el-table-column
        :label="$t('Employee')"
        prop="name"
        sortable
      />
      <el-table-column
        :label="$t('Email')"
        prop="email"
        sortable
      />
      <el-table-column
        :label="$t('Actions')"
        fixed="right"
        width="120"
      >
        <template slot-scope="scope">
          <employee-actions :employeeID="scope.row.id" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmployeeActions from './Actions.vue'
import ScoreCard from '../common/ScoreCard.vue'

export default {
  components: {
    EmployeeActions,
    ScoreCard
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
    }
  },
  computed: {
    ...mapGetters(['employees','getCurrentCompany','getCurrencyById','currencies','activeBudgetID']),

    headcount() {
      return this.employees.length;
    },
    totalPayroll() {
      var payrolls = this.employees.map( employee =>
        employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'payroll') : undefined
      ).filter( payroll => payroll !== undefined )
      return payrolls.reduce((a,b) => a + b.amount, 0)
    },
    totalBonus() {
      var bonus = this.employees.map( employee =>
        employee.expenses ? employee.expenses.find(expense => expense.expense_type == 'bonus') : undefined
      ).filter( b => b !== undefined )
      return bonus.reduce((a,b) => a + b.amount, 0)
    },
    getDefaultCurrencyID() {
      return this.getCurrentCompany.defaultCurrencyID
    },
    getCompanyCurrency() {
      return this.getCurrencyById(1) ? this.getCurrencyById(1).symbol : ''
    }
  },
  beforeMount() {
    this.$store.dispatch("getCurrencies");
    this.$store.dispatch("getCurrentCompany");
  },
  created() {
    this.$store.dispatch('getEmployees').then(() => {
      this.loading = false
    });
  },
  methods: {
    handleSelectionChange: function(val) {
      this.multipleSelection = val
      console.log(val)
    },
  }
}
</script>

