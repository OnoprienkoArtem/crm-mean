export function login(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

export function register(req, res) {
  res.status(200).json({
    register: 'from controller'
  })
}



