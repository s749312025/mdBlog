module.exports = class extends think.Model {
    get schema() {
        return {
            id: {
                type: 'int(11)'
            },
            name: {
                type: 'varchar(10)'
            },
            password: {
                type: 'varchar(10)'
            }
        }
    }
}