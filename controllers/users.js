// uuid
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { mysqlConnection } from '../config/db.js';

// import { authorization } from './auth.js';

import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'



export const createUser = (req, res) => {

    const user = req.body;

    const { firstname, lastname, phone, email, password, isSuperUser = 0 } = req.body
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (firstname && lastname && phone && email && password) {
            mysqlConnection.query(`INSERT INTO user( firstname, lastname, phone, email, password, isSuperUser) VALUES ("${firstname}","${lastname}","${phone}","${email}","${hash}","${isSuperUser}")`, (err, rows, fields) => {
                if (!err)
                    return res.status(200)
                        .json({ message: "User Added successfully 😊 👌" });
                else
                    res.status(401).json({ message: err })
            })
        }
        else {
            res.status(401).json({ message: "Incomplete/Missing Credentials" })
        }

    })


}

export const getUsers = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "No Token Found!" });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (data.isSuperUser == 1) {
            mysqlConnection.query('SELECT firstname, lastname, phone, email from user', (err, rows, fields) => {
                if (!err)
                    res.status(200).send(rows);
                else
                    res.status(401).json({ message: err })
            })
        }
        else {
            return res.status(403).json({ message: "Unauthorized!" });
        }
    } catch {
        return res.status(401).json({ message: "Invalid Token Found!" });
    }

}

export const getUser = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "No Token Found!" });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const { id } = data.user_id;
        mysqlConnection.query(`SELECT firstname, lastname, phone, email from user where user_id = ${data.user_id}`, (err, rows, fields) => {
            if (!err)
                res.status(200).send(rows);
            else
                res.status(401).json({ message: err })
        })
    }
    catch {
        return res.status(401).json({ message: "Invalid Token Found!" });
    }
}

export const deleteUser = (req, res) => {

    const token = req.cookies.access_token;
    const { user_id } = req.body
    if (!token) {
        return res.status(401).json({ message: "No Token Found!" });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (data.isSuperUser == 1) {
            if (user_id) {
                mysqlConnection.query(`delete from user where user_id = "${user_id}"`, (err, rows, fields) => {
                    if (!err)
                        res.status(200)
                            .json({ message: "User Delete Succesful 😊 👌" })
                    else
                        res.status(401).json({ message: err })
                })
            } else {
                return res.status(401).json({ message: "Missing User ID!" });
            }
        }
        else {
            return res.status(403).json({ message: "Unauthorized!" });
        }
    } catch {
        return res.status(401).json({ message: "Invalid Token Found!" });
    }



}

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
   

    if (!token) {
        return res.status(401).json({ message: "No Token Found!" });
    }
    try {
        
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const { firstname, lastname, phone, email, password ,account_id=data.user_id} = req.body

        if (data.isSuperUser == 1) {
            if (firstname && lastname && phone && email && password && account_id) {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    mysqlConnection.query(`update user set firstname="${firstname}", lastname="${lastname}", phone="${phone}", email="${email}", password="${hash}" where user_id=${account_id}`, (err, rows, fields) => {
                        if (!err)
                            res.status(200)
                                .json({ message: "User Update Successful 😊 👌" });
                        else
                            res.status(401).json({ message: err })
                    })

                })
            }
            else {
                return res.status(401).json({ message: "Incomplete/Missing Credentials!" });
            }
        }
        else {
            if (firstname && lastname && phone && email && password) {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    mysqlConnection.query(`update user set firstname="${firstname}", lastname="${lastname}", phone="${phone}", email="${email}", password="${hash}" where user_id=${data.user_id}`, (err, rows, fields) => {
                        if (!err)
                            res.status(200)
                                .json({ message: "User Update Successful 😊 👌" });
                        else
                            res.status(401).json({ message: err })
                    })

                })
            }
            else {
                return res.status(401).json({ message: "Incomplete/Missing Credentials!" });
            }
        }
    }
    catch {
        return res.status(401).json({ message: "Invalid Token Found!" });
    }


}

