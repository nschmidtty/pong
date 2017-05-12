import {SVG_NS, PADDLE} from '../settings.js'

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  }

  up(){
    this.y = Math.max(this.y-this.speed, PADDLE.MIN_PADDLE);
  }

  down(){
    this.y = Math.min(this.y+this.speed, PADDLE.MAX_PADDLE);
  }

  render(svg) {
    const paddle = document.createElementNS(SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'fill', 'yellow');

    svg.appendChild(paddle);
  }

}