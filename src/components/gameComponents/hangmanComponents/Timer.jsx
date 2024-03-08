import { useEffect, useState } from "react";

function Timer(props) {
    const { getTime, updateTime } = props; 
    const [time, setTime] = useState(0);

    useEffect(() => {
        updateTime(time);
        const interval = setInterval(() => {
            setTime(time + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <h1 className="mt-5 center">{time}</h1>
    )
}

export default Timer;