

function WordSpaces(props) {
    const { word } = props;
    const wordSpaces = word.split("").map((letter, i) => {
        return <label key={i} style={{margin: 20, fontSize: 100}}>_</label>
    })

    return (
        <>
            <h1>Word is: {word}</h1>
            <div className="word-spaces d-flex justify-content-center">
                {wordSpaces}
            </div>
        </>
    )
}

export default WordSpaces;