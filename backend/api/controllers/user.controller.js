var AccountService = require('../../services/account.service');

class UserController {
    constructor() {
        this.accountService = new AccountService();
    }

    async checkUser(req, res) {
        try{
            let userInfo = await this.accountService.checkUser(req.body);
            res.status(userInfo.success? 200 : 400).send(userInfo);
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }
}

const userController = new UserController();

module.exports = userController;
