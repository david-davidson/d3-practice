'use strict';

var d3 = require('d3'),
  data = [ 1, 1, 2, 3, 5, 8, 13, 21 ],
  width = 1000,
  barHeight = 20,
  // Map data space to display space
  x = d3.scale.linear()
    .domain([ 0, d3.max(data) ])
    .range([ 0, width ]);
    // `x` now acts as a function that can translate data values to
    // display values

/**
 * Div-only implementation
 */

// Select chart container
d3.select('#bar-graph')
  // Start data join: this is what we *want* to exist. Data joins can create, 
  // update, and destroy elements, all in one pattern.
  .selectAll('div')
   // Join the data to the selection 
  .data(data)
  // `enter` represents data for which there was no existing element: here, 
  // all of it. Also available, under other circumstances, are `update` and `exit`
  .enter().append('div') 
    // Set the width of each bar as a multiple of its data value
    // The data join handles binding each bar to data
    .style('width', function(datum) { 
      return x(datum) + 'px'; 
    })
    // Finally, set each bar's text
    .text(function(datum) { 
      return datum; 
    });

/**
 * SVG implementation
 */

var chart,
  bar;

chart = d3.select('#svg-bar-graph')
  .attr('width', width)
  .attr('height', barHeight * data.length);

// Each bar is a `g` element, which in turn contains a `rect` and a `text`
bar = chart.selectAll('g')
  .data(data)
  // Data join creates a `g` element for each data value
  .enter().append('g')
  // Set height, since SVGs are always positioned absolutely
  .attr('transform', function(datum, i) {
    return 'translate(0,' + i * barHeight + ')';
  });

// `bar` someone refers to *each* bar in turn!
bar.append('rect')
  .attr('width', x) // ??? Apparently === function(d) { return x(d); }
  .attr('height', barHeight - 1);

bar.append('text')
  .attr('x', function(datum) {
    return x(datum) - 3;  // ~= right padding
  })
  .attr('y', barHeight / 2) // ~= top positioning
  .attr('dy', '.35em') // ~= top padding
  .text(function(datum) {
    return datum;
  });