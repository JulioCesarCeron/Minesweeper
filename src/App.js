import React, { useState } from "react";
import id from "shortid";
import { ThemeProvider } from "styled-components";

import { Row, Container, Wrapper } from "./AppStyle";
import Item from "./components/Item";
import { initGrid } from "./utils/initGrid";

function App() {
  const [grid] = useState(initGrid(10));

  /*   useEffect(() => {
    initGrid();
  }, []) */

  return (
    <ThemeProvider theme={{}}>
      <Wrapper>
        <Container>
          {grid.map((line, indexLine) => (
            <Row key={id.generate()}>
              {line.map((item, indexColumn) => (
                <Item
                  key={id.generate()}
                  indexLine={indexLine}
                  indexColumn={indexColumn}
                  item={item}
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
