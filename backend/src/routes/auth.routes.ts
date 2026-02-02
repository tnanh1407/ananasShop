import { Router } from 'express'
import { loginController, registerCpntroller } from '~/controllers/auth.controller.js'
const router = Router()

// Router Công khai
router.post('/register', registerCpntroller)
router.post('/login', loginController)
// Router bảo mật

export default router
