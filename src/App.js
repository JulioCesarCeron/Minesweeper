import React, { useState, useEffect } from "react";
import id from "shortid";
import { ThemeProvider } from "styled-components";

import { Row, Col, Container , Wrapper} from "./AppStyle";

function App() {
  const [grid, setGrid] = useState(initGrid());

  function initGrid() {
    let line = [];
    let matrix = [];
    for (let index = 0; index < 10; index++) {
      line.push(0);
    }

    for (let index = 0; index < 10; index++) {
      matrix.push(line);
    }

    return matrix;
  }

  /*   useEffect(() => {
    initGrid();
  }, []) */

  return (
    <ThemeProvider theme={{}}>
      <Wrapper>
        <Container>
          {grid.map(line => (
            <Row key={id.generate()}>
              {line.map(column => (
                <Col key={id.generate()} />
              ))}
            </Row>
          ))}
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
