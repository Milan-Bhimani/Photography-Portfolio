import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'D:/mern_website_one/backend/.env' });



const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('Attempting to find user with email:', email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.error('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await (password);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('User registered successfully');
    res.status(201).json({ result: newUser, token });

  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error occurred' });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      console.log('Attempting to find user with email:', email);
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      const checking=(password,existingUserpassword)=>{
        if (password==existingUserpassword){
          return true
        }
        else{
          return false
        }
      }
  
      const isPasswordCorrect = await checking(password,existingUser.password);
      if (isPasswordCorrect==false) {
        console.log(existingUser.password)
        console.log(password)
        console.error('Incorrect password');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'Server error occurred' });
    }
  };
  
  
export { register, login };