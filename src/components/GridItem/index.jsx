import React from 'react';
import styled from 'styled-components';
import AppContext from '../../context/AppContext';

const Item = styled.div`
    width: 215px;
    height: 215px;
    border-right: 14px solid black;
    border-left: 14px solid black;
    border-top: 14px solid black;
    border-bottom: ${props => props.lastRow ? '14px solid black' : 'none'};
    font-size: 10rem;
    :hover {
        background-color: #bbf0ff;
        cursor: pointer;
    }
    color: ${props => props.hasWinner ? 'gray' : 'black'}
`

const GridItem = ({ row, col }) => {

    let { winner, state, callback } = React.useContext(AppContext);

    const val = state[row][col];

    const onClick = () => {
        if (val !== -1 || winner !== -1) {
            return
        }
        callback(row, col);
    }


    const innerVal = <>
        {val === -1 ? '' : val === 0 ? 'O' : 'X'}
    </>

    return <div>
        <Item lastRow={row === 2} hasWinner={winner !== -1} onClick={() => onClick()}>
            {innerVal}
        </Item>
    </div >
}

export default GridItem;