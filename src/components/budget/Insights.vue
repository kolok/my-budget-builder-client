<template>
  <div>
    <score-card-board />
    <div style="display: flex; flex-direction: row; justify-content: center;">
      <div style="width:50%;">
        <p style="text-align: center; font-size: large">
          {{ $t('Expense by team') }}
        </p>
        <highcharts :options="byTeamSubteamOptions" />
      </div>
      <div style="width:50%;">
        <p style="text-align: center; font-size: large">
          {{ $t('Expense by entity and office') }}
        </p>
        <highcharts :options="byEntOffOptions" />
      </div>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: center;">
      <div style="width:30%;">
        <p style="text-align: center; font-size: large">
          {{ $t('Expense by employee') }}
        </p>
        <highcharts :options="expensesOptions" />
      </div>
      <div style="width:30%;">
        <p style="text-align: center; font-size: large">
          {{ $t('Payroll by employee') }}
        </p>
        <highcharts :options="payrollsOptions" />
      </div>
      <div style="width:30%;">
        <p style="text-align: center; font-size: large">
          {{ $t('Bonus by employee') }}
        </p>
        <highcharts :options="bonusOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScoreCardBoard from '../employee/ScoreCardBoard.vue'
import Highcharts from 'highcharts'

function sumTeamValue(id, teams) {
  //if no children, return value
  let children = teams.filter(team => team.parent == id)
  let team = teams.find(team => team.id == id)
  team.value ||= 0
  for (let child of children) {
    team.value += sumTeamValue(child.id, teams)
  }
  return team.value
}

export default {
  components: {
    ScoreCardBoard,
  },
  props: {
    employeeList: {
      type: Array,
      required: false,
      default: () => []
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
          text: null
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>{point.y}€',
          valueDecimals: 2
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
          text: null
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>{point.y}€',
          valueDecimals: 2
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
          text: null
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>{point.y}€',
          valueDecimals: 2
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
      byEntOffOptions: {
        chart: {
          height: '100%'
        },
        // Let the center circle be transparent
        colors: ['transparent'].concat(Highcharts.getOptions().colors),
        title: {
          text: null
        },
        series: [{
          type: 'sunburst',
          data: [],
          allowDrillToNode: true,
          cursor: 'pointer',
          dataLabels: {
            format: '{point.name}',
            filter: {
              property: 'innerArcLength',
              operator: '>',
              value: 16
            },
            rotationMode: 'circular'
          },
          levels: [{
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: 'outerArcLength',
                operator: '>',
                value: 64
              }
            }
          }, {
            level: 2,
            colorByPoint: true
          },
          {
            level: 3,
            colorVariation: {
              key: 'brightness',
              to: -0.5
            }
          }]
        }],

        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}<br/>{point.value}€',
          valueDecimals: 2
        }
      },
      byTeamSubteamOptions: {
        chart: {
          height: '100%'
        },
        /*
         * Let the center circle be transparent
         *        colors: ['transparent'].concat(Highcharts.getOptions().colors),
         */
        title: {
          text: null
        },
        series: [{
          type: 'sunburst',
          data: [],
          allowDrillToNode: true,
          cursor: 'pointer',
          dataLabels: {
            format: '{point.name}',
            filter: {
              property: 'innerArcLength',
              operator: '>',
              value: 16
            },
            rotationMode: 'circular'
          },
          levels: [{
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: 'outerArcLength',
                operator: '>',
                value: 64
              }
            }
          }, {
            level: 2,
            colorByPoint: true
          },
          {
            level: 3,
            colorVariation: {
              key: 'brightness',
              to: -0.5
            }
          }]
        }],

        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}<br/>{point.value}€',
          valueDecimals: 2
        }
      },
    }
  },
  computed: {
    ...mapGetters([
      'employees', 
      'offices',
      'entities',
      'getExpensesAmountWithTaxe', 
      'getBonusAmountWithTaxe', 
      'getPayrollAmountWithTaxe',
      'teams',
      'getCurrentCompany'
    ]),
  },
  watch: {
    'employeeList': function(employees) {
      this.expensesOptions.series[0].data = employees.map( e => {
        return {
          name: e.name, 
          y: this.getExpensesAmountWithTaxe(e, true)
        }
      })
      this.payrollsOptions.series[0].data = employees.map( e => {
        return {
          name: e.name, 
          y: this.getPayrollAmountWithTaxe(e, true)
        }
      })
      this.bonusOptions.series[0].data = employees.map( e => {
        return {
          name: e.name, 
          y: this.getBonusAmountWithTaxe(e, true)
        }
      })

      let byOffice = {}
      let byEntity = {}
      let byTeam = {}
      /*
       *TODO: manage the color of the sunburst
       *TODO: manage the period of the budget
       */
      let byEntityOfficeData = [{
        id: 'company',
        parent: '',
        name: this.getCurrentCompany.name
      }]

      for (let employee of employees) {
        let office = this.offices.find( o => o.id == employee.officeID )
        byEntity[office.entity.id] = (byEntity[office.entity.id] || 0 ) + this.getExpensesAmountWithTaxe(employee, true)
        byOffice[employee.officeID] = (byOffice[employee.officeID] || 0 ) + this.getExpensesAmountWithTaxe(employee, true)
        let parttime = employee.positions.reduce((a,b) => a + b.parttime, 0)
        for (let position of employee.positions) {
          byTeam[position.teamID] = this.getExpensesAmountWithTaxe(employee, true) * position.parttime / parttime
        }
      }
      let byTeamData = this.teams
      byTeamData.push({
        id: 'company',
        parent: '',
        name: this.getCurrentCompany.name
      })
      let byTeamSimpleData = []
      for ( let team of byTeamData ) {
        byTeamSimpleData.push({
          value: byTeam[team.id],
          id: team.id,
          name: team.name,
          parent: team.parentTeamID == '' ? '' : ( team.parentTeamID === null ? 'company' : team.parentTeamID ) 
        })
        if (byTeam[team.id]) {
          team.value = byTeam[team.id]
        }
        team.parent ||= team.parentTeamID === null ? 'company' : team.parentTeamID
      }
      sumTeamValue('company', byTeamSimpleData)

      for ( let entityID of Object.keys(byEntity) ) {
        let entity = this.entities.find( e => e.id == entityID )
        byEntityOfficeData.push({
          id: entity.id,
          parent: 'company',
          name: entity.name
        })
      }
      for ( let [officeID,expense] of Object.entries(byOffice) ) {
        let office = this.offices.find( o => o.id == officeID )
        byEntityOfficeData.push({
          id: office.id,
          parent: office.entityID,
          name: office.name,
          value: expense
        })
      }
      this.byEntOffOptions.series[0].data = byEntityOfficeData
      this.byTeamSubteamOptions.series[0].data = byTeamSimpleData.filter( team => team.value > 0)

    }
  },
  beforeCreate() {
    this.$store.dispatch('getTeams')
  }
}
</script>
