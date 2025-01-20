import { Captain } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import {BlacklistToken} from '../models/blacklistToken.model.js';

const captainRegister  = async (req, res, next) => {
   
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullname,email, password, vehicle } = req.body;
      const isCaptain = await Captain.findOne({ email})
      if (isCaptain) {
        return res.status(400).json("Captain with this email already exists!");
      }

      const hashedPassword = await Captain.hashPassword(password);

      const captain = await createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword,
        color:vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      });

      const token = captain.generateAuthToken();
      return res.status(200).json({ token, captain });

      
    
  };

const captainLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password,vehicle } = req.body;
    const captain = await Captain.findOne({ email }).select('+password');
   

    if (!captain) {
      return res.status(401).json("Invalid email or password");
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json("Invalid email or password");
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token);
    return res.status(200).json({ token, captain });
  };

const captainProfile  = async (req, res) => {   

    return res.status(200).json(req.captain)
}

const captainLogout =  async(req, res) => {
//    res.clearCookie('token');
     const token  = req.cookies.token || req.headers.authorization?.split(' ')[1];
  //    console.log(token)
     await BlacklistToken.create({token});
     res.clearCookie('token');
     return res.status(200).json({message: 'Logged Out'});

}
  export {
    captainRegister,
    captainLogin,
    captainProfile,
    captainLogout
  }