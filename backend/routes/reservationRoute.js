import express from "express";
import { send_reservation } from "../controller/reservation.js"


const router=express.Router();//created instance of Router

router.post("/send",send_reservation);

export default router;