import {SVG_NS} from '../settings.js'

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.reset();
  }

  calcVY(){
    let vy = 0;
    while(vy === 0){
      vy = Math.floor(Math.random() * 10 - 5);
    }
    return vy;
  }

  wallCollision(){
    if(this.y === this.boardHeight || this.y === 0){
      this.vy *= -1;
    }
    if(this.x === this.boardWidth || this.x === 0){
      this.vx *= -1;
    }
  }

  move(){
    this.y += this.vy;
    this.x += this.vx;
  }

  render(svg) {
    this.move();
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', 'white');
    
    svg.appendChild(ball);
  }

  reset() {
  this.x = this.boardWidth / 2;
  this.y = this.boardHeight / 2;
  this.vy = this.calcVY() 
  this.vx = this.direction * (6 - Math.abs(this.vy));
  }
}