import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const capatainSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name should be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name should be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[5,'enter correct email'],
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive',],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[1,'color must be 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be 3 characters long'],
            unique:true,
        },
        capacity:{
            type:Number,
            required:true,
            min:1,
            max:100,
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','auto','motorcycle'],
        }
    },
    location:{
        lat:{
            type:Number,
            
        },
        lan:{
            type:Number,
           
        }
    }
})

capatainSchema.methods.generateAuthToken = function(){
    const token   = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

capatainSchema.methods.comparePassword = async function(password){
    return  await bcrypt.compare(password,this.password);
}

capatainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

export const Captain = mongoose.model('Captain',capatainSchema);