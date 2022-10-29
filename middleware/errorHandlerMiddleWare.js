const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleWare = (err,req,res, next) => {
    let customError = {
        msg: err.message || "Something went wrong try again later",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.code === 11000) {
        customError.msg = `User Already Exists with email ${err.keyValue.email}`
        customError.statusCode = 400
    }

    if(req.body.age < 18 || req.body.age > 60) {
        customError.msg = 'Age Must Be In Between 18-60 years';
        customError.statusCode = 400
    }
    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item) => item.message).join(' ');
        customError.statusCode = 400
    }
    return res.status(customError.statusCode).json({msg:customError.msg})
}


module.exports = errorHandlerMiddleWare;