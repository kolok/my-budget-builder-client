<template>
  <svg width="500" height="300" />
</template>

<script>
import * as d3 from "d3";

export default {
  mounted: function() {
    var svg = d3.select(this.$el),
      margin = { top: 35, left: 35, bottom: 0, right: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    this.margin = { top: 35, left: 35, bottom: 0, right: 40 };
    this.width = +svg.attr("width") - margin.left - margin.right;
    this.height = +svg.attr("height") - margin.top - margin.bottom;

    this.chartLayer = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`);

    this.y = d3.scaleLinear().rangeRound([height - margin.bottom, margin.top]);

    this.xAxis = svg
      .append("g")
      .attr("transform", `translate(${0},${height - margin.bottom})`)
      .attr("class", "x-axis");

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
    drawChart: function(data0) {
      var keys = d3.keys(data0[0]).slice(1);
      d3.select("._label").remove();
      function findValue(o, value) {
        for (var prop in o) {
          if (o.hasOwnProperty(prop) && +o[prop] === value) {
            return prop;
          }
        }
        return null;
      }

      var z = d3
        .scaleOrdinal()
        .range(["#4A5889", "#B53446", "#FFC300", "#347F6E"])
        .domain(keys);

      let x = d3
        .scaleBand()
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0.2);

      var speed = 0;

      const data = data0.map(function(d) {
        let total = d3.sum(keys, k => +d[k]);
        return { ...d, total };
      });

      this.y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

      // this.yAxis
      //   .transition()
      //   .duration(speed)
      //   .call(d3.axisLeft(this.y).ticks(null, "s"));

      // this.x.domain(data.map(d => d.Date));

      var todayIndex = data.reduce((acc, cur, i) => {
        var current = cur.Date === "TODAY" ? i : 0;
        return acc + current;
      }, 0);

      var bandwidth = this.width / (data.length * 1.2);

      x = d3
        .scaleOrdinal()
        .domain(data.map(d => d.Date))
        .range(
          data.map((d, i) => {
            return i === todayIndex
              ? this.width * ((i * 10) / 100) + bandwidth / 2
              : i > todayIndex
              ? this.width * ((i * 10) / 100) + bandwidth
              : this.width * ((i * 10) / 100);
          })
        );

      this.xAxis
        .attr(
          "transform",
          `translate(${this.margin.left + bandwidth / 2},${this.height -
            this.margin.bottom})`
        )
        .transition()
        .duration(speed)
        .call(d3.axisBottom(x).tickSizeOuter(0));

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
        .data(
          d => d,
          e => {
            return e.data.Date;
          }
        );

      bars.exit().remove();

      bars
        .enter()
        .append("rect")
        .attr("class", (d, i) => {
          var desiredKey =
            d[1] === d.data.total
              ? keys[keys.length - 1]
              : findValue(d.data, d[1] - d[0]);

          return d.data.Date + desiredKey.split(" ").join("");
        })
        .on("mouseover", d => {
          if (d.data.Date === "TODAY") {
            var desiredKey =
              d[1] === d.data.total
                ? keys[keys.length - 1]
                : findValue(d.data, d[1] - d[0]);

            var bbox = d3
              .select("." + d.data.Date + desiredKey.split(" ").join(""))
              .node()
              .getBBox();

            d3.select("." + d.data.Date + desiredKey.split(" ").join(""))
              .transition()
              .attr("x", x(d.data.Date) - bandwidth / 4)
              .attr("width", d => bandwidth + bandwidth / 2);
            // .style("transform", "scale(1.4,1)")
            // .style("transform-origin", "58% 50%");

            this.chartLayer
              .append("text")
              .attr(
                "class",
                d.data.Date + desiredKey.split(" ").join("") + "_label"
              )
              .text(d[1] - d[0])
              .style("font-weight", "bold")
              .style("fill", "#fff")
              .style("pointer-events", "none")
              .style("text-anchor", "middle")
              .style("alignment-baseline", "middle")
              .attr("x", bbox.x + bbox.width / 2)
              .attr("y", bbox.y + bbox.height / 2);

            this.$emit("send-mouseover", desiredKey);
          }
        })
        .on("mouseout", d => {
          if (d.data.Date === "TODAY") {
            var desiredKey =
              d[1] === d.data.total
                ? keys[keys.length - 1]
                : findValue(d.data, d[1] - d[0]);

            d3.select(
              "." + d.data.Date + desiredKey.split(" ").join("") + "_label"
            ).remove();

            d3.select("." + d.data.Date + desiredKey.split(" ").join(""))
              .transition()
              .attr("x", x(d.data.Date))
              .attr("width", d => bandwidth);

            this.$emit("send-mouseout", desiredKey);
          }
        })
        .merge(bars)
        .attr("x", d => x(d.data.Date))
        .attr("width", bandwidth)
        .transition()
        .attr("y", d => this.y(d[1]))
        .attr("height", d => this.y(d[0]) - this.y(d[1]))
        .attr("x", d => {
          if (d.data.Date === "TODAY") {
            var desiredKey =
              d[1] === d.data.total
                ? keys[keys.length - 1]
                : findValue(d.data, d[1] - d[0]);

            if (d.data.selected === desiredKey) {
              var bbox = d3
                .select("." + d.data.Date + desiredKey.split(" ").join(""))
                .node()
                .getBBox();

              this.chartLayer
                .append("text")
                .attr("class", "_label")
                .text(d[1] - d[0])
                .style("font-weight", "bold")
                .style("fill", "#fff")
                .style("pointer-events", "none")
                .style("text-anchor", "middle")
                .style("alignment-baseline", "middle")
                .attr("x", bbox.x + bbox.width / 2)
                .attr("y", bbox.y + bbox.height / 2);

              return x(d.data.Date) - bandwidth / 4;
            }
          } else {
          }

          return x(d.data.Date);
        })
        .attr("width", d => {
          if (d.data.Date === "TODAY") {
            var desiredKey =
              d[1] === d.data.total
                ? keys[keys.length - 1]
                : findValue(d.data, d[1] - d[0]);

            if (d.data.selected === desiredKey) {
              return bandwidth + bandwidth / 2;
            }
          }
          return bandwidth;
        });

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
        .attr("x", d => x(d.Date) + bandwidth / 2)
        .attr("y", d => this.y(d.total) - 5)
        .text(d => d.total);
    }
  }
};
</script>