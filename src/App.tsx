import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import SelectionSortWithController from './sortings/selection';
import styled from 'styled-components';
import './index.scss';
import Switch from './components/buttons/Switch';

const darkTheme = {
  main: {
    'main-background': '#191A19',
    'main-text': 'whitesmoke',
    'dark-accent': '#1E5128',
    'dark-text': 'black',
    'light-text': 'whitesmoke',
    'dark-accent-1': '#4E9F3D',
    'light-accent': '#D8E9A8',
    'light-accent-1': 'whitesmoke',
  },
};
const lightTheme = {
  main: {
    'main-background': '#FEF5ED',
    'main-text': 'black',
    'dark-accent': '#632626',
    'dark-text': 'black',
    'light-text': 'whitesmoke',
    'dark-accent-1': '#9D5353',
    'light-accent': '#BF8B67',
    'light-accent-1': 'black',
  },
};

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.main['main-background']};
  color: ${(props) => props.theme.main['main-text']};
`;

function App(): ReactElement {
  const [darkThemeStatus, toggleDarkTheme] = React.useState(false);

  return (
    <ThemeProvider theme={darkThemeStatus ? darkTheme : lightTheme}>
      <MainContainer>
        <Switch active={darkThemeStatus} handleOnChange={toggleDarkTheme} />
        <SelectionSortWithController />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
