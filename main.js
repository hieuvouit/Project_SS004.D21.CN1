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
    });
  }

  // hàm gọi game
  requestAnimationFrame(loop);
};
