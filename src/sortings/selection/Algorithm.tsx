import React from 'react';

interface AlogrithmShape {
    data: Array<number>;
    sorted: boolean;
    speed: number;
    updateSortedStatus: (sorted: boolean) => void;
}

const Alogrithm = ({
    data,
    sorted = false,
    speed,
    updateSortedStatus = () => {},
}: AlogrithmShape) => {
    const [currentSwappingValues, setCurrentSwappingValues] = React.useState<{
        i: number;
        swapValueIndex: number;
    }>({
        i: 0,
        swapValueIndex: 0,
    });

    const swap = async (minIndex: number, i: number) => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                const temp = data[minIndex];
                data[minIndex] = data[i];
                data[i] = temp;
                setCurrentSwappingValues((prevState) => ({
                    ...prevState,
                    i: prevState.i + 1,
                    swapValueIndex: minIndex,
                }));
            }, speed);
        });
    };

    const findMinimum = () => {
        let minIndex = currentSwappingValues.i;
        for (let j = currentSwappingValues.i + 1; j < data?.length; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
            }
        }
        swap(minIndex, currentSwappingValues.i);
    };

    React.useEffect(() => {
        if (!sorted && currentSwappingValues.i < data?.length) {
            findMinimum();
        }
        if (currentSwappingValues.i === data?.length) {
            updateSortedStatus(true);
            setCurrentSwappingValues({ i: 0, swapValueIndex: 0 });
        }
    }, [currentSwappingValues]);

    return (
        <>
            {JSON.stringify(currentSwappingValues, null, 2)}
            {data && (
                <div className="algorithmContainer">
                    {data.map((item: number, index: number) => (
                        <span
                            key={index + item + Math.random()}
                            className={
                                'rectangle' +
                                (index === currentSwappingValues.i
                                    ? ' active'
                                    : index ===
                                      currentSwappingValues.swapValueIndex
                                    ? ' swap'
                                    : '')
                            }
                            style={{
                                height: `${item}px`,
                                width: `${
                                    Math.floor(50 / data?.length) < 2
                                        ? 1
                                        : Math.floor(50 / data?.length)
                                }px`,
                                padding: `${
                                    Math.floor(10 / data?.length) === 0
                                        ? Math.floor(400 / data?.length)
                                        : Math.floor(100 / data?.length) === 0
                                }px`,
                                margin: `${0}px`,
                            }}></span>
                    ))}
                </div>
            )}
        </>
    );
};

export default Alogrithm;
