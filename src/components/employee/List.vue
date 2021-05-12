<template>
  <div>
    <div class="Content__ScoreCardBoard">
      <score-card
        :title="$t('Head count')"
        :count="headcount"
      />
      <score-card
        :title="$t('Full-time equivalent')"
        :count="fullTimeCount"
      />
      <score-card
        :title="$t('Payroll')"
        :count="totalPayroll"
        :unit="getCompanyCurrency"
      />
      <score-card
        :title="$t('Bonus')"
        :count="totalBonus"
        :unit="getCompanyCurrency"
      />
    </div>
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
      />
      <el-table-column
        :label="$t('Employee')"
        prop="name"
        sortable
      />
      <el-table-column
        :label="$t('Email')"
      >
        <template slot-scope="props">
          <span style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
            {{ props.row.email }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Payroll')"
      >
        <template slot-scope="props">
          {{ getPayrollAmount(props.row) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Bonus')"
      >
        <template slot-scope="props">
          {{ getBonusAmount(props.row) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Part-time')"
        prop="partime"
      >
        <template slot-scope="props">
          {{ getPartTime(props.row.positions) }}
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('Actions')"
        fixed="right"
        width="120"
      >
        <template slot-scope="scope">
          <employee-actions :employee-i-d="scope.row.id" />
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
  props: {
    budgetID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
    }
  },
  computed: {
    ...mapGetters([
      'employees',
      'getCurrentCompany',
      'getCurrencyById',
      'currencies',
      'activeBudgetID',
      'getPayrollAmount',
      'getBonusAmount',
      'getTotalPayrollAmount',
      'getTotalBonusAmount'
    ]),

    headcount() {
      return this.employees.length
    },
    fullTimeCount() {
      return this.employees.reduce( (a,b) => a + (b.positions ? b.positions.reduce( (c,d) => c + d.parttime,0 ) : 0),0 ) / 100
    },
    totalPayroll() {
      return this.getTotalPayrollAmount(this.employees)
    },
    totalBonus() {
      return this.getTotalBonusAmount(this.employees)
    },
    getDefaultCurrencyID() {
      return this.getCurrentCompany.defaultCurrencyID
    },
    getCompanyCurrency() {
      return this.getCurrencyById(1) ? this.getCurrencyById(1).symbol : ''
    }
  },
  beforeMount() {
    this.$store.dispatch('getCurrencies')
  },
  created() {
    this.$store.dispatch('getEmployees', {budgetID: this.budgetID}).then(() => {
      this.loading = false
    })
  },
  methods: {
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
    getExpenseAmount: function(expenses, expense_type) {
      let expense = expenses.find(e => e.expense_type == expense_type).amount
      return expense
    },
    getPartTime: function(positions) {
      return positions ? positions.reduce( (a,b) => a + b.parttime, 0) : 0
    },
  }
}
</script>

