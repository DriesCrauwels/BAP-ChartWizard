// JavaScript Library Document
// Library.js

var charts = charts || {};

(function () {
        //General variables
        var margin = {
                top: 0,
                right: 0,
                bottom: 76,
                left: 76
        };


        var svgWidth = 1080 - margin.left - margin.right,
                svgHeight = 400 - margin.top - margin.bottom;

        var HDsvgWidth = 1920,
                HDsvgHeight = 1080;
                
        charts.infographic = function (type) {
                 var graphicType;
                 
                 graphicType = type;
                 switch(graphicType){
                     case "DNA-graphic":
                     
                     charts.infographic.DNAgraphic = function (divclass) {
                         
                            var rectangleWidth = HDsvgWidth / 2;
                            var rectangleHeight = HDsvgHeight / 2;
                         
                            var rectangle = d3.select(divclass).selectAll("svg")
                                .data(d3.range(4).map(function() { return {x: rectangleWidth / 2, y: rectangleHeight / 2}; }))
                                .enter().append("svg")
                                //Give all svg's a unique class
                                .attr("class",(function (d,i) { return "main-rectangle" + i; }))
                                .attr("width", rectangleWidth)
                                .attr("height", rectangleHeight)
                                .style(  {"float": "left",
                                          "border-bottom": "solid 2px #ccc",
                                          "border-right": "solid 2px #ccc",
                                          "margin-right": "-1px",
                                          "margin-bottom": "-1px"});


                                        
                                charts.infographic.DNAgraphic.DrawCircle = function (inputradius) 
                                {
                                    var radius = inputradius;
                                                                var drag = d3.behavior.drag()
                                        .origin(function(d) { return d; })
                                        .on("drag", dragmove);
                                    var circle = rectangle.append("circle")
