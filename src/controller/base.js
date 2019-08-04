module.exports = class extends think.Controller {
	__before() {
		console.log(this.ctx.controller)
	}
};
