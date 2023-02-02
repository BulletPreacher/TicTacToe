const game = (() => {
  let currentPlayer, currentCombo, P1, P2, isDone, isWin, opp;
  let message = document.getElementById("Message");
  let board = document.getElementById("board");
  const blocks = document.querySelectorAll(".block");

  const playerGame = () => {
    opp = "player";
    Board.clear();
  };

  const aiGame = () => {
    opp = "AI";
    Board.clear();
  };

  const end = () => {
    const setDone = () => (isDone = true);
    const getDone = () => isDone;
    return { getDone, setDone };
  };

  const Board = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    const clear = () => {
      boardArray = ["", "", "", "", "", "", "", "", ""];
      displayController.clear();
    };
    const getArr = () => boardArray;
    const update = (index, symbol) => {
      boardArray[index] = symbol;
      displayController.update();
    };
    return {
      clear,
      getArr,
      update,
    };
  })();

  const displayController = (() => {
    const update = () => {
      let boardArray = Board.getArr();
      blocks.forEach((block, index) => {
        if (boardArray[index] == "X") {
          let colorBlock = "#e61000";
          block.textContent = boardArray[index];
          block.style.color = colorBlock;
        } else {
          let colorBlock = "#673ab7";
          block.textContent = boardArray[index];
          block.style.color = colorBlock;
        }
      });
    };

    const clear = () => {
      message.innerHTML = "";
      board.style.transform = "Scale(1)";
      P1 = Player("X", "X");
      P2 = Player("O", "O");
      currentPlayer = P1;
      isDone = false;
      isWin = false;
      blocks.forEach((block) => {
        block.style.backgroundColor = "#9eff2d";
        block.textContent = "";
        block.innerHTML = "";
      });
      blockClicked();
    };

    const showWin = (x) => {
      for (let i = 0; i < x.length; i++) {
        let index = x[i];
        blocks[index].style.backgroundColor = "#00bcd4";
      }
      if (currentPlayer == P2 && opp == "AI") message.innerHTML = `AI Wins`;
      else if (currentPlayer == P1 && opp == "AI") {
        message.innerHTML = `You Win`;
      } else {
        message.innerHTML = `${currentPlayer.getName()} Wins`;
      }
      isWin = true;
      game.end().setDone();
    };

    const showDraw = () => {
      message.innerHTML = "Tie - No One Wins";
      game.end().setDone();
    };
    return {
      update,
      clear,
      showWin,
      showDraw,
    };
  })();

  const blockClicked = () => {
    blocks.forEach((block) => {
      block.addEventListener("click", (e) => {
        let index = e.target.getAttribute("data");
        if (game.end().getDone() == true) {
          return;
        } else if (Board.getArr()[index] !== "") {
          return;
        } else {
          currentPlayer.move(index);
        }
        if (game.end().getDone() == true) {
          return;
        }
        if (currentPlayer == P1) {
          currentPlayer = P2;
          if (opp == "AI") {
            currentPlayer.move();
            currentPlayer = P1;
          }
        } else {
          currentPlayer = P1;
        }
      });
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  const miniMax = (board, player) => {
    let winner = player.checkWin(board);
    let bestScore = player === P2 ? -Infinity : Infinity;
    let currentScore;
    let bestMove;

    if (winner === "X" || winner === "O") {
      return winner === player.getSymbol() ? 1 : -1;
    } else if (winner === "TIE") {
      return 0;
    }

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player.getSymbol();
        let nextPlayer = player === P1 ? P2 : P1;
        currentScore = miniMax(board, nextPlayer);
        if (player === P2) {
          if (currentScore > bestScore) {
            bestScore = currentScore;
            bestMove = i;
          }
        } else {
          if (currentScore < bestScore) {
            bestScore = currentScore;
            bestMove = i;
          }
        }
        board[i] = "";
      }
    }
    if (bestMove === undefined) {
      return 0;
    } else if (player === P1) {
      return bestScore;
    } else {
      return bestMove.toString();
    }
  };

  /////////////////////////////////////////////////////////////////////////////

  const Player = (name, symbol) => {
    let playerArr = [];
    const getName = () => name;
    const getSymbol = () => symbol;
    const getArr = () => playerArr;

    const move = (index) => {
      if (opp == "AI" && currentPlayer == P2) {
        var bestMove = miniMax(Board.getArr(), currentPlayer);
        Board.update(bestMove, currentPlayer.getSymbol());
        playerArr.push(bestMove);
      } else {
        Board.update(index, currentPlayer.getSymbol());
        playerArr.push(index);
      }
      let result = checkWin(Board.getArr());
      if (result == currentPlayer.getSymbol()) {
        displayController.showWin(currentCombo);
      } else if (result == "TIE") {
        displayController.showDraw();
      }
    };

    const checkWin = (board) => {
      let arrWinning = [
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"],
      ];
      let count = 0;
      for (let i = 0; i < arrWinning.length; i++) {
        const [a, b, c] = arrWinning[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          currentCombo = arrWinning[i];
          return board[a];
        }
      }
      for (let i = 0; i < 9; i++) {
        if (board[i] !== "") {
          count = count + 1;
          if (count === 9) {
            return "TIE";
          }
        }
      }
      return null;
    };

    return {
      getName,
      getSymbol,
      getArr,
      move,
      checkWin,
    };
  };

  return {
    playerGame,
    aiGame,
    end,
  };
})();

document
  .getElementById("playerGame")
  .addEventListener("click", game.playerGame);
document.getElementById("AIGame").addEventListener("click", game.aiGame);
