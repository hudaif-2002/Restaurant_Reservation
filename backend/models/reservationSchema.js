import mongoose from "mongoose";
import validator from "validator";

const reservationSchema =new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:[3,"FIrst name must contain at least 3 Character"],
        maxLength:[30,"FIrst name cannot exceed  30 Character"],
    },
    lastName: {
        type:String,
        required:true,
        minLength:[3,"Last name must contain at least 3 Character"],
        maxLength:[30,"LAst name cannot exceed  30 Character"],
    },
    email: {
        type:String,
        required :true,
        validate:[validator.isEmail,"Provide a valid Email"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone nuber must contain at least 10 Number"],
        maxLength:[10,"phone num cannot exceed  10 Number"],
    },
    time:{
        type:String ,
        required:true,
    },
    date:{
        type :String,
        required:true,
    },
    
});

export const Reservation = mongoose.model("Reservation",reservationSchema);