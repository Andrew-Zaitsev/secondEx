//  jQuery(document).ready(function () {
//     jquery ничего не делает
//  });
import {
  myDonutChart
} from './donut-chart-plagin.js';

class DonutChart {
  constructor(element) {
    this.chart = element;
    this.chart.myDonutChart = myDonutChart;
    this.render();
  }

  render() {
    this.chart.myDonutChart({
      items: [{
          amount: 520,
          description: 'великолепно',
          gradients: ['#FFE39C', '#FFBA9C']
        },
        {
          amount: 260,
          description: 'хорошо',
          gradients: ['#6FCF97', '#66D2EA']
        },
        {
          amount: 260,
          description: 'удовлетворительно',
          gradients: ['#BC9CFF', '#8BA4F9']
        },
        {
          amount: 0,
          description: 'разочарован',
          gradients: ['#919191', '#3D4975']
        },
      ]

    });
  }
}

/* ['#FFE39C', '#FFBA9C'], yellow  ''
   ['#6FCF97', '#66D2EA'], green   'хорошо'
   ['#BC9CFF', '#8BA4F9'], violet  'удовлетворительно'
   ['#919191', '#3D4975'], black   'разочарован'
*/

function renderCharts() {
  const charts = document.querySelectorAll('.js-chart');

  charts.forEach((el) => {
    const donutChart = new DonutChart(el);
  })
  //console.log(charts);
}

renderCharts();