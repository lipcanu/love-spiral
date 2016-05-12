
function drawGraphs(physicallyTogether, totalTogether){

//Width and height
var w = 200;
var h = 200;

var dataset = [ physicallyTogether, totalTogether-physicallyTogether ];
console.log(dataset);

var outerRadius = w / 2;
var innerRadius = w / 3;
var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

var pie = d3.layout.pie();


//Create SVG element
var svg = d3.select("#pieChart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

//Set up groups
var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
      return color(i);
    })
    .attr("d", arc);

//Labels
arcs.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d.value;
    });

}

function drawBars(maxTimeApart, maxTimeTogether){
var data = [maxTimeTogether, maxTimeApart];

var width = 250,
    barHeight = 40;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

//Create SVG element

var chart = d3.select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1)
    .attr("fill", function(d, i) {
      return color(i);
    });

bar.append("text")
    .attr("x", function(d) { return x(d) - 30; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
}

function citiesText(citiesVisited){
  d3.select(".citiesNo span")
    .append("text")
    .text(citiesVisited);
}