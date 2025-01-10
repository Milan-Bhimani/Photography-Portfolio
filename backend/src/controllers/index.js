import Item from '../models/item.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Define __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  // Allow only image files (jpg, jpeg, png, gif, webp)
  const allowedTypes = /jpg|jpeg|png|gif|webp/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter // Adding the file filter to multer
});

// Error handling middleware for multer
const handleError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File upload error: ' + err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('userId', 'username')  // Populate the 'username' field from the User model
      .exec();
    res.status(200).json(items); // Send items with populated username
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get items by user
const getUserItems = async (req, res) => {
  const userId = req.userId; // Assuming userId is added to the request by authentication middleware
  try {
    const items = await Item.find({ userId }).exec();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new item
const createItem = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId; // Assuming userId is added to the request by authentication middleware
  console.log('Create item request:', req.body, req.file);
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const newItem = new Item({ title, description, imageUrl, userId });
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Create item error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update an existing item
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { title, description, imageUrl },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByIdAndDelete(id);
    if (item && item.imageUrl) {
      console.log('Deleting file:', path.join(__dirname, '../..', item.imageUrl));
      fs.unlinkSync(path.join(__dirname, '../..', item.imageUrl));
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: error.message });
  }
};

export { getItems, createItem, updateItem, deleteItem, getUserItems, upload, handleError };
