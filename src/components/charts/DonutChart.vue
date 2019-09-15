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
    // this.startingArc = d3
    //   .arc()
    //   .outerRadius(this.chartHeight / 5)
    //   .innerRadius(this.chartHeight / 2);
    //.padAngle(0.03);
    //.cornerRadius(8);
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
    // method: { type: Function }
  },
  watch: {
    donutChartData: function(newData) {
      //console.log("newData", newData);
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
      //block.select("path").attr("d", this.arc);
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
              return d.data.isSelected
                ? this.chartHeight / 1.8
                : this.chartHeight / 2;
            })
            .innerRadius(this.chartHeight / 5)
        )
        .attr("id", function(d, i) {
          return "arc-" + i;
        })
        .on("mouseover", d => {
          //console.log("mouseover");
          //this.$emit("send-mouseover", d.data.name);
        })
        .on("mouseout", d => {
          //console.log("mouseout");
          //this.$emit("send-mouseout", d.data.name);
        })
        .attr("stroke", "#fff")
        .attr("fill", d => d.data.color);
      // .style("opacity", 0)
      // .transition()
      // .duration(500)
      // .style("opacity", 1);

      newBlock
        .append("text")
        .attr("transform", function(d) {
          // console.log(this.startingArc);
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