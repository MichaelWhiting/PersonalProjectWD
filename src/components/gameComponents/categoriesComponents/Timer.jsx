import { useState, useEffect } from "react";

function Timer(props) {
    const { updateGameOver } = props;
    const [time, setTime] = useState(30); // this is how long the game is

    useEffect(() => { // counts time -1 every 1 second
        const interval = setInterval(() => {
            if (time === 0) { // if time === 0, means the game is over
                updateGameOver(true); // tells parent component that the game is over
            }
            setTime(time - 1); // subtracts 1 from time;
        }, 1000);
        return () => clearInterval(interval); // this deletes the current interval so it doesn't keep creating more
    }, [time]);

    return <h1 className="mt-3 center">{time}</h1>;
}

export default Timer;