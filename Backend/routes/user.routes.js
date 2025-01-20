import express from 'express';
import {body} from 'express-validator';
import {register} from '../controllers/user.controller.js';
import {login} from '../controllers/user.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
import { userProfile } from '../controllers/user.controller.js';
import { logoutUser } from '../controllers/user.controller.js';


const router  = express.Router();
router.post("/register",[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Name should be 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],register)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],login)

router.get('/profile',authUser,userProfile)
router.get('/logout',authUser,logoutUser);

export default router;