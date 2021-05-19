<template>
  <div>
    <score-card-board />
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
        :label="$t('Payroll with taxes')"
      >
        <template slot-scope="props">
          <b>{{ getPayrollAmountWithTaxe(props.row) }}</b><br>
          <span style="font-size:11px">{{ $t('Payroll') + ': ' + getPayrollAmount(props.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('Bonus with taxes')"
      >
        <template slot-scope="props">
          <b>{{ getBonusAmountWithTaxe(props.row) }}</b><br>
          <span style="font-size:11px">{{ $t('Bonus') + ': ' + getBonusAmount(props.row) }}</span>
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
import ScoreCardBoard from './ScoreCardBoard.vue'

export default {
  components: {
    EmployeeActions,
    ScoreCardBoard,
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
      'getBonusAmount',
      'getBonusAmountWithTaxe',
      'getPayrollAmount',
      'getPayrollAmountWithTaxe',
    ]),
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

<style>
.el-table .cell {
    word-break: normal;
}
</style>
