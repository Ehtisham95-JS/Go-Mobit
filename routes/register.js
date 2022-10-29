const express = require('express');
const router = express.Router();


const {register, getUser, deleteUSer} = require('../controllers/register');

router.route('/register').post(register);
router.route('/users').get(getUser)
router.route('/users/delete/:id').delete(deleteUSer);


module.exports = router;