<template>
  <p class="Content__Baseline">
    {{ displayBudgetDate() }}
  </p>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapGetters(['activeBudget']),
  },
  methods: {
    displayBudgetDate() {
      var result = ''
      if (this.activeBudget.startDate !== null) {
        result += this.$t('From {startDate} ', 
          {
            startDate: moment(this.activeBudget.startDate).format(this.$t('YYYY/MM/DD'))
          })
      }
      if (this.activeBudget.endDate !== null) {
        result += this.$t('To {endDate} ', 
          {
            endDate: moment(this.activeBudget.endDate).format(this.$t('YYYY/MM/DD'))
          })
      }
      return result
    }
  }
}
</script>
