import express from 'express'
import {registerController,verifyOTPController} from "../controllers/authController.js"

// router object
const router = express.Router()

// routing

// REGISTER || METHOD POST
router.post('/register',registerController)

// VERIFICATION OTP || METHOD POST
router.post('/verification',verifyOTPController)

export default router