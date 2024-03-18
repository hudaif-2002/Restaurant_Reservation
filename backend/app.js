import express from "express";
import cors from "cors";  //connect frontend and backend
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import {errorMiddleware} from "./error/error.js";
import reservationRouter from './routes/reservationRoute.js';

const app=express();
dotenv.config({path:"./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],  //give frontend pathin which we are connecting our backend
    methods:["POST"],   //this line tells here in this project we ar only sending data to backend
    credentials:true
}));
//app.use is a middleware
app.use(express.json());//converts json format string to json obj
app.use(express.urlencoded({extended:true})); //data is of which type

dbConnection();
app.use(errorMiddleware);
app.use('/api/v1/reservation',reservationRouter);

export default app;