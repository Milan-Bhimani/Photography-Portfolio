import express from 'express';
import { getItems, createItem, updateItem, deleteItem, upload } from '../controllers/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/items', getItems);
router.post('/items', auth, upload.single('image'), createItem);
router.put('/items/:id', auth, upload.single('image'), updateItem);
router.delete('/items/:id', auth, deleteItem);

export default router;