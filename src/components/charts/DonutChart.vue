<template>
  <svg width="500" height="300" />
</template>

<script>
import * as d3 from "d3";
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

    this.pieG = this.chartLayer
      .append("g")
      .attr(
        "transform",
        `translate(${this.chartWidth / 2}, ${this.chartHeight / 2})`
      );

    this.drawChart(this.donutChartData);
  },
  props: {
    donutChartData: Array,
    method: { type: Function }
  },
  watch: {
    donutChartData: function(newData) {
      this.drawChart(newData);
    }
  },
  methods: {
    drawChart: function(data) {
      const startingArc = d3
        .arc()
        .outerRadius(this.chartHeight / 5)
        .innerRadius(this.chartHeight / 2);

      const total = data.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

      this.pieG.selectAll("*").remove();

      let arc1 = d3
        .arc()
        .outerRadius(this.chartHeight / 2)
        .innerRadius(this.chartHeight / 5);

      let arc2 = d3
        .arc()
        .outerRadius(this.chartHeight / 1.8)
        .innerRadius(this.chartHeight / 5);

      this.pieG
        .append("text")
        .text(total)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-weight", "bold")
        .style("font-size", 16)
        .style("fill", "#4A5889");

      var arcs = d3
        .pie()
        .sort(null)
        .value(function(d) {
          return d.value;
        })(data);
      var block = this.pieG.selectAll(".arc").data(arcs);

      var newBlock = block
        .enter()
        .append("g")
        .attr("class", "arc");

      newBlock
        .append("path")
        .attr("class", d => {
          return d.data.name.split(" ").join("") + "_arc";
        })
        .attr("d", arc1)
        .attr("id", function(d, i) {
          return "arc-" + i;
        })
        .on("mouseover", d => {
          d3.select("." + d.data.name.split(" ").join("") + "_arc")
            .transition()
            //.duration(200)
            .attr("d", arc2);
        })
        .on("mouseout", d => {
          d3.select("." + d.data.name.split(" ").join("") + "_arc")
            .transition()
            //.duration(200)
            .attr("d", arc1);
        })
        .attr("stroke", "#fff")
        .attr("fill", d => d.data.color)
        .transition()
        .duration(200)
        .attr(
          "d",
          d3
            .arc()
            .outerRadius(d => {
              return d.data.isSelected
                ? this.chartHeight / 1.8
                : this.chartHeight / 2;
            })
            .innerRadius(this.chartHeight / 5)
        );

      newBlock
        .append("text")
        .attr("transform", function(d) {
          return "translate(" + startingArc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d, i) {
          return d.data.value;
        })
        .style("fill", "#fff")
        .style("font-weight", "bold")
        .style("pointer-events", "none");
    }
  }
};
</script>