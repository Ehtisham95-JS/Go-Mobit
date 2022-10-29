const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');





const register = async (req,res) =>{
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({success:true, user});
}

const getUser = async (req,res) =>{
    const { _id} = req.query;
    let queryObject = {};
    if(_id) {
       queryObject._id = _id;
    }
    if(_id === 'all') {
        queryObject = {};
    }
    const user = await User.find(queryObject);
    res.status(StatusCodes.OK).json({user});
}



const deleteUSer = async (req,res) => {
    const {id} = req.params
    const user = await User.findByIdAndDelete({_id:id});
    res.status(StatusCodes.OK).json({user});
}

module.exports ={
    register,
    getUser,
    deleteUSer
}