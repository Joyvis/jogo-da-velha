// MODELO: cuida apenas da lógica e estado do jogo
class TicTacToeModel {
  constructor() {
    this.board = Array(9).fill(null); // Estado do tabuleiro
    this.currentPlayer = 'X'; // Jogador atual
    this.winner = null; // Resultado (vencedor ou empate)
  }

  makeMove(index) {
    // Só permite jogadas em células vazias e se o jogo ainda não terminou
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;

      if (this.checkWinner()) {
        this.winner = this.currentPlayer; // Define vencedor
      } else if (this.board.every(cell => cell !== null)) {
        this.winner = 'Draw'; // Verifica empate
      } else {
        // Alterna jogador
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner() {
    // Combinações vencedoras (linhas, colunas e diagonais)
    const winningCombinations = [
      [0,1,2],[3,4,5],[6,7,8], // Linhas
      [0,3,6],[1,4,7],[2,5,8], // Colunas
      [0,4,8],[2,4,6] // Diagonais
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      }
    }

    return false;
  }
}

// VISÃO: responsável por interagir com o DOM (HTML)
class TicTacToeView {
  constructor(controller) {
    this.controller = controller;
    this.cells = document.querySelectorAll('.cell');
    this.statusText = document.getElementById('status');
    this.restartButton = document.getElementById('restart');

    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        this.controller.handleMove(index);
      });
    });

    this.restartButton.addEventListener('click', () => {
      this.controller.handleRestart();
    });
  }

  updateBoard(board) {
    this.cells.forEach((cell, i) => {
      cell.textContent = board[i] || '';
    });
  }

  updateStatus(status) {
    this.statusText.textContent = status;
  }
}

// CONTROLADOR: faz a ponte entre a visão e o modelo
class TicTacToeController {
  constructor() {
    this.model = new TicTacToeModel();
    this.view = new TicTacToeView(this);
    this.updateView();
  }

  handleMove(index) {
    this.model.makeMove(index);
    this.updateView();

    if (this.model.winner) {
      setTimeout(() => {
        alert(this.model.winner === 'Draw' ? 'Empate!' : `O jogador ${this.model.winner} ganhou!`);
        this.handleRestart(); // Reinicia após vitória/empate
      }, 100);
    }
  }

  handleRestart() {
    this.model = new TicTacToeModel();
    this.updateView();
  }

  updateView() {
    this.view.updateBoard(this.model.board);
    this.view.updateStatus(
      this.model.winner 
        ? (this.model.winner === 'Draw' ? 'Empate!' : `O jogador ${this.model.winner} venceu!`)
        : `Vez do jogador ${this.model.currentPlayer}`
    );
  }
}

// Inicializa o controlador (e o app inteiro)
document.addEventListener('DOMContentLoaded', () => new TicTacToeController());

