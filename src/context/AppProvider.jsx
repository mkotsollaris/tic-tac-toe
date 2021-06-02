import React from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {

    let getNewArray = () => [new Array(3).fill(-1), new Array(3).fill(-1), new Array(3).fill(-1)];

    const [state, setState] = React.useState(getNewArray());
    const [val, setVal] = React.useState(1);
    const [winner, setWinner] = React.useState(-1);

    const resetState = () => {
        setState(getNewArray())
        setWinner(-1);
    }

    const callback = (row, col) => {
        state[row][col] = val;
        setState(state);
        updateWinningPlayer();
        setVal(val === 1 ? 0 : 1);
    }

    const isDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] === -1) {
                    return false;
                }
            }
        }
        return true;
    }

    const updateWinningPlayer = () => {

        const diagonals = checkDiagonals();
        const verticals = checkVerticals();
        const horizontals = checkHorizontals();

        if (diagonals !== -1) {
            setWinner(diagonals)
            return;
        }

        if (verticals !== -1) {
            setWinner(verticals);
            return;
        }

        if (horizontals !== -1) {
            setWinner(horizontals);
            return;
        }

        if (isDraw()) {
            setWinner(2);
        }
    }

    const checkDiagonals = () => {
        if ((state[0][0] === val && state[1][1] === val && state[2][2] === val) ||
            (state[0][2] === val && state[1][1] === val && state[2][0] === val)) {
            return val;
        }
        return -1;
    }

    const checkVerticals = () => {
        for (let i = 0; i <= 2; i++) {
            if (state[0][i] === val && state[1][i] === val && state[2][i] === val) {
                return val;
            }
        }
        return -1;
    }
    const checkHorizontals = () => {
        for (let i = 0; i <= 2; i++) {
            if (state[i][0] === val && state[i][1] === val && state[i][2] === val) {
                return val;
            }
        }
        return -1;
    }

    return <AppContext.Provider value={{
        state, setState, val, setVal, callback, resetState,
        winner, setWinner
    }} >
        {children}
    </AppContext.Provider>
}

export default AppProvider;