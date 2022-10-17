import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config()

import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import transactionsRoutes from './routes/transactions.js';
import cors from 'cors';

import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cookieParser())

app.use(cors());

app.use('/users', usersRoutes);

app.use('/auth', authRoutes)

app.use('/transactions', transactionsRoutes)

app.get('/',(req, res)=>{
    res.send('List of Routes');
}) 
  
app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`))