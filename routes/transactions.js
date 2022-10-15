import express from 'express';

import { deposit, withdrawal, transfer, transactions } from '../controllers/transactions.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to trans route")
});

router.post('/deposit', deposit);
router.post('/withdrawal', withdrawal);
router.post('/transfer', transfer);
router.get('/transactions',transactions)

export default router;