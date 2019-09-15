<template>
  <svg width="500" height="300" />
</template>

<script>
import * as d3 from "d3";

export default {
  mounted: function() {
    var svg = d3.select(this.$el),
      margin = { top: 35, left: 35, bottom: 0, right: 0 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    this.chartLayer = svg.append("g");

    this.x = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    this.y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

    this.xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "x-axis");

    this.yAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis");

    this.drawChart(this.stackedBarChartData);
  },
  props: {
    stackedBarChartData: Array,
    method: { type: Function }
  },
  watch: {
    stackedBarChartData: function(newData) {
      this.drawChart(newData);
    }
  },
  methods: {
    drawChart: function(data) {
      var keys = d3.keys(data[0]).slice(1);

      var z = d3
        .scaleOrdinal()
        .range(["#4A5889", "#B53446", "#FFC300", "#347F6E"])
        .domain(keys);

      var speed = 0;

      data.forEach(function(d) {
        d.total = d3.sum(keys, k => +d[k]);
        return d;
      });

      this.y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

      this.yAxis
        .transition()
        .duration(speed)
        .call(d3.axisLeft(this.y).ticks(null, "s"));

      this.x.domain(data.map(d => d.Date));

      this.xAxis
        .transition()
        .duration(speed)
        .call(d3.axisBottom(this.x).tickSizeOuter(0));

      var group = this.chartLayer
        .selectAll("g.layer")
        .data(d3.stack().keys(keys)(data), d => d.key);

      group.exit().remove();

      group
        .enter()
        .append("g")
        .classed("layer", true)
        .attr("fill", d => z(d.key));

      var bars = this.chartLayer
        .selectAll("g.layer")
        .selectAll("rect")
        .data(d => d, e => e.data.Date);

      bars.exit().remove();

      bars
        .enter()
        .append("rect")
        .attr("width", this.x.bandwidth())
        .merge(bars)
        .transition()
        .duration(speed)
        .attr("x", d => this.x(d.data.Date))
        .attr("y", d => this.y(d[1]))
        .attr("height", d => this.y(d[0]) - this.y(d[1]));

      var text = this.chartLayer.selectAll(".text").data(data, d => d.Date);

      text.exit().remove();

      text
        .enter()
        .append("text")
        .attr("class", "text")
        .attr("text-anchor", "middle")
        .merge(text)
        .transition()
        .duration(speed)
        .attr("x", d => this.x(d.Date) + this.x.bandwidth() / 2)
        .attr("y", d => this.y(d.total) - 5)
        .text(d => d.total);
    }
  }
};
</script>