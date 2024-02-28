const animStr = (i) => `fadeInAnimation ${300}ms ease-out ${50 * (i + 1)}ms forwards`;

function WordSpaces(props) {
    const { wordStatus } = props;
    
    const wordSpaces = wordStatus.split("").map((letter, i) => {
        return <label key={i} style={{margin: 20, fontSize: 100, fontWeight: 100, animation: animStr(i)}}>{letter}</label>;
    });

    return (
        <div className="word-spaces d-flex justify-content-center">
            {wordSpaces}
        </div>
    )
}

export default WordSpaces;