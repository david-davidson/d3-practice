'use strict';

var d3 = require('d3'),
  data = [ 1, 1, 2, 3, 5, 8, 13, 21 ],
  // Map data space to display space
  x = d3.scale.linear()
    .domain([ 0, d3.max(data) ])
    .range([ 0, 1000 ]);
    // `x` now acts as a function that can translate data values to
    // display values

// Select chart container
d3.select('.chart')
  // Start data join: this is what we *want* to exist. Data joins can create, 
  // update, and destroy elements, all in one pattern.
  .selectAll('div')
     // Join the data to the selection 
    .data(data)
  // `enter` represents data for which there was no existing element: here, 
  // all of it. Also available are `update` and `exit`
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