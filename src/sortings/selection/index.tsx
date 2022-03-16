import React from 'react';
import styled from 'styled-components';
import Alogrithm from './Algorithm';
import { ArrayStatusShape, ControllerShape, sortedStatusShape } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFastForward,
  faPlus,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

const AlogrithmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Controls = styled.button`
  padding: 1rem 2.625rem;
  background-color: ${(props) => props.theme.main['dark-accent']};
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.main['light-accent']};
  margin: 1rem;
  &:disabled {
    background-color: ${(props) => props.theme.main['light-accent']};
    color: ${(props) => props.theme.main['dark-text']};
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

function SelectionSortWithController() {
  const [arrayStatus, setArrayStatus] = React.useState<ArrayStatusShape>({
    sorted: 'NS',
    data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 200)),
  });
  const [controllers, setControllers] = React.useState<ControllerShape>({
    speed: 3000,
    size: 10,
  });

  return (
    <AlogrithmContainer>
      <h1>SelectionSort</h1>
      <h4>Sorted :{arrayStatus.sorted.toString()}</h4>
      <Alogrithm
        data={arrayStatus.data}
        sorted={arrayStatus.sorted}
        speed={controllers.speed}
        updateSortedStatus={(sorted: sortedStatusShape) =>
          setArrayStatus({ ...arrayStatus, sorted })
        }
      />
      <div
        style={{
          height: '40%',
          margin: '1.5rem',
        }}>
        <Controls
          aria-label="speed"
          onClick={() =>
            setControllers((prevState) => ({
              ...prevState,
              speed: prevState.speed / 2,
            }))
          }>
          <FontAwesomeIcon icon={faFastForward} />
        </Controls>
        <Controls
          aria-label="size"
          onClick={() =>
            setControllers((prevState) => ({
              ...prevState,
              size: prevState.size + 10,
            }))
          }>
          <FontAwesomeIcon icon={faPlus} />
        </Controls>
        <Controls
          aria-label="reset"
          disabled={arrayStatus.sorted !== 'AS'}
          onClick={() =>
            setArrayStatus({
              sorted: 'NS',
              data: Array.from({ length: controllers.size }, () =>
                Math.floor(Math.random() * 200),
              ),
            })
          }>
          <FontAwesomeIcon icon={faRotateRight} />
        </Controls>
      </div>
    </AlogrithmContainer>
  );
}

export default SelectionSortWithController;
