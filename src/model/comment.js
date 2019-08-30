module.exports = class extends think.Model {
    get relation() {
        return {
            user: think.Model.BELONG_TO
        }
    }
}