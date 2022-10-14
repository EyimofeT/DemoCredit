import {mysqlConnection} from '../config/db.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const login = (req,res)=> {
    const email=req.body.email
    const password=req.body.password
    mysqlConnection.query(`SELECT user_id,firstname, lastname, phone, email, isSuperUser,password from user where email = "${email}"`,(err, rows,fields)=>{
        if(Object.keys(rows).length !== 0){
           
            bcrypt.compare(password , rows[0].password, function(err, result){
                if(result){
                   const token = jwt.sign({ user_id:rows[0].user_id ,firstname:rows[0].firstname, lastname:rows[0].lastname, phone:rows[0].phone, email:rows[0].email,isSuperUser: rows[0].isSuperUser }, process.env.SECRET_KEY, {expiresIn: '60s'});
                   return res
                   .cookie("access_token", token, {
                     httpOnly: true,
                     secure: process.env.NODE_ENV === "production",
                   })
                   .status(200)
                   .json({ message: "Logged in successfully 😊 👌" });
                }
                else{
                    return res.status(401).json({ message: "Incorrect" });
                    }

            })
        }
        else
        return res.status(403).json({ message: "User Not Found!" });
        
    })
   
   

    // res.send("login successful")
}

export const authorization = (token) => {
    // const token = token
    if (!token) {
    //   return res.sendStatus(401);
    // throw new Error("No Token Found")
    return("No Token Found")
    }
    try {
    // var user_details_list = []
      const data = jwt.verify(token, process.env.SECRET_KEY);
      const user_details={ user_id:data.user_id,
        firstname:data.firstname,
        lastname:data.lastname,
        phone:data.phone,
        email:data.email,
        isSuperUser:data.isSuperUser}
        // return res.send(user_details)
        // user_details_array.push(firstname=data.firstname)
        return user_details
    } catch {
    //   return res.sendStatus(403);
    // throw new Error("Invalid Token")
    return ("Invalid Token")
    }
};


    


export const logout = (req,res)=> {
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
}