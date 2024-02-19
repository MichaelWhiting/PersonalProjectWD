
const handlerFunctions = {
    loadHomePage: (req, res) => {
        res.send({ 
            message: "Requested to load homepage."
        })
    }
}

export default handlerFunctions;