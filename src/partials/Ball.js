import {
  SVG_NS
} from '../settings.js'

export default class Ball {
  constructor(radius, boardWidth, boardHeight, maxScore) {
    this.endGame = false;
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.maxScore = maxScore;
    this.reset();
    this.ping = new Audio('../../public/sounds/pong-01.wav');
  }

  render(svg, player1, player2) {
    this.movement();
    this.wallCollision();
    this.paddleCollision(player1, player2);
    this.createBall(svg);
    this.detectGoal(player1, player2);
  }

  wallCollision() {
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
      let [leftX, rightX, topY, bottomY] = paddle;
      if (this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY) {
        this.reverseXDir()
      }
    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
      let [leftX, rightX, topY, bottomY] = paddle;
      if (this.x - this.radius <= rightX &&
        this.x - this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY) {
        this.reverseXDir()
      }
    }
  }

  reverseXDir() {
    this.vx = -this.vx;
    this.ping.play()
  }

  createBall(svg) {
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(ball);
  }

  detectGoal(player1, player2) {
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
  }

  goal(player) {
    player.score++;
    this.reset();
    if (player.score === parseInt(this.maxScore)) {
      this.endGame = true;
    }
  }

  reset() {
    this.vy = 0;
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 / 2 - 3);
    }

    this.vx = this.direction * (5 - Math.abs(this.vy));
  }

  movement() {
    this.y += this.vy;
    this.x += this.vx;
  }
}