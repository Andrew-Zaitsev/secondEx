import {
  DonutChart
} from './donut-chart-plagin.js';

function renderCharts() {

  let charts = document.querySelectorAll('.js-chart');
  let data = {
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
    ],
    measureUnit: 'голос',
  }

  charts.forEach((elem) => {
    //const donutChart = 
    new DonutChart(elem, data);
  })
}

renderCharts();