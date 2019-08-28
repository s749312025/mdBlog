module.exports = class extends think.Model {
    get relation() {
        return {
            cate: {
                type: think.Model.MANY_TO_MANY,
                rModel: 'cate_article',
                rfKey: 'cate_id',
                key: 'id',
                fKey: 'article_id',
                field: 'id, cate'
            }
        }
    }
}