// Versão simplificada
document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const statusText = document.getElementById('status');
  const restartButton = document.getElementById('restart');

  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let winner = null;

  // Função principal para fazer jogada
  function makeMove(index) {
    if (!board[index] && !winner) {
      board[index] = currentPlayer;
      updateBoard();

      if (checkWinner()) {
        winner = currentPlayer;
        statusText.textContent = `O jogador ${winner} venceu!`;
        alert(`O jogador ${winner} ganhou!`);
        restart();
      } else if (board.every(cell => cell !== null)) {
        winner = 'Draw';
        statusText.textContent = 'Empate!';
        alert('Empate!');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Vez do jogador ${currentPlayer}`;
      }
    }
  }

  // Atualiza a UI
  function updateBoard() {
    cells.forEach((cell, i) => {
      cell.textContent = board[i] || '';
    });
  }

  // Verifica vencedor
  function checkWinner() {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return wins.some(([a,b,c]) =>
      board[a] && board[a] === board[b] && board[a] === board[c]
    );
  }

  // Reinicia o jogo
  function restart() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    winner = null;
    updateBoard();
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
  }

  // Inicializa eventos
  cells.forEach((cell, i) => {
    cell.addEventListener('click', () => makeMove(i));
  });
  restartButton.addEventListener('click', restart);

  // Estado inicial
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
});

