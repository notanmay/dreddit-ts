import express from "express";
const router = express.Router()
import {register, login, getUserInfo} from '../controllers/userController'

router.post('/register', register)
router.post('/login', login)
router.get('/:userID', getUserInfo)

export default router