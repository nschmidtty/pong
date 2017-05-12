import {SVG_NS} from '../settings.js'

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  render(svg) {
    const background = document.createElementNS(SVG_NS, 'rect');
    background.setAttributeNS(null, 'width', this.width);
    background.setAttributeNS(null, 'height', this.height);
    background.setAttributeNS(null, 'fill', '#353535');

    svg.appendChild(background);

    const middle = document.createElementNS(SVG_NS, 'line');
    middle.setAttributeNS(null, 'x1', this.width/2);
    middle.setAttributeNS(null, 'x2', this.width/2);
    middle.setAttributeNS(null, 'y1', 0);
    middle.setAttributeNS(null, 'y2', this.height);
    middle.setAttributeNS(null, 'stroke', 'green');
    middle.setAttributeNS(null, 'stroke-width', 5);
    middle.setAttributeNS(null, 'stroke-dasharray', 20, 4);

    svg.appendChild(middle);
  }
   
}