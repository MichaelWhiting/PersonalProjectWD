const duration = 5000; // time in ms
const delay = 500;

const animStr = (i) => `fadeInAnimation ${duration}ms ease-out ${delay * (i + 1)}ms forwards`;

export default animStr;