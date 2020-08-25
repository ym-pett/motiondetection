var COLORS = {
  front: "#FF0000",
  vertical: "#00FF00",
  lateral: "#0000FF",
};

var RECTS = {
  "1": "orange",
  "2": "pink",
  "3": "purple",
  "4": "green",
};

(function (element) {
  require(["d3"], function (d3) {

    var margin = { top: 10, right: 30, bottom: 30, left: 60 };
    var width = 800 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var svg = d3.select(element.get(0)).append("svg").attr("width", width)
        .attr("height", height);

    
    // access df.json created by the cell above
    d3.json("df.json").then(function (json) {
      d3.json("activities.json").then(function(adata) {
      var data = json;

      
      var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.time; }))
        .range([0, width]);
      var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([-2, 2])
        .range([height, 0]);
      var yAxis = svg.append("g")
        .call(d3.axisLeft(y));

      var clip = svg.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

        
          var paData = adata.filter(function (d) { return d.participant === "d1p01M" });
          //for (var j = 0; j < paData.length; j ++) {
            var activityRects = svg.selectAll("activity")
              .data(paData)
              .enter()
              .append("rect")
              .attr("x", function(d) { return x(d.start_time) })
              .attr("y", 0)
              .attr("width", function(d) { return  x(d.end_time) - x(d.start_time) })
              .attr("height", height)
              .attr("fill", function(d) { return RECTS[d.activity]})
              .attr("opacity", 0.3);
          //}
   

      var pData = data.filter(function (d) { return d.participant === "d1p01M" });
      var sensorData = {};
      var scatterData = {};
      for (var i = 0; i < 3; i++) {
        var sensor = Object.keys(COLORS)[i];
        console.log(i, sensor)
        sensorData[sensor] = svg.append("path")
          .datum(pData)
          .attr("fill", "none")
          .attr("stroke", COLORS[sensor])
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function (d) { return x(d.time) })
            .y(function (d) { return y(d[sensor]) })
          );
        scatterData[sensor] = svg.selectAll("dot")
          .data(pData)
          .enter()
          .append("circle")
          .attr("cx", function (d) { return x(d.time); })
          .attr("cy", function (d) { return y(d[sensor]); })
          .attr("r", 2)
          .style("fill", COLORS[sensor])
          .style("opacity", 0.5);
      }

      

      var zoom = d3.zoom()
        .scaleExtent([1, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
        .extent([[0, 0], [width, height]])
        .on("zoom", updateChart);

      // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);


      

      function updateChart() {
        console.log("here")
        var newX = d3.event.transform.rescaleX(x);
        var newY = y; //d3.event.transform.rescaleY(y);

        // update axes with these new boundaries
        xAxis.call(d3.axisBottom(newX))
        yAxis.call(d3.axisLeft(newY))

        for (var i = 0; i < 3; i++) {
          var sensor = Object.keys(COLORS)[i];
          var path = sensorData[sensor];
          path.attr("d", d3.line()
            .x(function (d) { return newX(d.time) })
            .y(function (d) { return newY(d[sensor]) })
          );

          var scatter = scatterData[sensor];
          scatter.attr("cx", function (d) { return newX(d.time); })
            .attr("cy", function (d) { return newY(d[sensor]); })

        }

        activityRects.attr("x", function(d) { return newX(d.start_time) })
             
              .attr("width", function(d) { return  newX(d.end_time) - newX(d.start_time) })
      }

    });


    });
  });

})(element);