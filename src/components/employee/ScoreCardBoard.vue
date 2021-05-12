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
      'getCurrentCompany',
      'getCurrencyById',
      'currencies',
      'getPayrollAmount',
      'getBonusAmount',
      'getTotalPayrollAmount',
      'getTotalBonusAmount'
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
    totalBonus() {
      return this.getTotalBonusAmount(this.employees)
    },
    getCompanyCurrency() {
      return this.getCurrencyById(1) ? this.getCurrencyById(1).symbol : ''
    }
  },
  beforeMount() {
    this.$store.dispatch('getCurrencies')
  }
}
</script>

