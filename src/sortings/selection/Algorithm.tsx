import React from 'react';
import { getClassNames } from '../utils';
import { sortedStatusShape } from './types';

interface AlogrithmShape {
  data: Array<number>;
  sorted: sortedStatusShape;
  speed: number;
  updateSortedStatus: Function;
}

function Alogrithm({
  data,
  sorted,
  speed,
  updateSortedStatus = () => {},
}: AlogrithmShape) {
  const [currentSwappingValues, setCurrentSwappingValues] = React.useState<{
    i: number;
    swapValueIndex: number;
  }>({
    i: 0,
    swapValueIndex: 0,
  });

  const [minIndex, setMinIndex] = React.useState<number>(-1);

  const swap = async (min: number, i: number) => {
    await new Promise(() => {
      setTimeout(() => {
        const temp = data[min];
        data[min] = data[i];
        data[i] = temp;
        setCurrentSwappingValues(() => ({
          ...currentSwappingValues,
          i: currentSwappingValues.i + 1,
          swapValueIndex: min,
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
    setMinIndex(minIndex);
    swap(minIndex, currentSwappingValues.i);
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
      setCurrentSwappingValues({ i: 0, swapValueIndex: 0 });
      setMinIndex(-1);
    }
  }, [currentSwappingValues, data]);

  return (
    data && (
      <div className="algorithmContainer">
        {data.map((item: number, index: number) => (
          <span
            key={item + Math.random()}
            className={getClassNames(
              index,
              currentSwappingValues.i,
              minIndex,
              sorted,
            )}>
            {item}
          </span>
        ))}
      </div>
    )
  );
}

export default Alogrithm;
