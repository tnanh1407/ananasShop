import { Router } from 'express'
import {
  loginController,
  logoutAllController,
  logoutController,
  refreshToken,
  registerController
} from '~/controllers/auth.controller.js'
const router = Router()

// Router Công khai
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/refresh-token', refreshToken)
router.post('/logout', logoutController)
router.post('/logout-all', logoutAllController)
// Router bảo mật

export default router
