const authServices = require('../services/authServices')

const register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
  
    try {
      const token = await authServices.registerUser(firstname, lastname, email, password);
      res.status(201).json({ success: true, token });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  module.exports = {
    register
  }