import React, { useState, useEffect } from 'react';

const Timer = ({ setTimerOver }) => {
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setTimerOver(true);
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [setTimerOver]);

    return <p>&#8987; <b>{timeLeft}</b> seconds</p>;
};

export default Timer;
