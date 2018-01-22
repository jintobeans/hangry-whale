import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)


// var BarChart = require('react-d3-basic').BarChart;

// (function() {
//   var generalChartData = require('dsv?delimiter=\t!../data/letter.tsv')

//   var width = 700,
//     height = 400,
//     title = "Bar Chart",
//     chartSeries = [
//       {
//         field: 'frequency',
//         name: 'Frequency'
//       }
//     ],
//     x = function(d) {
//       return d.letter;
//     },
//     xScale = 'ordinal',
//     xLabel = "Letter",
//     yLabel = "Frequency",
//     yTicks = [10, "%"];

//   ReactDOM.render(
//     <BarChart
//       title= {title}
//       data= {generalChartData}
//       width= {width}
//       height= {height}
//       chartSeries = {chartSeries}
//       x= {x}
//       xLabel= {xLabel}
//       xScale= {xScale}
//       yTicks= {yTicks}
//       yLabel = {yLabel}
//     />
//   , document.getElementById('data_bar')
//   )
// })()
