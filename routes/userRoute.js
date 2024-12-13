const express = require('express')
const authController = require('../controllers/authControllers')
const validateRequest = require('../middlewares/validateRequest')
const { registerSchema } = require('../validations/authValidation')

const router = express.Router()

router.post("/register", validateRequest(registerSchema), authController.register);

module.exports = router