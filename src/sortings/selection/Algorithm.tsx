import React from 'react';
import styled, { css } from 'styled-components';
import { AlogrithmShape } from './types';
import { v4 as generateUniqueId } from 'uuid';
const AlogrithmContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`;

type StyledBoxShape = {
  readonly isActive: boolean;
  readonly isMinimum: boolean;
};

const Box = styled.div<StyledBoxShape>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.theme.main['dark-accent']};
  margin: 2px;
  padding: 2rem;
  border-radius: 10px;
  color: ${(props) => props.theme.main['light-text']};
  ${(props) =>
    props.isActive &&
    css`
      background-color: ${(props) => props.theme.main['dark-accent-1']};
    `};
  ${(props) =>
    props.isMinimum &&
    css`
      background-color: ${(props) => props.theme.main['light-accent']};
      color: ${(props) => props.theme.main['dark-text']};
    `};
`;

function Alogrithm({
  data,
  sorted,
  speed,
  updateSortedStatus = () => {
    // do nothing
  },
}: AlogrithmShape) {
  const [currentSwappingValues, setCurrentSwappingValues] = React.useState<{
    i: number;
    swapValueIndex: number;
  }>({
    i: 0,
    swapValueIndex: 0,
  });

  const [minIndex, setMinIndex] = React.useState<number>(-1);

  const swap = async (j: number, i: number) => {
    await new Promise(() => {
      setTimeout(() => {
        const temp = data[j];
        data[j] = data[i];
        data[i] = temp;
        setCurrentSwappingValues(() => ({
          ...currentSwappingValues,
          i: currentSwappingValues.i + 1,
          swapValueIndex: j,
        }));
      }, speed);
    });
  };

  const findMinimum = () => {
    let min = currentSwappingValues.i;
    for (let j = currentSwappingValues.i + 1; j < data?.length; j += 1) {
      if (data[j] > data[min]) {
        min = j;
      }
    }
    setMinIndex(min);
    swap(min, currentSwappingValues.i);
  };

  React.useEffect(() => {
    if (
      (sorted === 'NS' || sorted === 'IP') &&
      currentSwappingValues.i < data?.length
    ) {
      updateSortedStatus('IP');
      findMinimum();
    }
    if (currentSwappingValues.i === data?.length) {
      updateSortedStatus('AS');
      setCurrentSwappingValues({ i: -1, swapValueIndex: 0 });
      setMinIndex(-1);
    }
  }, [currentSwappingValues, data]);

  return (
    data && (
      <AlogrithmContainer>
        {data.map((item, index) => (
          <Box
            key={generateUniqueId()}
            isActive={index === currentSwappingValues.i}
            isMinimum={index === minIndex}>
            {item}
          </Box>
        ))}
      </AlogrithmContainer>
    )
  );
}

export default Alogrithm;
