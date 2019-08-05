const BaseRest = require('../rest.js')

module.exports = class extends BaseRest {
    async getAction() {
        let data
        if (this.id) {
            const pk = this.modelInstance.pk
            data = await this.modelInstance.where({ [pk]: this.id }).find()
            return this.success(data)
        }
        // 页码
        const page = this.get('page') || 1
        // 每页显示数量
        const psize = this.get('psize') || 5
        data = await this.modelInstance.page(page, psize).countSelect()
        return this.success(data)
    }
    async deleteAction() {
        if (!this.id) {
            return this.fail('params error')
        }
        const pk = this.modelInstance.pk
        const rows = await this.modelInstance.where({ [pk]: this.id }).delete()
        // 删除关联表中的数据
        const relevance = await this.model('cate_article').where({ cate_id: this.id }).delete()
        return this.success({ affectedRows: rows })
    }
}
