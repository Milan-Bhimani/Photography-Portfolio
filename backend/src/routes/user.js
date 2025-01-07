import express from 'express';
import { getUserDetails } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, getUserDetails);

export default router;