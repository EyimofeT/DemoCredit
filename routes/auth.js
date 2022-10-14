import express from 'express';

import { login , logout } from '../controllers/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to auth route")
});

router.post('/login', login);
router.get('/logout', logout);


  

export default router;