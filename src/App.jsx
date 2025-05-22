import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  
  let currentPlayer = "X"

  if(gameTurns.length > 0 && gameTurns[0]. player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer
}


function App() {

  // Kaks komponenti töötavad eraldi
  // Ühe state'i muutmine, ei muuda teise komponendi state'i

  // const [activePlayer, setActivePlayer] = useState("X");

  const [gameTurns, setGameTurns] = useState([]);

  const [players, setPlayers] = useState({X : "Player 1", O : "Player 2"} )

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array=> [...array])]

for (const turn of gameTurns) {
  const { square, player } = turn;
  const { row, col } = square;

  gameBoard[row] [col] = player;
}

  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column]

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;


  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns]

      return updatedTurns;
    });
  }

  const handleRestart = () => {
    setGameTurns([])
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <Player onChangeName={handlePlayerNameChange} initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
         <Player onChangeName={handlePlayerNameChange} initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
     {/* {gameTurns.map((gameTurn,id) =>
      <ol key={id} id="log">
        {gameTurn.player} selected {gameTurn.square.row},{gameTurn.square.col}
      </ol>)} */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
