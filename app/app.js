'use strict';

var d3 = require('d3'),
  data = [ 1, 1, 2, 3, 5, 8, 13, 21 ], // Raw data to work with
  x = d3.scale.linear() // Sets x-axis:
    .domain([ 0, d3.max(data) ]) // ... its width in data
    .range([ 0, 1000 ]); // ... and in pixels

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', function(d) { 
      return x(d) + 'px'; 
    })
    .text(function(d) { 
      console.log(d);
      return d; 
    });