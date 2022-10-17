# DemoCredit
API backend service for a mobile lending app.


## Google Drive link to E-R Diagram and Database Schema
https://drive.google.com/drive/u/2/folders/1HGwL9xzlWA0CVF8m6OZGGoI88FO00wbA

## installation
install required packages:
  ->  npm install --save bcryptjs body-parser cookieparser cors dotenv express jsonwebtoken 
  ->  npm install --save-dev nodemon

to run server
    -> npm run start

## EndPoints- Visit Documentation For More Information

  --User Endpoints
    GET '/users/'   
    POST '/users/'
    GET '/users/getuser'
    PATCH '/users/updateuser'

  -- Auth Endpoints
    POST '/auth/login'
    GET '/auth/logout'

  -- Transactions Endpoints
    POST '/transactions/deposit'
    POST '/transactions/withdrawal'
    POST '/transactions/transfer'
    GET '/transactions/transactions'
   

## API Documentation

https://documenter.getpostman.com/view/15065406/2s847Cwv3n

## Postman Collection Link
https://www.getpostman.com/collections/d159b6e9bcc0f0655522


## Api Endpoint link on Heroku
https://tuoyo-clifford-e-lendsqr-be-te.herokuapp.com/

## Setting Database Configurations and JWT Secret Key
-> Create a .env file
    
    1. Localhost Running- Include : 
                SECRET_KEY= "<secret key>" 
                DB_HOST='<database host>'
                DB_NAME='<database name>'
                DB_USER='<database username>'
                DB_PASSWORD='<database password>'
                DB_PORT=<port>

    2. When Deploying to a hosting service :  
      Include:    
                SECRET_KEY= "<secret key>" 
                DB_HOST='<database host>'
                DB_NAME='<database name>'
                DB_USER='<database username>'
                DB_PASSWORD='<database password>'
                DB_PORT=<port>    
      Into Hosting Service Environment or Config Variables   



