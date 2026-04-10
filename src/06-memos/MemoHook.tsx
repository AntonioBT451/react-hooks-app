import { useCallback, useState } from "react";
import { MyTitle } from './ui/MyTitle';
import { MySubTitle } from './ui/MySubTitle';

export const MemoHook = () => {

    const [title, setTitle] = useState('Hola');
    const [subTitle, setSubTitle] = useState('Mundo');

    const handleMyApiCall = useCallback(() => {
        console.log('Lamar API', subTitle);
    }, [subTitle]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">MemoHook</h1>

            <MyTitle title={title} />
            <MySubTitle subTitle={subTitle} callMyApi={handleMyApiCall} />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setTitle('Hello, ' + new Date().getTime())}
            >
                Cambiar titulo
            </button>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setSubTitle('Word ' + new Date().getTime())}
            >
                Cambiar sub-titulo
            </button>
        </div>
    );
};
