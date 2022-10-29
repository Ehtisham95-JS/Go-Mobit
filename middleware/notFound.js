const notFoundMiddleWare = async (req,res) => {
    res.send('Routes Not Exists');
}

module.exports = notFoundMiddleWare;