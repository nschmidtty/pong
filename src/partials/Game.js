import { SVG_NS, KEYS, PADDLE, BALL_RADIUS, SCORE } from "../settings.js";
import Board from "./Board.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Score from "./Score.js";

export default class Game {
  constructor(element, width, height) {
    const S = SCORE;
    const P = PADDLE;
    let maxScore = this.getMaxScore();
    //this.checkDifficulty();
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(element);
    this.board = new Board(width, height);
    this.score1 = new Score(
      width / 2 - S.SCORE1_X_DIST,
      S.SCORE_Y_DIST,
      S.SCORE_SIZE
    );
    this.score2 = new Score(
      width / 2 + S.SCORE2_X_DIST,
      S.SCORE_Y_DIST,
      S.SCORE_SIZE
    );
    this.rightPaddleXDist = width - PADDLE.padding - PADDLE.paddleWidth;
    this.paddlePos = (height - PADDLE.paddleHeight) / 2;
    this.player1 = new Paddle(
      height,
      P.paddleWidth,
      P.paddleHeight,
      P.padding,
      this.paddlePos,
      KEYS.a,
      KEYS.z
    );
    this.player2 = new Paddle(
      height,
      P.paddleWidth,
      P.paddleHeight,
      this.rightPaddleXDist,
      this.paddlePos,
      KEYS.up,
      KEYS.down
    );
    this.ball = new Ball(BALL_RADIUS, width, height, maxScore);
    this.gameOver = new Score(width / 5.5, 125, 40);

    this.pauseListener();
  }

  render() {
    if (this.pause) {
      return;
    }

    if (this.ball.endGame) {
      this.endScreen(svg);
      return;
    }

    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);

    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
  }

  pauseListener() {
    document.addEventListener("keydown", event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;
      }
    });
  }

  checkDifficulty() {
    const levels = ["Easy", "Normal", "Hard", "WAT"];
    let difficulty = prompt("Pick a difficulty: Easy/Normal/Hard/WAT");
    for (let x = 0; x < levels.length; x++) {
      if (levels[x] === difficulty) {
        return difficulty;
      }
    }
  }

  endScreen() {
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);

    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    if (this.player1.score === this.ball.maxScore) {
      this.gameOver.render(svg, "Player 1 Wins!");
    } else {
      this.gameOver.render(svg, "Player 2 Wins!");
    }
    this.startOver(this.ball, this.player1, this.player1);
  }

  startOver(ball, player1, player2) {
    let ballin = ball;
    let play1 = player1;
    let play2 = player2;
    setTimeout(function() {
      let input = prompt("To restart enter: y");
      if (input == "y") {
        ballin.endGame = false;
        play1.score = 0;
        play2.score = 0;
      }
    }, 10);
  }

  getMaxScore() {
    const enterNum = "Enter a max Score!";
    const validNum = "Plz enter a valid score!";

    let maxScore = prompt(enterNum);
    while (isNaN(maxScore)) {
      maxScore = prompt(validNum);
    }
    return maxScore;
  }
}
