<template>
  <div>
    <div>
      <ContentMenu activeName="d3" />

      <div class="GoogleChart" style="display:flex;flex-direction:row">
        <div id="donutChart">
          <DonutChart
            :donutChartData="donutChartData"
            @send-mouseover="mouseOverForBarChart"
            @send-mouseout="mouseOutForBarChart"
          />
        </div>
        <div id="stackedBarChart">
          <StackedBarChart
            :stackedBarChartData="stackedBarChartData"
            @send-mouseover="mouseOver"
            @send-mouseout="mouseOut"
          />
        </div>
      </div>
    </div>
    <ChartLegend />

    <div style="display:flex;flex-direction:row;justify-content:start;align-items:center;">
      <div style="margin-left:20px;">
        <el-button type="primary" icon="el-icon-plus" @click="updateData">Update data</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const donutChartData = [
  { name: "New-York", value: 148, color: "#4A5889", isSelected: false },
  { name: "Los Angeles", value: 128, color: "#B53446", isSelected: false },
  { name: "London", value: 42, color: "#FFC300", isSelected: false },
  { name: "Paris", value: 42, color: "#347F6E", isSelected: false }
];

const stackedBarChartData = [
  {
    Date: "JAN 19",
    "New-York": "140",
    "Los Angeles": "125",
    London: "40",
    Paris: "20"
  },
  {
    Date: "FEV 19",
    "New-York": "141",
    "Los Angeles": "122",
    London: "40",
    Paris: "25"
  },
  {
    Date: "MAR 19",
    "New-York": "144",
    "Los Angeles": "121",
    London: "40",
    Paris: "30"
  },
  {
    Date: "AVR 19",
    "New-York": "144",
    "Los Angeles": "121",
    London: "41",
    Paris: "32"
  },
  {
    Date: "MAI 19",
    "New-York": "144",
    "Los Angeles": "121",
    London: "41",
    Paris: "35"
  },
  {
    Date: "JUN 19",
    "New-York": "146",
    "Los Angeles": "125",
    London: "41",
    Paris: "40"
  },
  {
    Date: "TODAY",
    "New-York": "148",
    "Los Angeles": "128",
    London: "42",
    Paris: "42",
    selected: null
  },
  {
    Date: "JUL 19",
    "New-York": "150",
    "Los Angeles": "130",
    London: "43",
    Paris: "45"
  },
  {
    Date: "AGU 19",
    "New-York": "152",
    "Los Angeles": "130",
    London: "45",
    Paris: "50"
  },
  {
    Date: "SEP 19",
    "New-York": "160",
    "Los Angeles": "140",
    London: "46",
    Paris: "60"
  }
];

// Color for the Graph
// Bleu: 74/88/137 , #4A5889
// Rouge: 181/52/70 , #B53446
// Jaune: 255/195/0 , #FFC300
// Vert: 54/127/110 , #347F6E

/*
['JAN 19', 140, 125, 40, 20, 325],
['FEV 19', 141, 122, 40, 25, 328],
['MAR 19', 144, 121, 40, 30, 335],
['AVR 19', 144, 121, 41, 32, 338],
['MAI 19', 144, 121, 41, 35, 341],
['JUN 19', 146, 125, 41, 40, 352],
['TODAY',  148, 128, 42, 42, 360],
['JUL 19', 150, 130, 43, 45, 368],
['AGU 19', 152, 130, 45, 50, 377],
['SEP 19', 160, 140, 46, 60, 406]
]
this.donutChartData = [
['Office', 'Headcount'],
['New-York', 150],
['Los Angeles', 118],
['London', 46],
['Paris', 30],
*/

import VueApexCharts from "vue-apexcharts";

import DonutChart from "../../components/charts/DonutChart.vue";
import StackedBarChart from "../../components/charts/StackedBarChart.vue";
import ContentMenu from "../../components/common/ContentMenu.vue";
import ChartLegend from "../../components/charts/ChartLegend.vue";

let baseAnnotationsPointsLabel = {
  borderWidth: 0,
  offsetY: 0,
  style: {
    color: "#606266"
  }
};

export default {
  components: {
    VueApexCharts,
    ContentMenu,
    ChartLegend,
    DonutChart,
    StackedBarChart
  },
  data() {
    return {
      donutChartData: donutChartData,
      stackedBarChartData: stackedBarChartData,
      dataVersion: 1
    };
  },
  methods: {
    mouseOver(value) {
      this.donutChartData = this.donutChartData.map(d => {
        return d.name === value ? { ...d, isSelected: true } : d;
      });
    },
    mouseOverForBarChart(value) {
      this.stackedBarChartData = this.stackedBarChartData.map(d => {
        return d.Date === "TODAY" ? { ...d, selected: value } : d;
      });
    },

    mouseOut(value) {
      this.donutChartData = this.donutChartData.map(d => {
        return d.name === value ? { ...d, isSelected: false } : d;
      });
    },
    mouseOutForBarChart(value) {
      this.stackedBarChartData = this.stackedBarChartData.map(d => {
        return d.Date === "TODAY" ? { ...d, selected: null } : d;
      });
    },
    updateData: function() {
      this.stackedBarChartData = this.stackedBarChartData.map(d => {
        if (+d["New-York"] < 50) {
          return {
            ...d,
            "New-York": +d["New-York"] + 50
          };
        }
        return { ...d, Paris: +d.Paris + 10, "New-York": +d["New-York"] - 40 };
      });

      this.donutChartData = this.donutChartData.map(d => {
        return d.name === "Paris" ? { ...d, value: +d.value + 10 } : d;
      });
    }
  }
};
</script>
