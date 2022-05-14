const boxes = document.querySelectorAll("div");
const prompt = document.querySelector("h2");
const cells = document.querySelectorAll("cell");

document.querySelector(".game").addEventListener("click", handle);
document.querySelector("button").addEventListener("click", init);

const colors = {
  null: "",

  1: "x",

  "-1": "o",
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
  [0, 4, 8],
];

let turn, winner, gameOver;

function init() {
  gameOver = false;
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = "null";
  render();
}

function render() {
  board.forEach(function (box, i) {
    boxes[i].innerHTML = colors[box];
    if (boxes[i].innerHTML === "o") {
      boxes[i].style.color = "rgb(244, 164, 247)";
    } else {
      boxes[i].style.color = "rgb(13, 235, 224)";
    }

    if (winner !== true) {
      prompt.innerHTML = `It is ${colors[turn].toUpperCase()}'s turn`;
    } else if (winner === "T") {
      promopt.innerHTML = "Tie!";
    } else {
      turn = turn * -1;
      prompt.innerHTML = `Player ${colors[turn].toUpperCase()} has won!`;
      gameOver = true;
    }
  });
}

function handle(e) {
  const extractIndex = parseInt(e.target.id.replace("box", ""));
  if (gameOver) {
    return;
  }
  if (board[extractIndex]) {
    return;
  }
  if (winner !== null) {
    render();
  }
  board[extractIndex] = turn;
  winner = finalWinner();

  // 5.5 flip turn by multiply turn by -1
  turn = turn * -1;

  render();
  if (!board.includes(null)) {
    prompt.innerHTML = "Game over";
  }
}
function finalWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (
      Math.abs(board[0] + board[1] + board[2]) === 3 ||
      Math.abs(board[0] + board[4] + board[8]) === 3 ||
      Math.abs(board[0] + board[3] + board[6]) === 3 ||
      Math.abs(board[6] + board[7] + board[8]) === 3 ||
      Math.abs(board[6] + board[4] + board[2]) === 3 ||
      Math.abs(board[3] + board[4] + board[5]) === 3 ||
      Math.abs(board[1] + board[4] + board[7]) === 3 ||
      Math.abs(board[2] + board[5] + board[8]) === 3
    )
      return (winner = true);
  }
  if (board.includes(null)) {
    winner = "T";
  }
}
init();
