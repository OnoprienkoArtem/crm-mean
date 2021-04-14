import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).json({
    login: true
  })
});


export default router;
