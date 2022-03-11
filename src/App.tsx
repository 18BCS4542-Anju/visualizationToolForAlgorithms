import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import SelectionSortWithController from './sortings/selection';
import styled from 'styled-components';
import './index.scss';

const theme = {
  main: {
    'main-background': '#191A19',
    'dark-accent': '#1E5128',
    'dark-text': 'black',
    'light-text': 'whitesmoke',
    'dark-accent-1': '#4E9F3D',
    'light-accent': '#D8E9A8',
    'light-accent-1': 'whitesmoke',
  },
};

const MainContainer = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: ${(props) => props.theme.main['main-background']};
  color: ${(props) => props.theme.main['light-text']};
`;

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <SelectionSortWithController />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
