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

    
%3CmxGraphModel%3E%3Croot%3E%3CmxCell%20id%3D%220%22%2F%3E%3CmxCell%20id%3D%221%22%20parent%3D%220%22%2F%3E%3CmxCell%20id%3D%222%22%20value%3D%22%26lt%3Bmeta%20charset%3D%26quot%3Butf-8%26quot%3B%26gt%3B%26lt%3Bspan%20style%3D%26quot%3Bcolor%3A%20rgb(0%2C%200%2C%200)%3B%20font-family%3A%20Helvetica%3B%20font-size%3A%2018px%3B%20font-style%3A%20normal%3B%20font-variant-ligatures%3A%20normal%3B%20font-variant-caps%3A%20normal%3B%20font-weight%3A%20400%3B%20letter-spacing%3A%20normal%3B%20orphans%3A%202%3B%20text-align%3A%20center%3B%20text-indent%3A%200px%3B%20text-transform%3A%20none%3B%20widows%3A%202%3B%20word-spacing%3A%200px%3B%20-webkit-text-stroke-width%3A%200px%3B%20background-color%3A%20rgb(248%2C%20249%2C%20250)%3B%20text-decoration-thickness%3A%20initial%3B%20text-decoration-style%3A%20initial%3B%20text-decoration-color%3A%20initial%3B%20float%3A%20none%3B%20display%3A%20inline%20!important%3B%26quot%3B%26gt%3B(0%2C*)%26lt%3B%2Fspan%26gt%3B%22%20style%3D%22text%3BwhiteSpace%3Dwrap%3Bhtml%3D1%3BfontSize%3D24%3B%22%20vertex%3D%221%22%20parent%3D%221%22%3E%3CmxGeometry%20x%3D%221090%22%20y%3D%22662.5%22%20width%3D%2240%22%20height%3D%2250%22%20as%3D%22geometry%22%2F%3E%3C%2FmxCell%3E%3C%2Froot%3E%3C%2FmxGraphModel%3E

