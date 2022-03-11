import React from 'react';
import Alogrithm from './Algorithm';
import { ArrayStatusShape, ControllerShape, sortedStatusShape } from './types';
import '../styles/index.scss';

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
    <div className="container">
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
    </div>
  );
}

export default SelectionSortWithController;
