const game = (() => {
  let currentPlayer, P1, P2;

  const Player = (name, symbol) => {
    let playerArr = [];
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
            return playerWin();
          }
        }
      }
      console.log(Board.getArr().includes(""));
      if (!Board.getArr().includes("")) {
        return playerDraw();
      }
    };

    const playerWin = () => {
      console.log("you won");
    };

    const playerDraw = () => {
      console.log("you drew");
    };

    return { getName, getSymbol, getArr, move };
  };

  const ini = () => {
    P1 = Player("Lyle", "X");
    P2 = Player("Kyle", "O");
    currentPlayer = P1;
    addEventListeners();
  };

  const addEventListeners = () => {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      block.addEventListener("click", (e) => {
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

  return {
    ini,
  };
})();

game.ini();

////////////////////////////////////////////////////////////////////////////////////////

const Board = (() => {
  const boardArray = ["", "", "", "", "", "", "", "", ""];
  const getArr = () => boardArray;
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
  };
})();


////////////////////////////////////////////////////////////////////////////////////////

const displayController = (() => {
  const update = () => {
    let boardArray = Board.getArr();
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block, index) => {
      block.textContent = boardArray[index];
    });
  };

  return {
    update,
  };
})();