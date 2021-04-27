import User from '../models/User.js';

export function login(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

export function register(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save().then(() => console.log('User created'));
}



