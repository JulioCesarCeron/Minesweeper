import React, { useState, useEffect } from "react";
import id from "shortid";
import { ThemeProvider } from "styled-components";

import { Row, Container, Wrapper } from "./AppStyle";
import Item from "./components/Item";
import { initGrid } from "./utils/initGrid";

function App() {
  const [grid, setGrid] = useState(initGrid(10));
  const [name, setName] = useState('');
  const [blow, setBlow] = useState(false);
  

  const touchField = (x, y) => {
    const modifyGrid = grid;
    if (modifyGrid[x][y].bomb === 1) {
      modifyGrid.forEach(line => {
        line.forEach(item => {
          if(item.bomb === 1) {
            item.active = 1;
          }
        })
      });
      setBlow(true);
    }
    modifyGrid[x][y].active = 1;
    setGrid(modifyGrid);
    setName(`${x}-${y}`);
  }

  return (
    <ThemeProvider theme={{}}>
      <Wrapper>
        {blow && <h3 style={{ marginTop: 0 }} >Fim do Jogo</h3>}
        <Container>
          {grid.map((line, indexLine) => (
            <Row key={id.generate()}>
              {line.map((item, indexColumn) => (
                <Item
                  key={id.generate()}
                  indexLine={indexLine}
                  indexColumn={indexColumn}
                  item={item}
                  onTouchField={touchField}
                />
              ))}
            </Row>
          ))}
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
