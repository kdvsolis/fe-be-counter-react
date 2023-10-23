"use strict"

class Account {

    constructor() {
        //This is intentional
    }

    async checkUser(body){
        if(process.env[body.user_id]){
            return {
                success: false,
                message: "User exist"
            }
        } else{
            process.env[body.user_id] = JSON.stringify({
                counter: 0
            });
            return {
                success: true,
                message: "User registered"
            }
        }
    }

}

module.exports = Account;
