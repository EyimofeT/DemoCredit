import express from 'express';



import { createUser, getUser, getUsers , deleteUser, updateUser } from '../controllers/users.js';


const router = express.Router();


// all routes in here are starting with /users
router.get('/', getUsers);
router.post('/', createUser);
//
router.get('/getuser', getUser)
// router.delete('/deleteuser', deleteUser)
router.patch('/updateuser',updateUser)

export default router;