import { mysqlConnection } from "../config/db.js"


// export const getUserByEmail = (email) => {
//     // function getUserByEmail(email) {

//     // mysqlConnection.query(`SELECT firstname, lastname, phone, email from user where email = "${email}"`,function(err, result){
//     //     callback(err, result ? result.length>0 :false);
//     // })

//     mysqlConnection.query(`SELECT firstname, lastname, phone, email from user where email = "${email}"`, function(err, rows, fields){
//         if (Object.keys(rows).length !== 0) {
//             return true
//         }
//         else {
//             return false
//         }
//     })

//  return function(){}

//     // return mysqlConnection.count({email}).then((count) => {
//     //     if(count>0){
//     //         return true;
//     //     }
//     //     return false;
//     // });
// }

// console.log(getUserByEmail("tuoyo145@gmail.com"))



//generate account number
export function generateAccoutNumber() {
    var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
     //check if account no exists
    mysqlConnection.query(`SELECT * from account where account_number = "${digits}"`, function (err, rows, fields) {
        if (Object.keys(rows).length !== 0) {
            generateAccoutNumber()
        }

    })
    return digits
}



