const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/:idUser', userController.getUser)

module.exports = router
