import {
  getNoun
} from '../../assets/js/functions.js';
import {
  voteNouns
} from '../../assets/js/variables.js';

class DonutChart {

  constructor(elem, {
    items,
    measureUnit
  }) {
    this.chart = elem;
    this.items = items;
    this.measureUnit = measureUnit;
    this.xlmns = 'http://www.w3.org/2000/svg';
    this.render();
    this.addListeners();
  }

  render() {
    const chartDonut = document.createElementNS(this.xlmns, 'svg');

    chartDonut.classList.add('chart__donut');
    chartDonut.setAttributeNS(null, 'viewBox', '0 0 34 34');
    chartDonut.append(this.renderGradientsDefs());
    this.renderArcs().forEach((elem) => chartDonut.append(elem));

    this.chartNumber = document.createElement('div');
    this.chartNumber.classList.add('chart__number');
    this.chartNumber.textContent = this.items[0].amount;

    this.chartMeasureUnit = document.createElement('div');
    this.chartMeasureUnit.classList.add('chart__measure-unit');
    this.chartMeasureUnit.textContent = getNoun(this.items[0].amount, voteNouns);

    const chartText = document.createElement('div');
    chartText.classList.add('chart__text');
    chartText.style.color = this.items[0].gradients[0];
    chartText.append(this.chartNumber, this.chartMeasureUnit);

    const chartDonutWrap = document.createElement('div');
    chartDonutWrap.classList.add('chart__donut-wrap');
    chartDonutWrap.append(chartDonut, chartText);





    this.chart.append(chartDonutWrap, this.renderLegend());

    //console.log('chartDonut', chartDonut);
  }

  renderGradientsDefs() {
    const defs = document.createElementNS(this.xlmns, 'defs');

    this.items.forEach((item, index) => {
      const linearGradient = document.createElementNS(this.xlmns, 'linearGradient');
      const id = item.gradients.join('');

      linearGradient.setAttributeNS(null, 'id', id);
      linearGradient.setAttributeNS(null, 'x1', 0.5);
      linearGradient.setAttributeNS(null, 'y1', 0);
      linearGradient.setAttributeNS(null, 'x2', 0.5);
      linearGradient.setAttributeNS(null, 'y2', 1);
      linearGradient.setAttributeNS(null, 'gradientUnits', 'objectBoundingBox');
      if (index == 2) linearGradient.setAttributeNS(null, 'gradientTransform', 'rotate(90, 0.5, 0.5)');
      defs.append(linearGradient);

      const firstStop = document.createElementNS(this.xlmns, 'stop');
      const secondStop = document.createElementNS(this.xlmns, 'stop');

      firstStop.setAttributeNS(null, 'offset', '0%');
      firstStop.setAttributeNS(null, 'stop-color', item.gradients[0]);
      secondStop.setAttributeNS(null, 'offset', '100%');
      secondStop.setAttributeNS(null, 'stop-color', item.gradients[1]);
      linearGradient.append(firstStop, secondStop);
    })
    return defs;
  }

  renderArcs() {
    const arcsElems = this.calcArcs().map((elemAttribs) => {
      const arcElem = document.createElementNS(this.xlmns, 'circle');

      arcElem.classList.add('chart__donut-arc');
      arcElem.setAttributeNS(null, 'cx', '17');
      arcElem.setAttributeNS(null, 'cy', '17');
      arcElem.setAttributeNS(null, 'r', '15.91549');
      arcElem.setAttributeNS(null, 'fill', 'none');
      arcElem.setAttributeNS(null, 'stroke', `url(${elemAttribs.stroke})`);
      arcElem.setAttributeNS(null, 'stroke-width', '1.098');
      arcElem.setAttributeNS(null, 'stroke-dasharray', `${elemAttribs.strokeDasharray}`);
      arcElem.setAttributeNS(null, 'stroke-dashoffset', `${elemAttribs.strokeDashoffset}`);

      return arcElem;
    });
    return arcsElems;
  };

  calcArcs() {
    const chartParams = {
      totalAmount: 0,
      gapNumber: 0,
      arcNumber: 0,
      arcSpace: 0,
      gapSize: 0.54881,
    };
    let arcsElemsAttribs;

    this.items.forEach((item) => {
      chartParams.totalAmount += item.amount;
      (item.amount > 0) ? (chartParams.arcNumber++) : '';
    });
    chartParams.gapNumber = (chartParams.arcNumber > 1) ? chartParams.arcNumber : 0;
    chartParams.arcSpace = 100 - chartParams.gapNumber * chartParams.gapSize;

    const isAnyAmountNumberLessThanZero = () => this.items.map((item) => item.amount).some((amount) => amount < 0);
    const isAnyAmountNumberNotInteger = () => this.items.map((item) => item.amount).some((amount) => !Number.isInteger(amount));
    const isTotalAmountZero = () => chartParams.totalAmount === 0;

    if (isAnyAmountNumberLessThanZero()) {
      console.log('одно число меньше нуля, вывести ошибку в консоль и пустой график'); // вывести график - рассчитать атрибуты дуг и передать в renderArcs()
    } else if (isAnyAmountNumberNotInteger()) {
      console.log('одно из чисел не целое, вывести ошибку в консоль и пустой график');
    } else if (isTotalAmountZero()) {
      console.log('общая сумма равна нулю, вывести пустой график');
    } else {
      const primaryOffset = (25 - 0.2477);
      let currentOffset = primaryOffset;

      arcsElemsAttribs = this.items.map((item, index) => {

        const elemAttribs = {};
        const dashLength = chartParams.arcSpace / chartParams.totalAmount * item.amount;
        const emptySpaceLength = 100 - dashLength;

        currentOffset += chartParams.gapSize + dashLength;

        elemAttribs.stroke = '#' + item.gradients.join('');
        elemAttribs.strokeDasharray = `${dashLength.toFixed(2)} ${emptySpaceLength.toFixed(2)}`;
        elemAttribs.strokeDashoffset = `${currentOffset.toFixed(2)}`;

        return elemAttribs;
      });
    }
    return arcsElemsAttribs;
  }

  renderLegend() {
    const legendItems = this.items.map((item) => {
      const legendBullet = document.createElement('span');
      legendBullet.classList.add('chart__legend-bullet');
      legendBullet.style.background = `linear-gradient(to bottom, ${item.gradients[0]} 0%, ${item.gradients[1]} 100%)`;

      const legendItem = document.createElement('li');
      legendItem.classList.add('chart__legend-text');
      legendItem.textContent = item.description;
      legendItem.append(legendBullet);

      console.log(legendItem);
      return legendItem;
    });

    const chartLegend = document.createElement('ul');
    chartLegend.classList.add('chart__legend');
    chartLegend.append(...legendItems)
    return chartLegend;
  }

  addListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.chart.querySelectorAll('.chart__donut-arc').forEach((el, index) => {

        const initialStrokeWidth = window.getComputedStyle(el, null).getPropertyValue('stroke-width');
        const increasedStrokeWidth = (Number(initialStrokeWidth.replace('px', '')) * 2).toString() + 'px';

        el.addEventListener('mouseover', () => {

          const increaseWidth = () => el.setAttributeNS(null, 'style', 'stroke-width:' + increasedStrokeWidth);
          const decreaseWidth = () => el.setAttributeNS(null, 'style', 'stroke-width:' + initialStrokeWidth);
          const getCurrentArcColor = () => getComputedStyle(el).getPropertyValue('stroke').substring(6, 13);
          const changeTextColor = () => {
            this.chartNumber.style.color = getCurrentArcColor();
            this.chartMeasureUnit.style.color = getCurrentArcColor();
          };
          const changeNumber = () => this.chartNumber.textContent = this.items[index].amount;

          increaseWidth();
          changeTextColor();
          changeNumber();
          el.addEventListener('mouseout', () => {
            decreaseWidth();
          })
        })
      })
    });
  }
}

export {
  DonutChart
};