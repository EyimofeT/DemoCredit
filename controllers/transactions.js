import { mysqlConnection } from '../config/db.js';
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

export const deposit = (req, res) => {
    // res.send("Deposit")
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(400).json({ message: "No Token Found!" });
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (data) {
            const { amount } = req.body
            const user_id = data.user_id;
            if (amount) {
                mysqlConnection.query(`BEGIN;
            
            set @balance := (select balance+"${amount}" from account where account_id in (select account_id from user_account_ref where user_id="${user_id}")) ;
            Update account SET balance=@balance  where account_id=(select account_id from user_account_ref where user_id="${user_id}");

            set @destination_account := (select account_number from account where account_id = (select account_id from user_account_ref where user_id="${user_id}") );
            set @destination_bank :="DemoCredit";
            set @transaction_type := "internal";
            set @transaction_description :=  "credit";
            set @narration= "deposit";
            Insert into transaction ( user_id, destination_account_no, destination_bank, amount, transaction_type, transaction_description, narration,ref_id) 
            VALUES ("${user_id}",@destination_account,@destination_bank, "${amount}", @transaction_type,@transaction_description, @narration,"${uuidv4()}");

            COMMIT;
            `, (err, rows, fields) => {
                    if (!err)
                        return res.status(200)
                            .json({ message: "Deposited 😊 👌" });
                    else
                        res.status(400).json({ message: err })
                })
            }
            else {
                res.status(400).json({ message: "Incomplete Credentials","Required":["amount"] })
            }
        }
        else {
            return res.status(400).json({ message: "Unauthorized!" });
        }
    } catch {
        return res.status(400).json({ message: "Invalid Token Found!" });
    }
}

export const withdrawal = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(400).json({ message: "No Token Found!" });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (data) {
            const { destination_account_no,destination_bank,narration="",amount } = req.body
            const user_id = data.user_id;
            if (destination_account_no &&destination_bank && amount ) {
                mysqlConnection.query(`BEGIN;
            
            set @balance := (select balance-"${amount}" from account where account_id in (select account_id from user_account_ref where user_id="${user_id}")) ;
            Update account SET balance=@balance  where account_id=(select account_id from user_account_ref where user_id="${user_id}");

            set @destination_account := "${destination_account_no}";
            set @destination_bank :="${destination_bank.toLowerCase()}";
            set @transaction_type := "external";
            set @transaction_description :=  "debit";
            set @source_account_no:=(select account_number from account where account_id=(select account_id from user_account_ref where user_id="${user_id}"));
            set @source_bank:="DemoCredit";
            set @narration= "${narration}";
            Insert into transaction ( user_id,source_account_no,source_bank, destination_account_no, destination_bank, amount, transaction_type, transaction_description, narration,ref_id) 
            VALUES ("${user_id}",@source_account_no,@source_bank,@destination_account,@destination_bank, "${amount}", @transaction_type,@transaction_description, @narration,"${uuidv4()}");

            COMMIT;
            `, (err, rows, fields) => {
                    if (!err)
                        return res.status(200)
                            .json({ message: "Withdrawal Successful 😊 👌" });
                    else
                        res.status(400).json({ message: err })
                })
            }
            else {
                res.status(400).json({ message: "Incomplete Credentials","Required":["destination_account_no" ,"destination_bank","amount"] })
            }
        }
        else {
            return res.status(400).json({ message: "Unauthorized!" });
        }

    }
    catch {
            return res.status(400).json({ message: "Invalid Token Found!" });
        }

    }



export const transfer = (req, res) => {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(400).json({ message: "No Token Found!" });
        }

        try {
            const data = jwt.verify(token, process.env.SECRET_KEY);
            if (data) {
                const { destination_account_no, narration = "", amount } = req.body
                const user_id = data.user_id;
                if (amount && destination_account_no) {
                    mysqlConnection.query(`select * from account where account_number = "${destination_account_no}";`, (err, rows, fields) => {
                        if (Object.keys(rows).length !== 0) {
                            mysqlConnection.query(`select balance from account where account_number = (select account_number from account where account_id=(select account_id from user_account_ref where user_id="${user_id}"));`, (err, rows, fields) => {
                                if (!err) {
                                    // res.json((parseInt(rows[0].balance))+1)
                                    if (parseFloat(rows[0].balance) > parseFloat(amount)) {
                                        // res.json({"message":"balance is sufficient"})
                                        //make sql update queries for both accounts here
                                        mysqlConnection.query(`
                                    BEGIN;
                                        set @source_account_balance :=(select balance-"${amount}" from account where account_id in (select account_id from user_account_ref where user_id="${user_id}")) ;
                                        update account set balance=@source_account_balance where account_id=(select account_id from user_account_ref where user_id="${user_id}");

                                        set @destination_account_balance :=(select balance+"${amount}" from account where account_number="${destination_account_no}");
                                        update account set balance=@destination_account_balance where account_number="${destination_account_no}";

                                        set @ref_id:= "${uuidv4()}";
                                        set @source_bank :="DemoCredit";
                                        set @destination_bank :="DemoCredit";
                                        set @transaction_type := "internal";
                                        set @transaction_description :=  "debit";
                                        set @narration= "${narration.toLowerCase()}";
                                        set @source_account_no:=(select account_number from account where account_id=(select account_id from user_account_ref where user_id="${user_id}"));

                                        Insert into transaction ( user_id,source_account_no,source_bank, destination_account_no, destination_bank, amount, transaction_type, transaction_description, narration,ref_id) 
                                        VALUES ("${user_id}",@source_account_no,@source_bank,"${destination_account_no}",@destination_bank, "${amount}", @transaction_type,@transaction_description, "${narration.toLowerCase()}",@ref_id);
                                        

                                        set @transaction_description :=  "credit";
                                        set @user_id:=(select user_id from user_account_ref where account_id=(select account_id from account where account_number="${destination_account_no}"));
                                        Insert into transaction ( user_id,source_account_no,source_bank, destination_account_no, destination_bank, amount, transaction_type, transaction_description, narration,ref_id) 
                                        VALUES (@user_id,@source_account_no,@source_bank,"${destination_account_no}",@destination_bank, "${amount}", @transaction_type,@transaction_description, "${narration.toLowerCase()}",@ref_id);

                                    COMMIT;
                                    `, (err, rows, fields) => {
                                            //final response
                                            if (!err)
                                                return res.status(200)
                                                    .json({ message: "Transfer Successful 😊 👌" });
                                            else
                                                res.status(400).json({ message: err })
                                        })

                                    }
                                    else {
                                        res.status(400).json({ message: "Account Balance Insufficient" })
                                    }
                                }
                                else
                                    res.send(err)
                            })
                        }
                        else
                            res.status(400).json({ message: "Account Doesnt Exist" })
                    })
                }
                else {
                    res.status(400).json({ message: "Incomplete Credentials","Required":["destination_account_no","amount"] })
                }
            }
            else {
                return res.status(400).json({ message: "Unauthorized!" });
            }
        } catch {
            return res.status(400).json({ message: "Invalid Token Found!" });
        }
    }

export const transactions = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(400).json({ message: "No Token Found!" });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const { id } = data.user_id;
        mysqlConnection.query(`select source_account_no,source_bank,destination_account_no,destination_bank,amount,transaction_type,transaction_description,narration,ref_id from transaction where user_id="${data.user_id}"`, (err, rows, fields) => {
            if (!err)
                res.status(200).send(rows);
            else
                res.status(400).json({ message: err })
        })
    }
    catch {
        return res.status(400).json({ message: "Invalid Token Found!" });
    }
}