import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import TicTacToeGrid from './components/TicTacToeGrid';
import AppContext from './context/AppContext';

window.alert = jest.fn();

test('page renders', () => {
  render(<App />);
  const ticTacToeTitle = screen.getByText(/Tick Tac Toe!/i);
  const btnText = screen.getByText(/New game/);
  expect(ticTacToeTitle).toBeInTheDocument();
  expect(btnText).toBeInTheDocument();
});

function renderWithProvider(props) {
  return render(
    <AppContext.Provider value={props}>
      <TicTacToeGrid />
    </AppContext.Provider>
  );
}

test('players draw', () => {
  const providerProps = {
    state: [[0, 1, 0], [1, 0, 1], [1, 0, 1]],
    val: 1,
    winner: 2
  }
  renderWithProvider(providerProps);
  expect(screen.getByText(/draw 😢/)).toBeInTheDocument();
})

test('player X wins', () => {
  const providerProps = {
    state: [[1, 1, 1], [0, 0, -1], [-1, -1, -1]],
    val: 1,
    winner: 1
  }
  renderWithProvider(providerProps);
  expect(screen.getByText(/X wins 👍/)).toBeInTheDocument();
})

test('player O wins', () => {
  const providerProps = {
    state: [[0, 1, 1], [1, 0, -1], [1, -1, 0]],
    val: 1,
    winner: 0
  }
  renderWithProvider(providerProps);
  expect(screen.getByText(/O wins 👍/)).toBeInTheDocument();
})

test('create new game', () => {
  const providerProps = {
    state: [[0, -1, -1], [-1, 0, -1], [-1, -1, 0]],
    val: 0,
    winner: -1,
    resetState: jest.fn(),
  }

  renderWithProvider(providerProps);
  fireEvent.click(screen.getByText(/New game/i));
  expect(providerProps.resetState).toBeCalled();
})