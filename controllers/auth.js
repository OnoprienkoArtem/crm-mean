export function login(req, res) {
  res.status(200).json({
    login: 'from controller'
  })
}

export function register(req, res) {
  res.status(200).json({
    register: 'from controller'
  })
}



