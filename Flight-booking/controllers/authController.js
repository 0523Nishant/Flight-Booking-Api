const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
console.log('userModel in register:', req.app.locals.userModel);

    const userModel = req.app.locals.userModel;
   console.log('Email:', email); 
    const existingUser = await req.app.locals.userModel.findByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userModel.create({ username, email, password });
    
    const token = userModel.generateAuthToken(user);

    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userModel = req.app.locals.userModel;

   
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const token = userModel.generateAuthToken(user);

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
