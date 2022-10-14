import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
})

mysqlConnection.connect((err)=>{
    if(!err)
    console.log("Connected")
    else
    console.log("Error" + JSON.stringify(err,undefined, 2))
})