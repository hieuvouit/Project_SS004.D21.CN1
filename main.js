window.onload = function () {
  var canvas = document.getElementById("game");
  var context = canvas.getContext("2d");
  var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  var grid = 20;
  var score = 0;
  var count = 0;
  var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
  };
  // đối tượng mồi
  var apple = {
    x: 320,
    y: 320
  };

  // hàm random
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // game loop
  function loop() {
    requestAnimationFrame(loop);

    // Reset đầu rắn nếu tràn khỏi màn hình chiều ngang
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // Reset đầu rắn nếu tràn khỏi màn hình chiều dọc
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;

    if (++count < 10) {
      return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Di chuyển
    snake.x += snake.dx;
    snake.y += snake.dy;


    // Hiệu ứng di chuyển
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    
    // Vẽ mồi 
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Reset đầu rắn nếu tràn khỏi màn hình chiều dọc
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
      snake.y = 0;
    }

    // thêm vị trí mà con rắn đi qua, index số 0 là đầu rắn
    snake.cells.unshift({
      x: snake.x,
      y: snake.y,
    });

    // Hiệu ứng di chuyển
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    // Duyệt thân và vẽ rắn
    context.fillStyle = "green";
    snake.cells.forEach(function (cell, index) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
  
      // Cộng thêm điểm nếu rắn ăn mồi, xuất hiện mồi mới
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }

      // Duyệt thân
      for (var i = index + 1; i < snake.cells.length; i++) {
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
          document.getElementById("score").innerText = "Score: " + score;
        }
      }
    });
    // Hàm điều khiển rắn
  }

  document.addEventListener("keydown", function (e) {
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

  // Bảng xếp hạng
  function saveLeaderboard() {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }

  function updateLeaderboard() {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 5);
    saveLeaderboard();
    displayLeaderboard();
  }

  function displayLeaderboard() {
    var leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "Leaderboard:<br>";
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
};

