const Base = require('./base.js');

module.exports = class extends Base {
	async __before() {
        const navList = [{ name: '首页', url: '/' }, { name: '标签', url: '/cates' }, { name: '关于', url: '/about' }, { name: '博客技术', url: '/article/2' }]
        this.assign('navList', navList)
	}
	async indexAction() {
		this.assign('title', '首页')
		this.assign('blog_route', 'index')
		const map = {
			status: 1
		};
		const page = this.get('page') || 1;
		const pageSize = this.get('pageSize') || 15;
		this.assign('pageRoute', '/all/')
		const lists = await this.model('article').where(map).page(page, pageSize).fieldReverse('markdown', 'content').order('create_time desc').countSelect();
		this.assign('list', lists)
        return this.display('index')
    }
	aboutAction() {
		this.assign('blog_route', 'about')
		this.assign('title', '关于我 about');
		return this.display('index');
	}
	async articleAction() {
		this.assign('blog_route', 'article')
		const id = this.get('id')
		const article = await this.model('article').where({id}).find()
		this.assign('title', article.title)
		this.assign('article', article)
		return this.display('index');
	}
	async catesAction() {
		const cateId = this.get('cate');
		const map = {
			status: 1
		};
		if (cateId) {
			const page = this.get('page') || 1;
			const pageSize = this.get('pageSize') || 15;
			this.assign('pageRoute', '/cates/' + cateId + '/')
			this.assign('blog_route', 'cates_list')
			const contentIds = await this.model('cate_article').where({ cate_id: ['IN', cateId] }).getField('article_id');
			const cateObj = await this.model('cate').where({ id: cateId }).find();
			const lists = await this.model('article').where({ ...map, id: ['IN', contentIds] }).page(page, pageSize).fieldReverse('markdown', 'content').order('create_time desc').countSelect();
			this.assign('list', lists)
			this.assign('cate', cateObj)
			this.assign('title', cateObj.cate)
			return this.display('index');
		}

		this.assign('blog_route', 'cates')
		const cate = await this.model('cate').select()
		this.assign('title', '所有标签')
		this.assign('cate', cate)
		console.log(cate)
		return this.display('index');
	}
};
