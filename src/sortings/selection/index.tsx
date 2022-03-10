import React from 'react';
import Alogrithm from './Algorithm';
import { sortedStatusShape } from './types';
import '../styles/index.scss';

interface ControllerShape {
    speed: number;
    size: number;
}

interface ArrayStatusShape {
    sorted: sortedStatusShape;
    data: Array<number>;
}

const SelectionSortWithController = () => {
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
            <h4>Sorted : {arrayStatus.sorted.toString()}</h4>
            <Alogrithm
                data={arrayStatus.data}
                sorted={arrayStatus.sorted}
                speed={controllers.speed}
                key={arrayStatus.data.length}
                updateSortedStatus={(sorted) =>
                    setArrayStatus({ ...arrayStatus, sorted })
                }
            />
            <section className="controlsContainer">
                <button
                    onClick={() =>
                        setControllers({
                            ...controllers,
                            speed: controllers.speed / 2,
                        })
                    }>
                    speed 2x
                </button>
                <button
                    onClick={() =>
                        setControllers({
                            ...controllers,
                            size: controllers.size + 5,
                        })
                    }>
                    size + 5
                </button>
                <button
                    onClick={() =>
                        setArrayStatus({
                            sorted: 'NS',
                            data: Array.from({ length: controllers.size }, () =>
                                Math.floor(Math.random() * 200)
                            ),
                        })
                    }
                    disabled={arrayStatus.sorted === 'IP'}>
                    generate array with size {controllers.size}
                </button>
            </section>
        </div>
    );
};

export default SelectionSortWithController;
