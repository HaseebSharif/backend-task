import express from "express";
const router = express.Router();
import { getAllUsers, logIn , logOut , register, update}  from "../controllers/user.js";

router.post('/login', logIn);
router.post('/logout', logOut)
router.post('/register', register)
router.get('/', getAllUsers)
router.put('/update', update)





export default router;