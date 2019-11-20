<template>
  <p class="Content__Baseline">{{ displayBudgetDate() }} </p>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapGetters(['activeBudget'])
  },
  methods: {
    displayBudgetDate() {
      return this.$t("From {startDate} to {endDate}", 
        {
          startDate: moment(this.activeBudget.startDate).format(this.$t('YYYY/MM/DD')),
          endDate: moment(this.activeBudget.endDate).format(this.$t('YYYY/MM/DD'))
        })
    }
  }
}
</script>
