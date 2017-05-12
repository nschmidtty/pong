import {SVG_NS, KEYS, PADDLE} from '../settings.js'
import Board from './Board.js'
import Paddle from './Paddle.js'
import Ball from './Ball.js'

export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;
		this.rightPaddleXDist = width-PADDLE.padding-PADDLE.paddleWidth;
		this.paddlePos = (height-PADDLE.paddleHeight)/2;
		const P = PADDLE
		const ballRaidus = 8;
		
		this.gameElement = document.getElementById(element);

		this.board = new Board(width, height);
		this.leftPaddle = new Paddle(height, P.paddleWidth, P.paddleHeight, P.padding, this.paddlePos, KEYS.a, KEYS.z);
		this.rightPaddle = new Paddle(height, P.paddleWidth, P.paddleHeight, this.rightPaddleXDist, this.paddlePos, KEYS.up, KEYS.down);
		this.ball = new Ball(ballRaidus, width, height);
	}

	render() {
		
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		
		this.board.render(svg);
		this.leftPaddle.render(svg);
		this.rightPaddle.render(svg);
		this.ball.render(svg);
		this.gameElement.appendChild(svg);
	}

}