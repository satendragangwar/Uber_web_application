import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import {BlacklistToken} from '../models/blacklistToken.model.js';

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    const { fullname,email, password } = req.body;
    const existedUser = await User.findOne({
        $or: [{ email }],
      });
    
      if (existedUser) {
        return res.status(400).json(
          "User with email or username already exists \n Check email if not verified"
        );
      }

    const hashedPassword = await User.hashPassword(password);
    const user = await userService.createUser({
      firstname:fullname.firstname,
      lastname:fullname.lastname,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    return res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

const login  = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password } = req.body;
    const user  = await User.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json('Invalid email or password');
    }
    const isMatch  = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json('Invalid email or password');
    }
    const token   =  user.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({token,user});
}

const userProfile = async(req,res)=>{
    // console.log(req.user)
  return res.status(200).json(req.user)
}

const logoutUser  = async(req,res)=>{
  //  res.clearCookie('token');
   const token  = req.cookies.token || req.headers.authorization?.split(' ')[1];
//    console.log(token)
   await BlacklistToken.create({token});
   res.clearCookie('token');
   return res.status(200).json({message: 'Logged Out'});

}

export { 
    register,
    login,
    userProfile,
    logoutUser

 };
