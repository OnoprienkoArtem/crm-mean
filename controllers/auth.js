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

  }
}



