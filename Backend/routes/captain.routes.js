import express from 'express';

import {body} from 'express-validator';
import {captainRegister} from '../controllers/captain.controller.js'
import {captainLogin} from '../controllers/captain.controller.js';
import {captainProfile} from '../controllers/captain.controller.js';
import {captainLogout} from '../controllers/captain.controller.js';
import {authCaptain} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('Name should be 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Vehicle model must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['car','auto','motorcycle']).withMessage('Vehicle should be valid'),
],captainRegister)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],captainLogin)

router.get('/profile',authCaptain,captainProfile)
router.get('/logout',authCaptain,captainLogout)


export default router;