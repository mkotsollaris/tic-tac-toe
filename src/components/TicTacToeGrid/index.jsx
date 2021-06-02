import React from 'react';
import GridItem from '../GridItem';
import styled from 'styled-components';
import AppContext from '../../context/AppContext';
import labels from '../../constants';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 230px 230px 230px;
    width: 650px;
    min-width: 700px;
`

const StyledDiv = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
    display: grid;
    margin-top: ${props => props.topMargin ? props.topMargin : '0rem'};
    margin-bottom: ${props => props.bottomMargin ? props.bottomMargin : '0rem'}
`;

const StyledButton = styled.button`
    width: 5rem;
`;

const TicTacToeGrid = () => {

    const { state, val, resetState, winner } = React.useContext(AppContext);

    const element = state.map((row, rowIndex) => {
        return <StyledGrid key={rowIndex}>
            {row.map((_, colIndex) => {
                return <GridItem key={rowIndex + colIndex} row={rowIndex} col={colIndex} />
            })}
        </StyledGrid>
    })

    let winnerLabel = winner === 0 || winner === 1 ? `${labels[winner]} wins 👍` : null;
    let drawLabel = winner === 2 ? 'We have a draw 😢' : null;

    let bottomLabel;
    if (winnerLabel) {
        bottomLabel = winnerLabel
    } else if (drawLabel) {
        bottomLabel = drawLabel;
    } else {
        bottomLabel = `It's ${labels[val]}'s turn`;
    }
    return <StyledDiv>
        <h1>Tick Tac Toe!</h1>
        {element}
        <StyledDiv topMargin='1rem'>
            {bottomLabel}
        </StyledDiv>
        <StyledDiv bottomMargin='1rem' topMargin='1rem'>
            <StyledButton onClick={() => { resetState() }}>New game</StyledButton>
        </StyledDiv>
    </StyledDiv>
}

export default TicTacToeGrid;