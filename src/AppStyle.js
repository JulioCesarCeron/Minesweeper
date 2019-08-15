import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  background: #333;
  height: 20px;
  padding: 1px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #1d1f27;
  width: 20px;
  height: 20px;
  margin: 0 1px;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`;