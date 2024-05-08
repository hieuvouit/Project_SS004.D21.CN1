window.onload = function () {
  var canvas = document.getElementById("game");
  var context = canvas.getContext("2d");

  var grid = 20;
  var score = 0;
  var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
  };

  // game loop
  function loop() {
    console.log("aaa");
    requestAnimationFrame(loop);

    // thêm vị trí mà con rắn đi qua, index số 0 là đầu rắn
    snake.cells.unshift({
      x: snake.x,
      y: snake.y,
    });

    // Duyệt thân và vẽ rắn
    context.fillStyle = "green";
    snake.cells.forEach(function (cell, index) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

      // Duyệt thân
      for (var i = index + 1; i < snake.cells.length; i++) {
        // Khi rắn dụng thân, reset game
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;

            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            updateLeaderboard();
            score = 0;
            document.getElementById('score').innerText = 'Score: ' + score;
        }
      }
    });
    
    // Bảng xếp hạng
var leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function saveLeaderboard() {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function updateLeaderboard() {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 5);
    saveLeaderboard();
    displayLeaderboard();
}

function displayLeaderboard() {
    var leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = 'Leaderboard:<br>';
    leaderboard.forEach((score, index) => {
        leaderboardElement.innerHTML += `${index + 1}. ${score}<br>`;
    });
}
    
// hàm gọi game
requestAnimationFrame(loop);
displayLeaderboard();    
}

