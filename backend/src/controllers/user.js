import User from '../models/user.js';

const getUserDetails = async (req, res) => {
  const userId = req.userId; // Assuming userId is added to the request by authentication middleware
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUserDetails };