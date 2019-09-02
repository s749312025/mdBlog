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
            },
            user: {
                type: think.Model.BELONG_TO,
                field: (rModel, model) => {
                    return 'id,username,email,profile'
                }
            },
            comment: {
                type: think.Model.HAS_MANY,
                order: 'create_time desc'
            }
        }
    }
}