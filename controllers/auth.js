import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export function login(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
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



