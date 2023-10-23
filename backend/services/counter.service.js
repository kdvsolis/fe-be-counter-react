"use strict"


class Counter {

    counterPerUser = {

    }

    constructor() {
        //This is intentional
    }

    async setCounterValue(user, counter){
        process.env[user] = JSON.stringify({
            counter: counter
        });
        return {
            success: true,
            counter: counter
        }
    }

    async getCounterValue(user){
        console.log(user, process.env[user])
        try{
            return {
                success: true,
                counter: JSON.parse(process.env[user]).counter 
            }
        } catch(exception) {
            console.log(exception)
            return {
                success: false,
                message: "User does not exist"
            }
        }
    }
}

module.exports = Counter;
