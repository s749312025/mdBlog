module.exports = class extends think.Model {
    get relation() {
        return {
            user: {
                type:think.Model.BELONG_TO,
                field: (rModel, model) => {
                    return 'id,username,email,profile'
                }
            }
        }
    }
}