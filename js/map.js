var center, countries, height, path, projection, scale, svg, width, citiesData;

width = 780;
height = 700;
center = [12, 61];
scale = 1000;

projection = d3.geo.mercator().scale(scale).translate([width/2 , 0]).center(center);
path = d3.geo.path().projection(projection);
svg = d3.select("#map").append("svg").attr("height", height).attr("width", width);
countries = svg.append("g");
citiesGroup = svg.append("g");
labels =svg.append("g");

svg.append("circle")
  .attr("cx", projection([-3.70379, 40.416775])[0])
  .attr("cy", projection([-3.70379, 40.416775])[1])
  .attr("r", 10)
  .style("fill", "#f6bd6a")
  .classed("manolo", true);
svg.append("circle")
  .attr("cx", projection([2.352222, 48.856614])[0])
  .attr("cy", projection([2.352222, 48.856614])[1])
  .attr("r", 10)
  .style("fill", "#B17084")
  .classed("diana", true);

d3.json("data/eu.topojson", function(data) {
  countries.selectAll('.country')
  .data(topojson.feature(data, data.objects.europe).features)
  .enter()
  .append('path')
  .attr('class', 'country')
  .attr('d', path)
  .attr("fill", "#413E4A");
  return;
});
//cities
d3.csv("data/cities.csv", function(data) {
  citiesData = data;
  
 //  citiesGroup.selectAll("circle")
 //  .data(data)
 //  .enter()
 //  .append("circle")
 //  .attr("cx", function(d) {
 //   return projection([d.lon, d.lat])[0];
 // })
 //  .attr("cy", function(d) {
 //   return projection([d.lon, d.lat])[1];
 // })
 //  .attr("r", 5)
 //  .style("fill", "yellow")
 //  .style("opacity", 0.75);
//city labels
  labels.selectAll(".city-label")
  .data(data)
  .enter().append("text")
  .attr("class", function(d) { return "city-label notVisible " + d.city; })
  .attr("dx", function(d) {
   return projection([d.lon, d.lat])[0];
 })
  .attr("dy", function(d) {
   return projection([d.lon, d.lat])[1]-12;
 })
  .text(function(d) { return d.city; });        
   

});
