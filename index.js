import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import transactionsRoutes from './routes/transactions.js';

import cookieParser from 'cookie-parser';

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use(cookieParser())

app.use('/users', usersRoutes);

app.use('/auth', authRoutes)

app.use('/transactions', transactionsRoutes)

app.get('/',(req, res)=>{
    res.send('List of Routes');
}) 
  
app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`))