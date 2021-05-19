<template>
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
      :title="$t('Payroll with taxes')"
      :sub-title="$t('Payroll')"
      :count="totalPayrollWithTaxe"
      :sub-count="totalPayroll"
      :unit="getCompanyCurrency"
    />
    <score-card
      :title="$t('Bonus with taxes')"
      :sub-title="$t('Bonus')"
      :count="totalBonusWithTaxe"
      :sub-count="totalBonus ? totalBonus : undefined"
      :unit="getCompanyCurrency"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScoreCard from '../common/ScoreCard.vue'

export default {
  components: {
    ScoreCard
  },
  computed: {
    ...mapGetters([
      'employees',
      'getCompanyCurrency',
      'getTotalPayrollAmount',
      'getTotalPayrollAmountWithTaxe',
      'getTotalBonusAmount',
      'getTotalBonusAmountWithTaxe',
    ]),

    headcount() {
      return this.employees.length
    },
    fullTimeCount() {
      return this.employees.reduce( (a,b) => 
        a + (b.positions ? b.positions.reduce( (c,d) => c + d.parttime,0 ) : 0),0 
      ) / 100
    },
    totalPayroll() {
      return this.getTotalPayrollAmount(this.employees)
    },
    totalPayrollWithTaxe() {
      return this.getTotalPayrollAmountWithTaxe(this.employees)
    },
    totalBonus() {
      return this.getTotalBonusAmount(this.employees)
    },
    totalBonusWithTaxe() {
      return this.getTotalBonusAmountWithTaxe(this.employees)
    }
  }
}
</script>

