import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            require:true,
            minlength:[3,'First name should be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name should be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:[5,'enter correct email'],
    },
    password:{
        type:String,
        require:true,
        select:false
    },
    socketID:{
     type:String
    } 
})

userSchema.methods.generateAuthToken = function(){
    const token   = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return  await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

export const User = mongoose.model("User",userSchema);