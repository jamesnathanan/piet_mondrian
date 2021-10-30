const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    const white = "#f2f2f2";
    const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];
    let inc = 6;
    var step = width / inc;
    const squares = [
      {
        x: 0,
        y: 0,
        width: width,
        height: height,
      },
    ];

    const draw = () => {
      for (let i = 0; i < colors.length; i++) {
        squares[Math.floor(Math.random() * squares.length)].color = colors[i];
      }
      for (let i = 0; i < squares.length; i++) {
        context.beginPath();
        context.rect(
          squares[i].x,
          squares[i].y,
          squares[i].width,
          squares[i].height
        );
        if (squares[i].color) {
          context.fillStyle = squares[i].color;
        } else {
          context.fillStyle = white;
        }
        context.fill();
        context.stroke();
      }
    };

    const splitSquaresWith = (coordinates) => {
      const { x, y } = coordinates;
      for (let i = squares.length - 1; i >= 0; i--) {
        const square = squares[i];
        if (x && x > square.x && x < square.x + square.width) {
          if (Math.random() > 0.5) {
            squares.splice(i, 1);
            splitOnX(square, x);
          }
        }

        if (y && y > square.y && y < square.y + square.height) {
          if (Math.random() > 0.5) {
            squares.splice(i, 1);
            splitOnY(square, y);
          }
        }
      }
    };
    const splitOnX = (square, splitAt) => {
      const squareA = {
        x: square.x,
        y: square.y,
        width: square.width - (square.width - splitAt + square.x),
        height: square.height,
      };
      const squareB = {
        x: splitAt,
        y: square.y,
        width: square.width - splitAt + square.x,
        height: square.height,
      };
      squares.push(squareA);
      squares.push(squareB);
    };
    const splitOnY = (square, splitAt) => {
      const squareA = {
        x: square.x,
        y: square.y,
        width: square.width,
        height: square.height - (square.height - splitAt + square.y),
      };
      const squareB = {
        x: square.x,
        y: splitAt,
        width: square.width,
        height: square.height - splitAt + square.y,
      };
      squares.push(squareA);
      squares.push(squareB);
    };

    context.lineWidth = width * 0.02;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // splitSquaresWith({ x: 160 });
    // splitSquaresWith({ y: 160 });
    for (let i = 0; i < width; i += step) {
      splitSquaresWith({ y: i });
      splitSquaresWith({ x: i });
    }
    draw();
  };
};

canvasSketch(sketch, settings);
