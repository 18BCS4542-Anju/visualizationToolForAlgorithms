import React from "react";
import styled from "styled-components";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Controller } from "./components/Controller";
import { AlgoDisplay } from "./components/AlgoDisplay";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const Container = styled.div`
  margin: 0 10px;
  min-height: calc(100vh - 50px);
  position: relative;
  margin-bottom: 50px;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E33E7F",
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <NavBar />
        <Controller />
        <AlgoDisplay />
        <Footer />
      </Container>
    </MuiThemeProvider>
  );
}
