import { useEffect, useState } from "react";

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = (color: TrafficLightColor = 'red') => {

    const [light, setLight] = useState<TrafficLightColor>(color);
    const [countDown, setCountDown] = useState(5);

    const colorChange = () => {
        if (light === 'red') setLight('green');
        if (light === 'green') setLight('yellow');
        if (light === 'yellow') setLight('red');
    };

    // CountDown Effect
    useEffect(() => {

        const intervalId = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Change light color effect
    useEffect(() => {
        if (countDown >= 0) return;

        setCountDown(5);
        colorChange();

    }, [countDown]);

    return {
        light,
        countDown,
        colors,

        percentage: (countDown / 5) * 100,
        greenLight: light === 'green' ? colors.green : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
        redLight: light === 'red' ? colors.red : 'bg-gray-500'
    }
}
