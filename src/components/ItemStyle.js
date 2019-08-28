import styled from 'styled-components';

export const ItemSquare = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  color: #fff;
  background: ${props => props.isBomb ? '#9e2828' : '#1d1f27'};
  width: 30px;
  height: 30px;
  margin: 0 1px;
  justify-content: center;
  font-size: 14px;
  :hover {
    background: ${props => props.isBomb ? '#9e2828' : '#22242d'};
  }
`;

export const ImgBomb = styled.img`
  height: 30px;
  width: 30px;
`;