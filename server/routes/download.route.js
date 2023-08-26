import express from "express";
const router = express.Router();
import { exportData }  from "../controllers/download.js";

router.get('/',  exportData);



export default router;