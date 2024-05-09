window.onload = function () {
  var canvas = document.getElementById("game");
  var context = canvas.getContext("2d");
  var leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
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
    });
    
    // Bảng xếp hạng
  

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

  // Hàm điều khiển rắn
  document.addEventListener('keydown', function(e) {
    // trái
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // lên
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // phải
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // xuống
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
  });
    
// hàm gọi game
  requestAnimationFrame(loop);
  displayLeaderboard();   
  }
} 