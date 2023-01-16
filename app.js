const game = (() => {
  let currentPlayer, P1, P2, isDone;
  let message = document.getElementById("Message");
  const Player = (name, symbol) => {
    let playerArr = [];
    const clearArr = () => (playerArr = []);
    const getName = () => name;
    const getSymbol = () => symbol;
    const getArr = () => playerArr;
    const move = (index) => {
      playerArr.push(index);
      checkWin();
    };
    const checkWin = () => {
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

      for (let i = 0; i < arrWinning.length; i++) {
        let currentCombo = arrWinning[i];
        let count = 0;
        for (let j = 0; j < currentCombo.length; j++) {
          if (playerArr.includes(currentCombo[j])) {
            count++;
          }
          if (count == 3) {
            return playerWin(), displayController.showWin(currentCombo);
          }
        }
      }
      if (!Board.getArr().includes("")) {
        return playerDraw();
      }
    };

    const playerWin = () => {
      message.innerHTML = `${getName()} Wins`;
      game.end();
    };

    const playerDraw = () => {
      message.innerHTML = "No one wins - Draw";
      game.end();
    };

    return { clearArr, getName, getSymbol, getArr, move };
  };

  const ini = () => {
    isDone = false;
    P1 = Player("Player1", "X");
    P2 = Player("Player2", "O");
    P1.clearArr();
    P2.clearArr();
    Board.clear();
    currentPlayer = P1;
    message.innerHTML = "";
    addEventListeners();
    displayController.clear();
  };

  const end = () => {
    isDone = true;
  };

  const addEventListeners = () => {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      block.addEventListener("click", (e) => {
        if (e.target.innerHTML !== "") {
          return;
        } else if (isDone == true) {
          return;
        }
        const index = e.target.getAttribute("data");
        Board.update(index, currentPlayer.getSymbol());
        currentPlayer.move(index);
        if (currentPlayer == P1) {
          currentPlayer = P2;
        } else {
          currentPlayer = P1;
        }
      });
    });
  };

  const Board = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    const getArr = () => boardArray;
    const clear = () => (boardArray = ["", "", "", "", "", "", "", "", ""]);
    const update = (index, symbol) => {
      if (boardArray[index] !== "") {
        return;
      }
      boardArray[index] = symbol;
      displayController.update();
    };
    return {
      update,
      getArr,
      clear,
    };
  })();

  const displayController = (() => {
    const update = () => {
      let boardArray = Board.getArr();
      const blocks = document.querySelectorAll(".block");
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
      const blocks = document.querySelectorAll(".block");
      blocks.forEach((block) => {
        block.textContent = "";
        block.style.backgroundColor = "";
      });
    };

    const showWin = (x) => {
      const blocks = document.querySelectorAll(".block");
      for (let i = 0; i < x.length; i++) {
        let index = x[i];
        blocks[index].style.backgroundColor = "#00bcd4";
      }
    };
    return {
      update,
      showWin,
      clear,
    };
  })();

  return {
    ini,
    end,
  };
})();
