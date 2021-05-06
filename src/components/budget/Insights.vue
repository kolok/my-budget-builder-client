<template>
  <div>
    <div style="width:600px;height:500px;">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    highcharts: Chart 
  },
  props: {
    employee: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'by Employee'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>{point.y}€'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %<br>{point.y} €'
                }
            }
        },
        series: [{
            name: 'Expenses',
            colorByPoint: true,
            data: []
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['employees']),
  },
  created() {
    this.$store.dispatch('getEmployees').then( employees => {
        this.chartOptions.series[0].data = employees.map( e => {
            console.log(e)
            return {
                name: e.name, 
                y: e.expenses.reduce( (a,b) => a + b.amount, 0 ),
            }
        })
    })
  }
}
</script>

<style>
.Content__ObjectManagement {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

</script>
