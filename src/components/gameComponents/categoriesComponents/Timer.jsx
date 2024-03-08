import { useState, useEffect } from "react";

function Timer(props) {
    const { updateGameOver } = props
    const [time, setTime] = useState(5); // this is how long the game is

    useEffect(() => {
        const interval = setInterval(() => {
            if (time === 0) {
                updateGameOver(true);
            }
            setTime(time - 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    return <h1 className="mt-3 center">{time}</h1>;
}

export default Timer;