const Base = require('./base.js');

module.exports = class extends Base {
	indexAction() {
		this.assign('title', 'clas');
		return this.display();
	}
};
