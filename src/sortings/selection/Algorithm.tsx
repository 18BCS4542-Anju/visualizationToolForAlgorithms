import React from 'react';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components';
import { v4 as generateUniqueId } from 'uuid';
import { AlogrithmShape } from './types';

const AlogrithmContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
`;

type StyledBoxShape = {
  readonly isActive: boolean;
  readonly isMinimum: boolean;
};

const Box = styled(animated.div)<StyledBoxShape>`
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

  const [alreadySorted, markSorted] = React.useState<Array<number>>([]);

  const [minIndex, setMinIndex] = React.useState<number>(-1);
  const swapRef = React.useRef<HTMLDivElement>(null);

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

  const findMinimum = async () => {
    let min = currentSwappingValues.i;
    for (let j = currentSwappingValues.i + 1; j < data?.length; j += 1) {
      if (data[j] > data[min]) {
        min = j;
      }
    }
    setMinIndex(min);

    await swap(min, currentSwappingValues.i);
  };

  React.useEffect(() => {
    if (
      (sorted === 'NS' || sorted === 'IP') &&
      currentSwappingValues.i < data?.length
    ) {
      findMinimum().then(() => updateSortedStatus('IP'));
    }
    if (currentSwappingValues.i === data?.length) {
      updateSortedStatus('AS');
      setCurrentSwappingValues({ i: -1, swapValueIndex: 0 });
      setMinIndex(-1);
    }
  }, [currentSwappingValues, data]);

  console.log(swapRef?.current?.innerText);
  return (
    data && (
      <AlogrithmContainer>
        {data.map((item, index) => (
          <Box
            ref={(el) => {
              // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
              if (!el) return;

              if (
                index === currentSwappingValues.i &&
                !alreadySorted.includes(data[index])
              ) {
                console.log(el.getBoundingClientRect().left, el.innerText); // prints 200px
                markSorted((prevState) => [...prevState, data[index]]);
              }
            }}
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
