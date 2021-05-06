<template>
  <div style="display: flex; flex-direction: row; justify-content: center;">
    <div style="width:33%;">
      <highcharts :options="expensesOptions"></highcharts>
    </div>
    <div style="width:33%;">
      <highcharts :options="payrollsOptions"></highcharts>
    </div>
    <div style="width:33%;">
      <highcharts :options="bonusOptions"></highcharts>
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
            text: 'Expenses by Employee'
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
      },
      payrollsOptions: {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Payrolls by Employee'
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
      },
      bonusOptions: {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Bonus by Employee'
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
    ...mapGetters(['employees', 'getExpensesAmount', 'getBonusAmount', 'getPayrollsAmount']),
    
  },
  created() {
  },
  watch: {
      'employeeList': function(employees) {
        this.expensesOptions.series[0].data = employees.map( e => {
            return {
                name: e.name, 
                y: this.getExpensesAmount(e) //.expenses.reduce( (a,b) => a + b.amount, 0 ),
            }
        })
        this.payrollsOptions.series[0].data = employees.map( e => {
            return {
                name: e.name, 
                y: this.getPayrollsAmount(e) //.expenses.reduce( (a,b) => a + b.amount, 0 ),
            }
        })
        this.bonusOptions.series[0].data = employees.map( e => {
            return {
                name: e.name, 
                y: this.getBonusAmount(e) //.expenses.reduce( (a,b) => a + b.amount, 0 ),
            }
        })
      }
  }
}
</script>
