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
												.attr("r", radius)
												.attr("cx", function(d) { return d.x; })
												.attr("cy", function(d) { return d.y; })
												.call(drag);
									function dragmove(d) {
														  d3.select(this)
															  .attr("cx", d.x = Math.max(radius, Math.min(rectangleWidth - radius, d3.event.x)))
															  .attr("cy", d.y = Math.max(radius, Math.min(rectangleHeight - radius, d3.event.y)));
														}
								}
					 }
					 
					 break;

                	case "Solar-System-graphic":
				
					break;
					 
					 
				 }
		}

        charts.chart = function (chartType) {

                var chartType;

                chartType = chartType;

                switch (chartType) {
                case "BarChart":

                        //execute code block 1

                        charts.chart.Barchart = function (divclass) {


                                var barchart1 = d3.select(divclass)
                                        .append("svg")
                                        .attr("width", svgWidth + margin.left + margin.right)
                                        .attr("height", svgHeight + margin.top + margin.bottom)
                                        .attr("class", "barchart");



                                charts.chart.Barchart.Generate = function (inputdata,
                                        inputbarcolor,
                                        inputbarhovercolor,
                                        inputxAxisText,
                                        inputyAxisText,
                                        inputBarWidth
                                ) {
                                        //Remove previous data
                                        //data=[0];
                                        var data = inputdata;

                                        var xAxisText = inputxAxisText;
                                        var yAxisText = inputyAxisText;


                                        var barcolor = d3.rgb(inputbarcolor);
                                        var barhovercolor = d3.rgb(inputbarhovercolor);

                                        var datalength = Object.keys(data).length;

                                        // calculate width of each bar
                                        var barWidth = svgWidth / (datalength + inputBarWidth);

                                        var width = (barWidth + 10);
                                        var height = 200;

                                        //mappen voor de ordinale schaal
                                        var barLabels = data.map(function (data) {
                                                return data.key;
                                        });


                                        var maxValue = d3.max(data, function (d) {
                                                return +d.value;
                                        });


                                        //Scales are functions that map from an input domain to an output range. Ordinal scales have a 						
                                        //discrete domain, such as a set of names or categories. 

                                        var yScale = d3.scale.linear()
                                                .domain([0, maxValue])
                                                .range([svgHeight, 0]); //needs to be from max to zero to put the values from zero to top on the y axis

                                        var xScale = d3.scale.ordinal()
                                                .domain(barLabels)
                                                .rangeRoundBands([0, svgWidth], 0.1);


                                        var xAxis = d3.svg.axis()
                                                .scale(xScale)
                                                .orient("bottom");

                                        var yAxis = d3.svg.axis()
                                                .scale(yScale)
                                                .orient("left")
                                                .ticks(5);

                                        // add variable to set spacing
                                        var spacing = 1;

                                        //A tooltip for each bar
                                        var barTooltip = d3.tip()
                                                .attr("class", "d3-tip")
                                                .offset([-10, 0])
                                        //Remember quotes within quotes!!
                                        .html(function (d) {
                                                return "<strong>Value:</strong> <span style='color:steelblue'>" + d.value + "</span>";
                                        });

                                        barchart1 = d3.select(divclass).selectAll("svg");



                                        // create bars
                                        barchart1.selectAll('rect') // returns empty selection
                                        .data(data) // parses & counts data
                                        .enter() // binds data to placeholders
                                        .append('rect') // creates a rect svg element for every datum

                                        .attr('y', function (d) {
                                                return svgHeight; // position of the top of each bar
                                        })
                                                .attr('height', 0)
                                                .attr('width', barWidth)
                                                .attr('fill', barcolor);

                                        //LET THE BARS GROW!!!!
                                        barchart1.selectAll('rect')
                                                .transition()
                                                .duration(1000)
                                                .attr('y', function (d) {
                                                        return yScale(d.value);
                                                })
                                                .attr('x', function (d) { // left-to-right position of left edge of each
                                                        return xScale(d.key) + margin.left + 5; // bar plus margin
                                                })
                                                .attr('height', function (d) {
                                                        return svgHeight - yScale(d.value);
                                                })
                                                .attr('width', barWidth);

                                        barchart1.selectAll("rect")
                                                .on('mouseover.color', function () {

                                                        d3.select(this)
                                                                .attr('fill', barhovercolor);

                                                        // showValue(d);
                                                })
                                                .on('mouseout.color', function () {

                                                        d3.select(this)
                                                        //kickass transition
                                                        .transition()
                                                                .duration(500)
                                                                .attr('fill', barcolor);

                                                        // hideValue();
                                                })
                                                .on('mouseover.tooltip', barTooltip.show)
                                                .on('mouseout.tooltip', barTooltip.hide)
                                                .on('click', function () {
                                                        alert("Clicky");
                                                });



                                        barchart1.call(barTooltip);

                                        barchart1.selectAll("g.axis").remove();

                                        barchart1.selectAll("text")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });

                                        barchart1.append("g")
                                                .attr("class", "axis xAxis")
                                                .attr("transform", "translate(80," + (svgHeight) + ")") //push to the bottom and shift 50px to the right
                                        .call(xAxis)
                                                .append("text")
                                                .attr("class", "xAxisText")
                                                .attr("y", 50) //Hoever van den as verwijdert ten opzichte van de y as
                                        .attr("x", svgWidth / 2)
                                                .text(xAxisText)
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 18,
														"fill":"#CCC"
                                                });




                                        barchart1.append("g")
                                                .attr("class", "axis yAxis")
                                                .attr("transform", "translate(80," + 0 + ")")
                                                .call(yAxis)
                                                .append("text")
                                                .attr("class", "yAxisText")
                                                .attr("transform", "rotate(-90)")
                                                .attr("y", -50)
                                                .attr("x", -svgHeight / 2)
                                                .text(yAxisText)
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 18,
														"fill":"#CCC"
                                                });

                                        //inline CSS styling
                                        barchart1.selectAll("path")
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "#CCC",
                                                        "shape-rendering": "crispEdges"
                                                });

                                        barchart1.selectAll("line")
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "#CCC",
                                                        "shape-rendering": "crispEdges"
                                                });

                                        //Give all X values a class and style them
                                        barchart1.selectAll(".axis.xAxis g text").attr("class", "xAxisValues")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });

                                        //Give all Y values a class and style them
                                        barchart1.selectAll(".axis.yAxis g text").attr("class", "yAxisValues")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });




                                        // Update the Axis
                                        barchart1.selectAll("g.y.axis")
                                                .call(yAxis);

                                        barchart1.selectAll("g.x.axis")
                                                .call(xAxis);



                                        charts.chart.Barchart.Generate.RotateXaxisValues = function (inputstate) {
                                                //Rotate
                                                if (inputstate == true) {
                                                        texts = barchart1.selectAll(".xAxisValues")
                                                                .style("text-anchor", "end")
                                                                .attr("dx", "-.8em")
                                                                .attr("dy", ".15em")
                                                                .attr("transform", function (d) {
                                                                        return "rotate(-65)"
                                                                });
                                                }
                                                //Rotate them back
                                                else {
                                                        texts = barchart1.selectAll(".xAxisValues")
                                                                .style("text-anchor", "middle")
                                                                .attr("dx", "0em")
                                                                .attr("dy", "1em")
                                                                .attr("transform", function (d) {
                                                                        return "rotate(0)"
                                                                });
                                                }
                                        }


                                        charts.chart.Barchart.Generate.UpdateYaxisName = function (inputtext) {
                                                yAxisText = inputtext;

                                                barchart1.select(".yAxisText")
                                                        .text(inputtext);
                                        }

                                        charts.chart.Barchart.Generate.UpdateXaxisName = function (inputtext) {
                                                xAxisText = inputtext;
                                                barchart1.select(".xAxisText")
                                                        .text(inputtext);
                                        }

                                        charts.chart.Barchart.Generate.UpdateBarColor = function (inputcolor) {
                                                barcolor = d3.rgb(inputcolor);


                                                barchart1.selectAll('rect')
                                                        .transition()
                                                        .duration(1000)
                                                        .attr('fill', barcolor);

                                        }

                                        charts.chart.Barchart.Generate.UpdateBarHoverColor = function (inputcolor) {

                                                barhovercolor = d3.rgb(inputcolor);

                                                barchart1.selectAll("rect")
                                                        .on('mouseover.color', function () {

                                                                d3.select(this)
                                                                        .attr('fill', barhovercolor);
                                                        })
                                                        .on('mouseout.color', function () {

                                                                d3.select(this)
                                                                //kickass transition
                                                                .transition()
                                                                        .duration(500)
                                                                        .attr('fill', barcolor);

                                                        });
                                        }

                                        charts.chart.Barchart.Generate.SortbarsByValue = function () {

                                                var x0 = xScale.domain(data.sort(this.checked ? function (a, b) {
                                                                return b.value - a.value;
                                                        } : function (a, b) {
                                                                return d3.descending(a.value, +b.value);
                                                        })
                                                        .map(function (d) {
                                                                return d.key;
                                                        }))
                                                        .copy();

                                                var transition = barchart1.transition().duration(750),
                                                        delay = function (d, i) {
                                                                return i * 50;
                                                        };

                                                transition.selectAll("rect")
                                                        .delay(delay)
                                                        .attr("x", function (d) {
                                                                return x0(d.key) + margin.left + 5;
                                                        });

                                                transition.select(".axis.xAxis")
                                                        .call(xAxis)
                                                        .selectAll("g")
                                                        .delay(delay);

                                        }

                                        charts.chart.Barchart.Generate.SortbarsByName = function () {

                                                var x0 = xScale.domain(data.sort(this.checked ? function (a, b) {
                                                                return b.value - a.value;
                                                        } : function (a, b) {
                                                                return d3.ascending(a.key, b.key);
                                                        })
                                                        .map(function (d) {
                                                                return d.key;
                                                        }))
                                                        .copy();

                                                var transition = barchart1.transition().duration(750),
                                                        delay = function (d, i) {
                                                                return i * 50;
                                                        };

                                                transition.selectAll("rect")
                                                        .delay(delay)
                                                        .attr("x", function (d) {
                                                                return x0(d.key) + margin.left + 5;
                                                        });

                                                transition.select(".axis.xAxis")
                                                        .call(xAxis)
                                                        .selectAll("g")
                                                        .delay(delay);

                                        }



                                }



                        }

                        break;

                case "PieChart":

                        charts.chart.Piechart = function (divclass) {
                                var xCenter = svgWidth / 2;
                                var yCenter = svgHeight / 2;

                                var piechart1 = d3.select(divclass)
                                        .append("svg")
                                        .attr("class", "piechart")
										.attr("id", "donut-chart-svg")
                                        .attr("width", svgWidth + margin.left + margin.right)
                                        .attr("height", svgHeight + margin.top + margin.bottom)
                                        .append("g")
										.attr("class","donutchart-group")
                                        .attr("transform", "translate(" + (xCenter + 40) + "," + (yCenter + 40) + ")");




                                charts.chart.Piechart.Generate = function (inputdata, inputOuterRadius, inputInnerRadius) {


                                        var data = inputdata;
                                        var sum = d3.sum(data, function (d) {
                                                return d.value;
                                        });
                                        var max = d3.max(data, function (d) {
                                                return d.value;
                                        });

                                        var datalength = Object.keys(data).length;

                                        piechart1 = d3.select(divclass).selectAll("svg").selectAll("g");

                                        //remove previous slices labels and lines
                                        piechart1.selectAll(".slices").remove();
                                        piechart1.selectAll(".labels").remove();
                                        piechart1.selectAll(".lines").remove();

                                        piechart1.append("g")
                                                .attr("class", "slices");
												
                                        piechart1.append("g")
                                                .attr("class", "labels");

                                        piechart1.append("g")
                                                .attr("class", "lines");



                                        var radius = (Math.min(svgWidth, svgHeight) / 2) * inputOuterRadius;

                                        var color = d3.scale.ordinal()
                                                .domain([0, datalength])
                                                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


                                        var innerRadius = inputInnerRadius;

                                        //converteert data element naar angles
                                        var pie = d3.layout.pie()
                                                .sort(null)
                                                .value(function (d) {
                                                        return d.value;
                                                });

                                        //vorige arcs verwijderen


                                        var arc = d3.svg.arc()
                                                .outerRadius(radius - 10)
                                                .innerRadius(innerRadius);

                                        var outerArc = d3.svg.arc()
                                                .innerRadius(radius * 0.8)
                                                .outerRadius(radius * 0.9);


                                        /* ------- PIE SLICES -------*/
                                        var slice = piechart1.select(".slices").selectAll("path.slice")
                                                .data(pie(data), data.key);

                                        slice.enter()


                                                .append("path")
                                                .attr("d", arc)
                                                .style("fill", function (d) {
                                                        return color(d.data.value);
                                                })
                                                .attr("class", "slice");



                                        piechart1.selectAll("path.slice")
                                                .on('mouseover.opacity', function () {

                                                        d3.select(this)
                                                                .style({
                                                                        "opacity": ".3"
                                                                });

                                                })
                                                .on('mouseout.opacity', function () {

                                                        d3.select(this)
                                                        //kickass transition
                                                        .transition()
                                                                .duration(500)
                                                                .style({
                                                                        "opacity": "1"
                                                                });

                                                        // hideValue();
                                                })
                                                .on('mouseover.placepercentage', function (d) {

                                                        var percentage = (100 * d.value / sum).toPrecision(2);
                                                        var percentageString = percentage + "%";
                                                        if (percentage < 0.1) {
                                                                percentageString = "< 0.1%";
                                                        }

                                                        d3.select("#value")
                                                                .text(percentageString)
                                                                .style({
                                                                        "opacity": "1",
                                                                        "text-align": "center",
                                                                        "font-size": "24px",
                                                                        "color": "#CCC",
                                                                        "z-index": "-1",
                                                                        "font-family": "sans-serif"
                                                                })
                                                })

                                        .on('click', function () {
                                                alert("Clicky");
                                        });


                                        /* ------- TEXT LABELS -------*/

                                        var text = piechart1.select(".labels").selectAll("text")
                                                .data(pie(data), data.key);

                                        text.enter()
                                                .append("text")
                                                .attr("dy", ".35em")
                                                .text(function (d) {
                                                        return d.data.key;
                                                })
                                                .style({
                                                        "font-family": "sans-serif",
														"fill": "#CCC",
                                                        "font-size": 12
                                                });

                                        function midAngle(d) {
                                                return d.startAngle + (d.endAngle - d.startAngle) / 2;
                                        }

                                        text.transition().duration(5000)
                                                .attrTween("transform", function (d) {
                                                        this._current = this._current || d;
                                                        var interpolate = d3.interpolate(this._current, d);
                                                        this._current = interpolate(0);
                                                        return function (t) {
                                                                var d2 = interpolate(t);
                                                                var pos = outerArc.centroid(d2);
                                                                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                                                                return "translate(" + pos + ")";
                                                        };
                                                })
                                                .styleTween("text-anchor", function (d) {
                                                        this._current = this._current || d;
                                                        var interpolate = d3.interpolate(this._current, d);
                                                        this._current = interpolate(0);
                                                        return function (t) {
                                                                var d2 = interpolate(t);
                                                                return midAngle(d2) < Math.PI ? "start" : "end";
                                                        };
                                                });



                                        /* ------- SLICE TO TEXT POLYLINES -------*/

                                        var polyline = piechart1.select(".lines").selectAll("polyline")
                                                .data(pie(data), data.key);

                                        polyline.enter()
                                                .append("polyline");

                                        polyline.transition().duration(5000)
                                                .attrTween("points", function (d) {
                                                        this._current = this._current || d;
                                                        var interpolate = d3.interpolate(this._current, d);
                                                        this._current = interpolate(0);
                                                        return function (t) {
                                                                var d2 = interpolate(t);
                                                                var pos = outerArc.centroid(d2);
                                                                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                                                                return [arc.centroid(d2), outerArc.centroid(d2), pos];
                                                        };
                                                });

                                        piechart1.select(".lines").selectAll("polyline")
                                                .style({
                                                        "fill": "none",
                                                        "opacity": ".3",
                                                        "stroke": "#CCC",
                                                        "stroke-width": "2px"
                                                });


                                        charts.chart.Piechart.Generate.UpdateRadius = function (inputInnerRadius, inputOuterRadius) {
                                                radius = (Math.min(svgWidth, svgHeight) / 2) * inputOuterRadius;

                                                innerRadius = inputInnerRadius;

                                                arc = d3.svg.arc()
                                                        .outerRadius(radius - 10)
                                                        .innerRadius(innerRadius);

                                                outerArc = d3.svg.arc()
                                                        .innerRadius(radius * 0.8)
                                                        .outerRadius(radius * 0.9);


                                                piechart1.selectAll("path.slice").attr('d', arc);

                                                function midAngle(d) {
                                                        return d.startAngle + (d.endAngle - d.startAngle) / 2;
                                                }

                                                text.transition().duration(5000)
                                                        .attrTween("transform", function (d) {
                                                                this._current = this._current || d;
                                                                var interpolate = d3.interpolate(this._current, d);
                                                                this._current = interpolate(0);
                                                                return function (t) {
                                                                        var d2 = interpolate(t);
                                                                        var pos = outerArc.centroid(d2);
                                                                        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                                                                        return "translate(" + pos + ")";
                                                                };
                                                        })
                                                        .styleTween("text-anchor", function (d) {
                                                                this._current = this._current || d;
                                                                var interpolate = d3.interpolate(this._current, d);
                                                                this._current = interpolate(0);
                                                                return function (t) {
                                                                        var d2 = interpolate(t);
                                                                        return midAngle(d2) < Math.PI ? "start" : "end";
                                                                };
                                                        });



                                                /* ------- SLICE TO TEXT POLYLINES -------*/

                                                var polyline = piechart1.select(".lines").selectAll("polyline")
                                                        .data(pie(data), data.key);

                                                polyline.enter()
                                                        .append("polyline");

                                                polyline.transition().duration(5000)
                                                        .attrTween("points", function (d) {
                                                                this._current = this._current || d;
                                                                var interpolate = d3.interpolate(this._current, d);
                                                                this._current = interpolate(0);
                                                                return function (t) {
                                                                        var d2 = interpolate(t);
                                                                        var pos = outerArc.centroid(d2);
                                                                        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                                                                        return [arc.centroid(d2), outerArc.centroid(d2), pos];
                                                                };
                                                        });
                                        }
                                        charts.chart.Piechart.Generate.UpdateColor = function (inputselection, inputstartcolor, inputendcolor, inputcolorset) {
                                                if (inputselection == "colorgradient") {
                                                        color = d3.scale.linear()
                                                                .domain([0, datalength])
                                                                .range([inputstartcolor, inputendcolor]);

                                                        piechart1.selectAll(".slice").style("fill", function (d) {
                                                                return color(d.data.value);
                                                        });

                                                }
                                                if (inputselection == "colorset") {
                                                        color = d3.scale.ordinal()
                                                                .domain([0, datalength])
                                                                .range(inputcolorset);

                                                        piechart1.selectAll(".slice").style("fill", function (d) {
                                                                return color(d.data.value);
                                                        });
                                                }


                                        }
                                        charts.chart.Piechart.Generate.DisplayOuterLabels = function (inputstate) {
                                                if (inputstate == true) {
                                                        piechart1.selectAll(".lines").remove();
                                                        piechart1.selectAll(".labels").remove();
                                                } else {
                                                        piechart1.append("g")
                                                                .attr("class", "labels");

                                                        piechart1.append("g")
                                                                .attr("class", "lines");

                                                        /* ------- TEXT LABELS -------*/

                                                        var text = piechart1.select(".labels").selectAll("text")
                                                                .data(pie(data), data.key);

                                                        text.enter()
                                                                .append("text")
                                                                .attr("dy", ".35em")
                                                                .text(function (d) {
                                                                        return d.data.key;
                                                                })
                                                                .style({
                                                                        "font-family": "sans-serif",
																		"fill": "#CCC",
                                                                        "font-size": 12
                                                                });

                                                        function midAngle(d) {
                                                                return d.startAngle + (d.endAngle - d.startAngle) / 2;
                                                        }

                                                        text.transition().duration(5000)
                                                                .attrTween("transform", function (d) {
                                                                        this._current = this._current || d;
                                                                        var interpolate = d3.interpolate(this._current, d);
                                                                        this._current = interpolate(0);
                                                                        return function (t) {
                                                                                var d2 = interpolate(t);
                                                                                var pos = outerArc.centroid(d2);
                                                                                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                                                                                return "translate(" + pos + ")";
                                                                        };
                                                                })
                                                                .styleTween("text-anchor", function (d) {
                                                                        this._current = this._current || d;
                                                                        var interpolate = d3.interpolate(this._current, d);
                                                                        this._current = interpolate(0);
                                                                        return function (t) {
                                                                                var d2 = interpolate(t);
                                                                                return midAngle(d2) < Math.PI ? "start" : "end";
                                                                        };
                                                                });



                                                        /* ------- SLICE TO TEXT POLYLINES -------*/

                                                        var polyline = piechart1.select(".lines").selectAll("polyline")
                                                                .data(pie(data), data.key);

                                                        polyline.enter()
                                                                .append("polyline");

                                                        polyline.transition().duration(5000)
                                                                .attrTween("points", function (d) {
                                                                        this._current = this._current || d;
                                                                        var interpolate = d3.interpolate(this._current, d);
                                                                        this._current = interpolate(0);
                                                                        return function (t) {
                                                                                var d2 = interpolate(t);
                                                                                var pos = outerArc.centroid(d2);
                                                                                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                                                                                return [arc.centroid(d2), outerArc.centroid(d2), pos];
                                                                        };
                                                                });

                                                        piechart1.select(".lines").selectAll("polyline")
                                                                .style({
                                                                        "fill": "none",
                                                                        "opacity": ".3",
                                                                        "stroke": "#CCC",
                                                                        "stroke-width": "2px"
                                                                });
                                                }
                                        }

                                }

                        }



                        break;

                case "AreaChart":

                        charts.chart.Areachart = function (divclass) {
							
                                var areachart1 = d3.select(divclass)
                                        .append("svg")
                                        .attr("width", svgWidth + margin.left + margin.right)
                                        .attr("height", svgHeight + margin.top + margin.bottom)
                                        .attr("class", "areachart")
                                        .append("g")
                                        .attr("transform", "translate(" + (70) + "," + (20) + ")");



                                charts.chart.Areachart.Generate = function (inputdata) {
                                        var data = inputdata;

                                        var parseDate = d3.time.format("%d-%b-%y").parse;

                                        var x = d3.time.scale()
                                                .range([0, svgWidth]);

                                        var y = d3.scale.linear()
                                                .range([svgHeight, 0]);

                                        var xAxis = d3.svg.axis()
                                                .scale(x)
                                                .orient("bottom");

                                        var yAxis = d3.svg.axis()
                                                .scale(y)
                                                .orient("left");

                                        var area = d3.svg.area()
                                                .x(function (d) {
													//Add +1 to move it one pixel to the right of the Y axis
                                                        return x(d.date)+1;
                                                })
                                                .y0(svgHeight)
                                                .y1(function (d) {
                                                        return y(d.close);
                                                });



                                        data.forEach(function (d) {
                                                d.date = parseDate(d.date);
                                                d.close = +d.close;
                                        });


                                        x.domain(d3.extent(data, function (d) {
                                                return d.date;
                                        }));
                                        y.domain([0, d3.max(data, function (d) {
                                                return d.close;
                                        })]);

                                        //Calculate moving average
                                        // Setup the moving average calculation.
                                        // Currently is a hacky way of doing it by manually storing and using the previous 3 values for averaging.
                                        // Looking for another way to address previous values so we can make the averaging window much larger (like 15 previous values).
                                        var prevPrevVal = 0;
                                        var prevVal = 0;
                                        var curVal = 0
                                        var movingAverageLine = d3.svg.line()
                                                .x(function (d, i) {
                                                        return x(d.date);
                                                })
                                                .y(function (d, i) {
                                                        if (i == 0) {
                                                                prevPrevVal = y(d.close);
                                                                prevVal = y(d.close);
                                                                curVal = y(d.close);
                                                        } else if (i == 1) {
                                                                prevPrevVal = prevVal;
                                                                prevVal = curVal;
                                                                curVal = (prevVal + y(d.close)) / 2.0;
                                                        } else {
                                                                prevPrevVal = prevVal;
                                                                prevVal = curVal;
                                                                curVal = (prevPrevVal + prevVal + y(d.close)) / 3.0;
                                                        }
                                                        return curVal;

                                                })
                                                .interpolate("basis");

                                        //remove previous chart if there was one
                                        areachart1.selectAll("path").remove();

                                        areachart1.append("path")
                                                .datum(data)
                                                .attr("class", "area")
                                                .attr("d", area)
                                                .style({
                                                        "fill": "steelblue"
                                                });

                                        //Draw moving average but don't show it yet
                                        areachart1.append("path")
                                                .attr("class", "average")
                                                .attr("d", movingAverageLine(data))
                                                .style({
                                                        "stroke": "darkviolet",
                                                        "stroke-width": 1,
                                                        "fill": "none",
                                                        "opacity": 0
                                                });

                                        areachart1.select(".xAxis").remove();
                                        areachart1.select(".yAxis").remove();

                                        areachart1.append("g")
                                                .attr("class", "xAxis")
                                                .attr("transform", "translate(0," + svgHeight + ")")
                                                .call(xAxis)
                                                .append("text")
                                                .attr("class", "xAxisText")
                                                .attr("y", 50) //Hoever van den as verwijdert ten opzichte van de y as
                                        .attr("x", svgWidth / 2)
                                                .text("Date")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 18,
														"color":"#CCC"
                                                });;

                                        areachart1.append("g")
                                                .attr("class", "yAxis")
                                                .call(yAxis)
                                                .append("text")
                                                .attr("class", "yAxisText")
                                                .attr("transform", "rotate(-90)")
                                                .attr("y", -50)
                                                .attr("x", -svgHeight / 2)
                                                .text("Value")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 18,
														"color":"#CCC"
                                                });

                                        //inline CSS styling

                                        areachart1.selectAll(".domain")
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "#CCC",
                                                        "shape-rendering": "crispEdges"
                                                });

                                        areachart1.selectAll("line")
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "#CCC",
                                                        "shape-rendering": "crispEdges"
                                                });

                                        //Give all X values a class and style them
                                        areachart1.selectAll(".xAxis g text").attr("class", "xAxisValues")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });

                                        //Give all Y values a class and style them
                                        areachart1.selectAll(".yAxis g text").attr("class", "yAxisValues")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });
												
												//Color the axis names too
												areachart1.select(".xAxisText").style({"fill":"#ccc"});
												areachart1.select(".yAxisText").style({"fill":"#ccc"});


                                        charts.chart.Areachart.Generate.UpdateArea = function (inputsmoothingtype) {
											
                                                if (inputsmoothingtype == "linear") {

                                                        area = d3.svg.area()
                                                                .interpolate("linear")

                                                        .x(function (d) {
                                                                return x(d.date)+1;
                                                        })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")

                                                        .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });
                                                }

                                                if (inputsmoothingtype == "step") {

                                                        area = d3.svg.area()
                                                                .interpolate("step")

                                                        .x(function (d) {
                                                                return x(d.date)+1;
                                                        })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")
                                                                .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });
                                                }

                                                if (inputsmoothingtype == "basis") {

                                                        area = d3.svg.area()
                                                                .interpolate("basis")
                                                                .x(function (d) {
                                                                        return x(d.date)+1;
                                                                })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")
                                                                .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });
                                                }

                                                if (inputsmoothingtype == "bundle") {

                                                        area = d3.svg.area()
                                                                .interpolate("bundle")
                                                                .x(function (d) {
                                                                        return x(d.date)+1;
                                                                })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")
                                                                .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });
                                                }

                                                if (inputsmoothingtype == "cardinal") {

                                                        area = d3.svg.area()
                                                                .interpolate("cardinal")
                                                                .x(function (d) {
                                                                        return x(d.date)+1;
                                                                })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")
                                                                .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });
                                                }

                                                if (inputsmoothingtype == "monotone") {

                                                        area = d3.svg.area()
                                                                .interpolate("monotone")
                                                                .x(function (d) {
                                                                        return x(d.date)+1;
                                                                })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")
                                                                .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });
                                                }
                                                if (inputsmoothingtype == "none") {
													

													
                                                        area = d3.svg.area()
                                                                .interpolate("linear")
                                                                .x(function (d) {
                                                                        return x(d.date)+1;
                                                                })
                                                                .y0(svgHeight)
                                                                .y1(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        areachart1.selectAll(".area").remove();

                                                        areachart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "area")
                                                                .attr("d", area)
                                                                .style({
                                                                        "fill": "steelblue"
                                                                });

                                                }
                                        }
                                        charts.chart.Areachart.Generate.UpdateYaxisName = function (inputtext) {
                                                yAxisText = inputtext;

                                                areachart1.select(".yAxisText")
                                                        .text(inputtext);
                                        }

                                        charts.chart.Areachart.Generate.UpdateXaxisName = function (inputtext) {
                                                xAxisText = inputtext;
                                                areachart1.select(".xAxisText")
                                                        .text(inputtext);
                                        }

                                        charts.chart.Areachart.Generate.UpdateAreaColor = function (inputcolor) {
                                                
                                                areachart1.select(".area")
                                                        .style({
                                                                "fill": inputcolor
                                                        });

                                        }
                                        charts.chart.Areachart.Generate.MovingAverage = function (inputstate) {


                                                if (inputstate == true) {
													
														//Remove previous moving average line
                                                        areachart1.select(".average").remove();

                                                        areachart1.append("path")
                                                                .attr("class", "average")
                                                                .attr("d", movingAverageLine(data))
                                                                .style({
                                                                        "stroke": "darkviolet",
                                                                        "stroke-width": 1,
                                                                        "fill": "none",
                                                                        "opacity": 1
                                                                });


                                                        // Draw the moving average version of the data, as a line.

                                                } else
                                                        areachart1.select(".average")
                                                                .style({
                                                                        "opacity": 0
                                                                });
                                                //areachart1.select(".average").remove();
                                        }
                                        charts.chart.Areachart.Generate.UpdateOpacity = function (inputvalue) {
                                                areachart1.select(".area")
                                                        .style({
                                                                "opacity": (inputvalue / 100)
                                                        });
                                        }

                                }

                        }

                        break;

                case "LineChart":

                        charts.chart.Linechart = function (divclass) {
                                var linechart1 = d3.select(divclass)
                                        .append("svg")
                                        .attr("width", svgWidth + margin.left + margin.right)
                                        .attr("height", svgHeight + margin.top + margin.bottom)
                                        .attr("class", "linechart")
                                        .append("g")
                                        .attr("transform", "translate(" + (70) + "," + (20) + ")");

                                charts.chart.Linechart.Generate = function (inputdata) {

                                        var data = inputdata;

                                        var linecolor = "steelblue";

                                        var parseDate = d3.time.format("%d-%b-%y").parse;

                                        var x = d3.time.scale()
                                                .range([0, svgWidth]);

                                        var y = d3.scale.linear()
                                                .range([svgHeight, 0]);

                                        var xAxis = d3.svg.axis()
                                                .scale(x)
                                                .orient("bottom");

                                        var yAxis = d3.svg.axis()
                                                .scale(y)
                                                .orient("left");

                                        var line = d3.svg.line()

                                        .x(function (d) {
                                                return x(d.date);
                                        })
                                                .y(function (d) {
                                                        return y(d.close);
                                                });


                                        data.forEach(function (d) {
                                                d.date = parseDate(d.date);
                                                d.close = +d.close;
                                        });
										
										  data.sort(function(a, b) {
											return a.date - b.date;
										  });

                                        x.domain(d3.extent(data, function (d) {
                                                return d.date;
                                        }));
                                        y.domain([0, d3.max(data, function (d) {
                                                return d.close;
                                        })]);

                                        linechart1.append("path")
                                                .datum(data)
                                                .attr("class", "line")
                                                .attr("d", line)
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "steelblue",
                                                        "stroke-width": 1.5
                                                });

                                        linechart1.append("g")
                                                .attr("class", "xAxis")
                                                .attr("transform", "translate(0," + svgHeight + ")")
                                                .call(xAxis)
                                                .append("text")
                                                .attr("class", "xAxisText")
                                                .attr("y", 50) //Hoever van den as verwijdert ten opzichte van de y as
                                        .attr("x", svgWidth / 2)
                                                .text("Date")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 18,
														"fill":"#CCC"
                                                });;

                                        linechart1.append("g")
                                                .attr("class", "yAxis")
                                                .call(yAxis)
                                                .append("text")
                                                .attr("class", "yAxisText")
                                                .attr("transform", "rotate(-90)")
                                                .attr("y", -50)
                                                .attr("x", -svgHeight / 2)
                                                .text("Value")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 18,
														"fill":"#CCC"
                                                });

                                        //inline CSS styling

                                        linechart1.selectAll(".domain")
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "#CCC",
                                                        "shape-rendering": "crispEdges"
                                                });

                                        linechart1.selectAll("line")
                                                .style({
                                                        "fill": "none",
                                                        "stroke": "#CCC",
                                                        "shape-rendering": "crispEdges"
                                                });

                                        //Give all X values a class and style them
                                        linechart1.selectAll(".xAxis g text").attr("class", "xAxisValues")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });

                                        //Give all Y values a class and style them
                                        linechart1.selectAll(".yAxis g text").attr("class", "yAxisValues")
                                                .style({
                                                        "font-family": "sans-serif",
                                                        "font-size": 12,
														"fill":"#CCC"
                                                });
												
												
											//Color the axis names too
												linechart1.select(".xAxisText").style({"fill":"#ccc"});
												linechart1.select(".yAxisText").style({"fill":"#ccc"});
													
										//Mouse over to show Y value at the X value of your mouse
										function mouseOver(){
										  var focus = linechart1.append("g")
													  .attr("class", "focus")
													  .style("display", "none");
												
												  focus.append("circle")
													  .attr("r", 4.5)
													  .style({"fill": "none","stroke":"steelblue"});
													  
												focus.append("rect")
													.attr("width", 60)
													.attr("height",24)
													.attr("x", 6)
													.attr("y", -11)
													.attr("rx", 5)
													.attr("ry", 5)
													.style({"fill": "black","opacity":0.7});
												
												
												
												  focus.append("text")
													  .attr("x", 9)
													  .attr("dy", ".35em")
													  .style({"fill":"#CCC"}); 
													  

													  
												  linechart1.append("rect")
													  .attr("class", "overlay")
													  .attr("width", svgWidth)
													  .attr("height", svgHeight)
													  .style({"fill":"none","pointer-events":"all"})
													  .on("mouseover", function() { focus.style("display", null); })
													  .on("mouseout", function() { focus.style("display", "none"); })
													  .on("mousemove", mousemove);

													var bisectDate = d3.bisector(function(d) { return d.date; }).left;
												  function mousemove() {
													var x0 = x.invert(d3.mouse(this)[0]),
														i = bisectDate(data, x0, 1),
														d0 = data[i - 1],
														d1 = data[i],
														d = x0 - d0.date > d1.date - x0 ? d1 : d0;
													focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
													focus.select("text").text(d.close);
												  };
										}
										
										//Initiate the mouseover stuff
										mouseOver();
										
                                        charts.chart.Linechart.Generate.UpdateYaxisName = function (inputtext) {
                                                yAxisText = inputtext;

                                                linechart1.select(".yAxisText")
                                                        .text(inputtext);
                                        }

                                        charts.chart.Linechart.Generate.UpdateXaxisName = function (inputtext) {
                                                xAxisText = inputtext;
                                                linechart1.select(".xAxisText")
                                                        .text(inputtext);
                                        }

                                        charts.chart.Linechart.Generate.UpdateLine = function (inputsmoothingtype) {
                                                if (inputsmoothingtype == "linear") {

                                                        line = d3.svg.line()
                                                                .interpolate("linear")
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });

                                                }

                                                if (inputsmoothingtype == "step") {

                                                        line = d3.svg.line()
                                                                .interpolate("step")
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });

                                                }

                                                if (inputsmoothingtype == "basis") {

                                                        line = d3.svg.line()
                                                                .interpolate("basis")
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });

                                                }

                                                if (inputsmoothingtype == "bundle") {

                                                        line = d3.svg.line()
                                                                .interpolate("bundle")
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });
                                                }

                                                if (inputsmoothingtype == "cardinal") {

                                                        line = d3.svg.line()
                                                                .interpolate("cardinal")
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });
                                                }

                                                if (inputsmoothingtype == "monotone") {

                                                        line = d3.svg.line()
                                                                .interpolate("monotone")
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });
                                                }
                                                if (inputsmoothingtype == "none") {
                                                        line = d3.svg.line()
                                                                .x(function (d) {
                                                                        return x(d.date);
                                                                })
                                                                .y(function (d) {
                                                                        return y(d.close);
                                                                });

                                                        linechart1.selectAll(".line").remove();

                                                        linechart1.append("path")
                                                                .datum(data)
                                                                .attr("class", "line")
                                                                .attr("d", line)
                                                                .style({
                                                                        "fill": "none",
                                                                        "stroke": linecolor,
                                                                        "stroke-width": 1.5
                                                                });

                                                }
                                        }

                                        charts.chart.Linechart.Generate.UpdateLineColor = function (inputcolor) {

                                                linecolor = d3.rgb(inputcolor);


                                                linechart1.select(".line")
                                                        .transition()
                                                        .duration(500)
                                                        .style({
                                                                "stroke": linecolor
                                                        });
                                        }
                                }

                        }

                default:
                        //code to be executed if chartType is different from all other cases
                }

        }

        charts.getCSV = function (filename, callback) {

                var dataset = new Array();

                d3.csv(filename, function (data) {
                        dataset = data;

                        callback(dataset);


                });


        }
        charts.generateTable = function (datafile, divclass) {

                d3.text(datafile, function (datasetText) {

                        var parsedCSV = d3.csv.parseRows(datasetText);

                        var sampleHTML = d3.select(divclass)
                                .append("table")
                                .attr("class", "table table-hover")
                                .attr("id", "data-table")
                                .append("tbody")
                                .selectAll("tr")
                                .data(parsedCSV)
                                .enter().append("tr")
                                .attr("id", "datarow")
                                .selectAll("td")
                                .data(function (d) {
                                        return d;
                                })
                                .enter().append("td")
                                .text(function (d) {
                                        return d;
                                });
                });


        }
        charts.getXML = function () {
                return nenArray;
        }

        charts.getJSON = function () {
                return nenArray;
        }


})(charts);