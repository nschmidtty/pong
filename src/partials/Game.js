import {
	SVG_NS,
	KEYS,
	PADDLE,
	BALL_RADIUS,
	SCORE
} from '../settings.js'
import Board from './Board.js'
import Paddle from './Paddle.js'
import Ball from './Ball.js'
import Score from './Score.js'

export default class Game {

	constructor(element, width, height) {
		const P = PADDLE;
		const S = SCORE;
		this.width = width;
		this.height = height;
		this.rightPaddleXDist = width - PADDLE.padding - PADDLE.paddleWidth;
		this.paddlePos = (height - PADDLE.paddleHeight) / 2;

		this.gameElement = document.getElementById(element);

		this.board = new Board(width, height);
		this.player1 = new Paddle(height, P.paddleWidth, P.paddleHeight, P.padding, this.paddlePos, KEYS.a, KEYS.z);
		this.player2 = new Paddle(height, P.paddleWidth, P.paddleHeight, this.rightPaddleXDist, this.paddlePos, KEYS.up, KEYS.down);
		this.ball = new Ball(BALL_RADIUS, width, height);
		this.score1 = new Score(width / 2 - S.SCORE1_X_DIST, S.SCORE_Y_DIST, S.SCORE_SIZE);
		this.score2 = new Score(width / 2 + S.SCORE2_X_DIST, S.SCORE_Y_DIST, S.SCORE_SIZE);

		this.pauseListener();
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);


		this.board.render(svg);
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.gameElement.appendChild(svg);
	}

	pauseListener() {
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});
	}
}