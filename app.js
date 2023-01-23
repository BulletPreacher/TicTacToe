const game = (() => {
  let currentPlayer, P1, P2, isDone, isWin, opp;
  let message = document.getElementById("Message");
  let board = document.getElementById("board");

  const end = () => {
    const setDone = () => (isDone = true);
    const getDone = () => isDone;
    return { getDone, setDone };
  };

  const Player = (name, symbol) => {
    let playerArr = [];
    const clearArr = () => (playerArr = []);
    const getName = () => name;
    const getSymbol = () => symbol;
    const getArr = () => playerArr;

    const aiMove = () => {
      var possibleMoves = Board.getArr();
      var moves = [];
      for (let i = 0; i < possibleMoves.length; i++) {
        if (possibleMoves[i] == "") {
          moves.push(i);
        }
      }
      var validMove = moves[Math.floor(Math.random() * moves.length)];
      validMove = validMove.toString();
      playerArr.push(validMove);
      console.log(`Player 2 array: ${typeof playerArr[0]}`);
      return validMove;
    };

    const movePlayer = (index) => {
      playerArr.push(index);
      console.log(`Player 1 array: ${typeof playerArr[0]}`);
    };

    const checkWin = () => {
      console.log("((" + getName() + " Win Check))");
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
        let count = 0;
        let currentCombo = arrWinning[i]; //Checks one of the combos
        console.log("Combo Check: " + arrWinning[i]);

        for (let j = 0; j < currentCombo.length; j++) {
          console.log(
            `Check ${j} ${currentPlayer.getName()} {${currentPlayer.getArr()}} has ${
              currentCombo[j]
            } = ${playerArr.includes(currentCombo[j])} `
          );
          console.log(playerArr);
          playerArr.includes(currentCombo[j]);
          if (playerArr.includes(currentCombo[j])) {
            count++;
            console.log(
              "Combo Matched: " +
                currentCombo +
                " " +
                getName() +
                " has " +
                count +
                " matches"
            );
            if (count == 3) {
              console.log(currentCombo);
              return playerWin(), displayController.showWin(currentCombo);
            }
          }
        }
      }
      if (!Board.getArr().includes("") && isWin == false) {
        return playerDraw();
      }
    };

    const playerWin = () => {
      if (currentPlayer==P2 && opp=="AI")
      message.innerHTML = `AI Wins`;
      else if (currentPlayer==P1 && opp=="AI"){
      message.innerHTML = `You Win`; 
      }else{
        message.innerHTML = `${getName()} Wins`;
      }
      isWin = true;
      game.end().setDone();
    };

    const playerDraw = () => {
      message.innerHTML = "Tie - No One Wins";
      game.end().setDone();
    };

    return {
      clearArr,
      getName,
      getSymbol,
      getArr,
      aiMove,
      movePlayer,
      checkWin,
    };
  };

  const ini = () => {
    isDone = false;
    isWin = false;
    Board.clear();
    displayController.clear();
    P1 = Player("X", "X");
    P2 = Player("O", "O");
    P1.clearArr();
    P2.clearArr();
    currentPlayer = P1;
    message.innerHTML = "";
    addEventListeners();
    board.style.transform = "Scale(1)";
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      block.style.backgroundColor = "#9eff2d";
    });
    console.log("Player Time");
  };

  const playerGame = () => {
    opp = "player";
    ini();
  };

  const aiGame = () => {
    opp = "AI";
    ini();
  };

  const addEventListeners = () => {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      block.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data");
        if (game.end().getDone() == true) {
          //if game is over - return
          return;
        } else if (Board.getArr()[index] !== "") {
          //if block used - return
          return;
        } else {
          //Human plays and checks win()
          Board.update(index, currentPlayer.getSymbol());
          currentPlayer.movePlayer(index);
          currentPlayer.checkWin();
          if (game.end().getDone() == true) {
            return;
          } else if (currentPlayer == P1 && opp == "AI") {
            console.log("AI Time");
            currentPlayer = P2;
            Board.update(currentPlayer.aiMove(), currentPlayer.getSymbol());
            currentPlayer.checkWin();
            currentPlayer = P1;
            console.log("Player Time");
          } else if (currentPlayer == P1 && opp == "player") {
            currentPlayer = P2;
          } else {
            currentPlayer = P1;
          }
        }
      });
    });
  };

  const Board = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    const getArr = () => boardArray;
    const clear = () => (boardArray = ["", "", "", "", "", "", "", "", ""]);
    const update = (index, symbol) => {
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
    const showWin = (x) => {
      const blocks = document.querySelectorAll(".block");
      for (let i = 0; i < x.length; i++) {
        let index = x[i];
        blocks[index].style.backgroundColor = "#00bcd4";
      }
    };
    const clear = () => {
      const blocks = document.querySelectorAll(".block");
      blocks.forEach((block) => {
        block.textContent = "";
        block.innerHTML = "";
        block.style.backgroundColor = "";
      });
    };
    return {
      update,
      showWin,
      clear,
    };
  })();

  ////////////////////////////////////////////// Game Return Start

  return {
    ini, //starts game
    playerGame, //
    aiGame,
    end,
  };
})();

document
  .getElementById("playerGame")
  .addEventListener("click", game.playerGame);

document.getElementById("AIGame").addEventListener("click", game.aiGame);
