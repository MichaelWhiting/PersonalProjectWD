

function WordSpaces(props) {
    const { wordStatus } = props;
    
    const wordSpaces = wordStatus.split("").map((letter, i) => {
        return <label key={i} style={{margin: 20, fontSize: 100, fontWeight: 100}}>{letter}</label>
    })

    return (
        <>
            <div className="word-spaces d-flex justify-content-center">
                {wordSpaces}
            </div>
        </>     
    )
}

export default WordSpaces;