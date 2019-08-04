const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    async getAction() {
        const user = {
            name: '123'
        }
        return this.success(user)
    }
};
