import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import {BlacklistToken} from "../models/blacklistToken.model.js"
import jwt from 'jsonwebtoken';

const authUser  = async(req, res,next)=>{
    const token  = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json('Unautorized');
    }

    const isBlacklisted = await BlacklistToken.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json('Unautorized');
    }

    try{

        const decode =  jwt.verify(token,process.env.JWT_SECRET);
        const user  = await User.findById(decode._id);
        req.user = user;
        return next();


    }catch(error){
        return res.status(401).json('Unautorized');
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json("Unauthorized");
    }
    const isBlacklisted = await BlacklistToken.findOne({ token: token });
    if (isBlacklisted) {
      return res.status(401).json("Unauthorized");
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await Captain.findById(decode._id);
      if (!captain) {
        return res.status(404).json("Captain not found");
      }
      req.captain = captain;
      return next();
    } catch (error) {
      return res.status(401).json("Unauthorized");
    }
  };
  

export {
    authUser,
    authCaptain
}