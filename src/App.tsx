import React from 'react';

interface LinearArrayShape {
    sorted: boolean;
    data: Array<number>;
}

interface ControllerShape {
    speed: number;
    size: number;
}

const App = () => {
    const [array, setData] = React.useState<LinearArrayShape>({
        sorted: false,
        data: [20, 40, 80, 90, 120, 60, -120, -100, -80, -40, -20],
    });

    const [currentSwappingValues, setCurrentSwappingValues] = React.useState({
        i: 0,
    });

    const [controllers, setControllers] = React.useState<ControllerShape>({
        speed: 1000,
        size: 10,
    });

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!array.sorted && currentSwappingValues.i < array.data.length) {
            setTimeout(() => {
                let minIndex = currentSwappingValues.i;
                for (let j = minIndex + 1; j < array.data.length; j++) {
                    if (array.data[j] < array.data[minIndex]) {
                        minIndex = j;
                    }
                }
                const temp = array.data[minIndex];
                array.data[minIndex] = array.data[currentSwappingValues.i];
                array.data[currentSwappingValues.i] = temp;
                setCurrentSwappingValues({
                    ...currentSwappingValues,
                    i: currentSwappingValues.i + 1,
                });
            }, controllers.speed);
        }
    }, [currentSwappingValues]);

    return (
        <>
            {JSON.stringify(array, null, 2)}
            {JSON.stringify(currentSwappingValues, null, 2)}
            {array.data.map((item) => (
                <p>{item}</p>
            ))}
            <h1>{count}</h1>
            <button
                onClick={() =>
                    setControllers({
                        ...controllers,
                        speed: controllers.speed / 2,
                    })
                }>
                Increase the speed by 2x
            </button>
        </>
    );
};

export default App;
