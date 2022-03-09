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

    React.useEffect(() => {
        if (!sorted && currentSwappingValues.i < data?.length) {
            setTimeout(() => {
                let minIndex = currentSwappingValues.i;
                for (let j = minIndex + 1; j < data?.length; j++) {
                    if (data[j] < data[minIndex]) {
                        minIndex = j;
                    }
                }
                const temp = data[minIndex];
                data[minIndex] = data[currentSwappingValues.i];
                data[currentSwappingValues.i] = temp;
                setCurrentSwappingValues({
                    ...currentSwappingValues,
                    i: currentSwappingValues.i + 1,
                    swapValueIndex: minIndex,
                });
            }, speed);
        }
        if (currentSwappingValues.i === data?.length) {
            updateSortedStatus(true);
            setCurrentSwappingValues({ i: 0, swapValueIndex: 0 });
        }
    }, [currentSwappingValues, data]);

    return (
        <>
            {JSON.stringify(currentSwappingValues, null, 2)}
            {data && (
                <div className="algorithmContainer">
                    {data.map((item: number, index: number) => (
                        <span
                            className={
                                'rectangle' +
                                (index === currentSwappingValues.i
                                    ? ' active'
                                    : index ===
                                      currentSwappingValues.swapValueIndex
                                    ? ' swap'
                                    : '')
                            }>
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
};

export default Alogrithm;
