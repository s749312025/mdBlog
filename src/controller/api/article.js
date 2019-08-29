const BaseRest = require('../rest.js');


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
        data = await this.modelInstance.page(page, psize).order('create_time desc').countSelect()
        return this.success(data)
    }

    async postAction() {
        const pk = this.modelInstance.pk;
        const createTime = this.post('create_time') ? (new Date(this.post('create_time'))).getTime() : (new Date()).getTime();
        const data = this.post();
        data.create_time = createTime
        data.modify_time = createTime
        delete data[pk];
        if (!data.cate) {
            return this.fail('标签不能为空');
        }
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        const insertId = await this.modelInstance.add(data);
        return this.success({ id: insertId });
    }

    async putAction() {
        if (!this.id) {
            if (!this.post().id) {
                return this.fail('params error');
            } else {
                this.id = this.post().id
            }
        }
        const pk = this.modelInstance.pk;
        const data = this.post();

        // if (!data.cate) {
        //     return this.fail('标签不能为空');
        // }
        data[pk] = this.id; // rewrite data[pk] forbidden data[pk] !== this.id
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        data.modify_time = (new Date()).getTime()
        const rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
        return this.success({ affectedRows: rows });
    }

    async deleteAction() {
        if (!this.id) {
            return this.fail('params error')
        }
        const pk = this.modelInstance.pk
        const rows = await this.modelInstance.where({ [pk]: this.id }).delete()
        // 删除关联表中的数据
        const relevance = await this.model('cate_article').where({ article_id: this.id }).delete()
        return this.success({ affectedRows: rows })
    }
}