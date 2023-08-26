import express from "express";
const router = express.Router();
import {  uploadFile  }  from "../controllers/upload.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

router.post('/',  upload.single('csvFile'),uploadFile);



export default router;