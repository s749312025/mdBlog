const Base = require('./base.js');

module.exports = class extends Base {
	async __before() {
        const navList = [{ name: '首页', url: '/' }, { name: '关于', url: '/about' }]
        this.assign('navList', navList)
	}
	async indexAction() {
		this.assign('title', '首页')
		const map = {
			status: 1
		};
		const page = this.get('page') || 1;
		const pageSize = this.get('pageSize') || 5;
		const lists = await this.model('article').where(map).page(page, pageSize).fieldReverse('markdown').order('create_time desc').countSelect();
		this.assign('list', lists)
        return this.display('index')
    }
	aboutAction() {
		this.assign('title', '关于我 about');
		return this.display('about');
	}
};
