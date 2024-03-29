import { useSpring, animated } from "react-spring";

function Number({ n }) { // this is used to animated the score going up from 0
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 200,
        config: { mass: 1, tension: 25, friction: 10 }
    });

    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

export default Number;