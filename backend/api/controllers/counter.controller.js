var CounterService = require('../../services/counter.service');

class UserController {
    constructor() {
        this.counterService = new CounterService();
    }

    async setCounterValue(req, res) {
        try{
            let counterInfo = await this.counterService.setCounterValue(req.headers.user_id, req.body.counter);
            res.status(counterInfo.success? 200 : 400).send(counterInfo);
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }
    async getCounterValue(req, res) {
        try{
            let counterInfo = await this.counterService.getCounterValue(req.headers.user_id);
            res.status(counterInfo.success? 200 : 400).send(counterInfo);
        } catch(e){
            console.error(e);
            res.status(400).send({ success: false, reason: "Bad Request" });
        }
    }

}

const counterController = new UserController();

module.exports = counterController;
