import { useCounter } from "@/03-examples/hooks/useCounter";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number): string => {
    console.time('Heavy_stuff_started');

    for (let index = 0; index < iterationNumber; index++) {
        console.log('Ahi vamos...');
    };

    console.timeEnd('Heavy_stuff_ended');

    return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {

    const { counter, increment } = useCounter(1_000);
    const { counter: counter02, increment: increment02 } = useCounter(10);

    const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

    return (
        <div
            className='bg-gradient flex flex-col gap-4'
        >
            <h1 className='text-2xl font-thin text-white'>Memo - useMemo {myHeavyValue}</h1>
            <hr />

            <h3 className="text-xl font-bold text-white">{counter}</h3>
            <h3 className="text-xl font-bold text-white">{counter02}</h3>

            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer"
                onClick={increment}
            >Incrementar 01</button>

            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer"
                onClick={increment02}
            >Incrementar 02</button>
        </div>
    )
}
