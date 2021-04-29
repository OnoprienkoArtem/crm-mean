import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export async function login(req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {

    } else {
      res.status(401).json({
        message: 'Passwords mismatch. Try again.'
      });
    }
  } else {
    res.status(404).json({
      message: 'User with this email not found.'
    });
  }
}

export async function register(req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  });

  if (candidate) {
    res.status(409).json({
      message: 'This email already exist. Try another one.'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {

    }
  }
}



