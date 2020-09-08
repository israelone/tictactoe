//Sets up gameboard
const Gameboard = () => {
  const buttons = Array.from(document.getElementsByClassName("button"));
  const playerInput = document.getElementById("playerInput");
  const playerVsPlayer = document.getElementById("playerVsPlayer");
  let tiles = Array.from(document.getElementsByClassName("tiles"));
  let gameArea = ["", "", "", "", "", "", "", "", ""];
  let playerOneName = document.getElementById("playerOneName");
  let playerTwoName = document.getElementById("playerTwoName");
  let winner = "";
  var playerOne;
  var playerTwo;
  var playerTurn;
  var currentTurn = 0;

  buttons.forEach(function (elem) {
    elem.addEventListener("click", function () {
      if (elem.id === "playerVsPlayer") {
        playerVsPlayer.parentElement.style.display = "none";
        playerOneName.parentElement.style.display = "";
        playerInput.style.display = "block";
      } else if (elem.id === "startGameButton") {
        startGame();
      } else {
        restartGame();
      }
    });
  });

  //Player contructor receives information from input 
  const Player = (playerName, selection) => {
    const name = playerName;
    const tile = selection;
    return { tile, name };
  };

  //Adds listerners to tiles
  const gameFlow = () => {
    tiles.forEach(function (elem) {
      elem.addEventListener("click", function () {
        logPlayerSelection(elem);
      });
    });
  };

  //Starts game if it has received name input from players
  const startGame = () => {
    if (playerOneName.value === "" || playerTwoName.value === "") {
      alert("Please enter your names");
    } else {
      playerInput.style.display = "none";
      document.getElementById("gameArea").style.display = "grid";
      createPlayers();
    }
  };

  //Creates player calling Player constructor
  const createPlayers = () => {
    playerOne = Player(playerOneName.value, "X");
    playerTwo = Player(playerTwoName.value, "O");
    playerOneName.value = "";
    playerTwoName.value = "";
    playerTurn = playerOne;
    gameFlow(playerOne, playerTwo);
  };

  //Checks for winner by going over the gameboard and check for all possible ways to win
  const checkForWinner = (tile) => {
    if (
      (gameArea[0] == tile && gameArea[1] == tile && gameArea[2] == tile) ||
      (gameArea[3] == tile && gameArea[4] == tile && gameArea[5] == tile) ||
      (gameArea[6] == tile && gameArea[7] == tile && gameArea[8] == tile) ||
      (gameArea[0] == tile && gameArea[3] == tile && gameArea[6] == tile) ||
      (gameArea[1] == tile && gameArea[4] == tile && gameArea[7] == tile) ||
      (gameArea[2] == tile && gameArea[5] == tile && gameArea[8] == tile) ||
      (gameArea[0] == tile && gameArea[4] == tile && gameArea[8] == tile) ||
      (gameArea[2] == tile && gameArea[4] == tile && gameArea[6] == tile)
      ){
      selectWinner(playerTurn.name);
      }
     
    else{
      if (currentTurn === 9 && winner == "") {
        selectWinner("Its a Draw");
      }
    }
  };

  //Logs player tile selection, keeping track of them in an array and keeping track of current turn
  const logPlayerSelection = (areaSelection) => {
    if (areaSelection.innerText === "" && winner === "") {
      areaSelection.innerText = playerTurn.tile;
      currentTurn++;
      gameArea.splice(areaSelection.id, 1, areaSelection.innerText);
      if (currentTurn > 4) {
        checkForWinner(playerTurn.tile);
      }
      if (playerTurn === playerOne) {
        playerTurn = playerTwo;
      } else {
        playerTurn = playerOne;
      }
    }
  };

  const restartGame = () => {
    tiles.forEach(function (elem) {
      elem.innerText = "";
    });
    winner = "";
    playerOne = "";
    playerTwo = "";
    playerTurn = "";
    gameArea = ["", "", "", "", "", "", "", "", ""];
    currentTurn = 0;
    selectMode();
  };

  //Currently only player vs player mode is available
  const selectMode = () => {
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("winnerDisplay").style.display = "none";
    document.getElementById("modeSelection").style.display = "block";
  };


  const selectWinner = (result) => {
    winner = result;
    document.getElementById("winner").innerText = winner + " Wins ";
    document.getElementById("winnerDisplay").style.display = "block";
    removeHandler();
  };
  
  //Removes even listener to prevent players from continue selecting tiles after end of game
  const removeHandler = () => {
    tiles.forEach(function (elem) {
      elem.removeEventListener("click", logPlayerSelection);
    });
  };

  return { selectMode };
};

const tictactoe = Gameboard();
tictactoe.selectMode();