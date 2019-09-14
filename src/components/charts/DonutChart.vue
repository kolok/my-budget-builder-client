<template>
  <svg width="500" height="300" />
</template>

<script>
const d3 = require("d3");
export default {
  mounted: function() {
    var svg = d3.select(this.$el);
    var width = +svg.attr("width");
    var height = +svg.attr("height");
    var margin = { top: 20, left: 0, bottom: 30, right: 0 };
    this.chartWidth = width - (margin.left + margin.right);
    this.chartHeight = height - (margin.top + margin.bottom);
    this.chartLayer = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // this.arc = d3
    //   .arc()
    //   .outerRadius(chartHeight / 2)
    //   .innerRadius(chartHeight / 5);
    //.padAngle(0.03);
    //.cornerRadius(8);
    this.pieG = this.chartLayer
      .append("g")
      .attr(
        "transform",
        `translate(${this.chartWidth / 2}, ${this.chartHeight / 2})`
      );

    console.log(this.donutChartData);
    this.drawChart(this.donutChartData);
  },
  props: ["donutChartData"],
  watch: {
    donutChartData: function(newData) {
      this.drawChart(newData);
    }
  },
  methods: {
    drawChart: function(data) {
      var arcs = d3
        .pie()
        .sort(null)
        .value(function(d) {
          return d.value;
        })(data);
      var block = this.pieG.selectAll(".arc").data(arcs);
      block.select("path").attr("d", this.arc);
      var newBlock = block
        .enter()
        .append("g")
        .classed("arc", true);
      newBlock
        .append("path")
        .attr(
          "d",
          d3
            .arc()
            .outerRadius(d => {
              console.log(d);
              return d.data.isSelected
                ? this.chartHeight / 1.8
                : this.chartHeight / 2;
            })
            .innerRadius(this.chartHeight / 5)
        )
        .attr("id", function(d, i) {
          return "arc-" + i;
        })
        //.attr("stroke", "gray")
        .attr("fill", d => d.data.color);
      // newBlock
      //   .append("text")
      //   .attr("dx", 10)
      //   .attr("dy", -5)
      //   .append("textPath")
      //   .attr("xlink:href", function(d, i) {
      //     return "#arc-" + i;
      //   })
      //   .text(function(d) {
      //     return d.data.name;
      //   });
    }
  }
};
</script>