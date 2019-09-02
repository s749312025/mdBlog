module.exports = [
	[/\/api\/(\w+)(?:\/(\d+))?/, 'api/:1?id=:2', 'rest'],
	['/github/oauth/redirect', 'oauth/github'],
	['/all/:page', 'content/index'],
	['/about', 'content/about'],
	['/article/:id', 'content/article'],
	['/cates', 'content/cates'],
	['/cates/:cate', 'content/cates'],
	['/cates/:cate/:page', 'content/cates']
];
