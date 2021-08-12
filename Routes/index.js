const express = require('express')
const router = express.Router()
const {Signup,GetUserByDistance,DeleteUser,UpdateUser,GetAllUsersByTime}=require('../Controller/User')

router.post('/signup',Signup)
router.post('/deleteUser',DeleteUser)
router.post('/updateUser',UpdateUser)
router.get('/getAllUsersByTime',GetAllUsersByTime)
router.get('/getUserByDistance',GetUserByDistance)

module.exports = router