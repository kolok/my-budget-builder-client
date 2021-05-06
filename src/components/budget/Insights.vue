<template>
  <div>
    <div style="display: flex; flex-direction: row; justify-content: center;">
      <h2>
        By Employee
      </h2>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: center;">
      <div style="width:20%;">
        <highcharts :options="expensesOptions" />
      </div>
      <div style="width:20%;">
        <highcharts :options="payrollsOptions" />
      </div>
      <div style="width:20%;">
        <highcharts :options="bonusOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    employeeList: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      expensesOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Expenses'
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
              enabled: false,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %<br>{point.y} €'
            }
          }
        },
        series: [{
          name: 'Expenses',
          colorByPoint: true,
          data: []
        }]
      },
      payrollsOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Payrolls'
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
              enabled: false,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %<br>{point.y} €'
            }
          }
        },
        series: [{
          name: 'Expenses',
          colorByPoint: true,
          data: []
        }]
      },
      bonusOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Bonus'
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
              enabled: false,
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
    ...mapGetters(['employees', 'getExpensesAmount', 'getBonusAmount', 'getPayrollAmount']),
    
  },
  watch: {
    'employeeList': function(employees) {
      this.expensesOptions.series[0].data = employees.map( e => {
        return {
          name: e.name, 
          y: this.getExpensesAmount(e)
        }
      })
      this.payrollsOptions.series[0].data = employees.map( e => {
        return {
          name: e.name, 
          y: this.getPayrollAmount(e)
        }
      })
      this.bonusOptions.series[0].data = employees.map( e => {
        return {
          name: e.name, 
          y: this.getBonusAmount(e)
        }
      })
    }
  },
  created() {
  }
}
</script>
