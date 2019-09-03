const Base = require('./base.js');
const request = require('request');
var md5 = require('js-md5')

const request_promise = async (params) => {
    return new Promise((resolve, reject) => {
        request(params, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject(body)
            }
        })
    })
}

module.exports = class extends Base {
    async githubAction() {
        const code = this.get('code')
        if (!code) {
            this.assign('error', {msg: 'code为空'})
		    return this.display('error');
        }
        const client_id = '6888e722d457574ca9d7'
        const client_secret = 'cb9df21bb008bc0226a8b6fc9dbe69b2c4cc4394'
        const getTokenUrl = 'https://github.com/login/oauth/access_token'
        const getInfoUrl = 'https://api.github.com/user'
        // 请求获取token
        try {
            let info = await request_promise({
                url: getTokenUrl,
                method: "POST",
                json: true,
                headers: {
                    'content-type': 'multipart/form-data'
                },
                formData: {code, client_id, client_secret}
            })
            if (info && info.access_token) {
                // 请求获取个人信息
                try {
                    let personInfo = await request_promise({
                        url: getInfoUrl,
                        method: "GET",
                        headers: {
                            'user-agent': 'node.js',
                            'authorization': `token ${info.access_token}`
                        },
                    })
                    if (personInfo && typeof(personInfo) == 'string') {
                        personInfo = JSON.parse(personInfo)
                    }
                    if (personInfo && personInfo.login) {
                        
                        const userEmail = await this.model('user').where({ name: personInfo.name }).find();

                        // 用户已存在
                        if (userEmail && userEmail.username && userEmail.username == personInfo.name) {
                            const replaceData_has = new Buffer((userEmail.id).toString()).toString('base64')
                            this.assign('user', {deId: (md5(userEmail.id + 'clarenceBlog'))+ 's0819' + replaceData_has.replace(/=/g, '_'), replaceData: replaceData_has, insertId: userEmail.id})
		                    return this.display('oauth');
                        }
                        // 新建用户
                        const data = {
                            username: personInfo.name,
                            profile: personInfo.avatar_url,
                            email: personInfo.email,
                            remark: JSON.stringify(personInfo)
                        }
                        const insertId = await this.model('user').add(data)
                        
                        // 自己定义加密方式
                        const replaceData = new Buffer(insertId.toString()).toString('base64')

                        this.assign('user', {deId: (md5(insertId + 'clarenceBlog'))+ 's0819' + replaceData.replace(/=/g, '_'), replaceData, insertId})
		                return this.display('oauth');
                    } else {
                        this.assign('error', {msg: '信息 获取失败'})
		                return this.display('error');
                    }
                } catch (error) {
                    console.log(error);
                    this.assign('error', {msg: '信息 请求失败'})
		            return this.display('error');
                }
            } else {
                this.assign('error', {msg: 'assec_token 获取失败'})
		        return this.display('error');
            }
        } catch (error) {
            this.assign('error', {msg: 'assec_token 请求失败'})
		    return this.display('error');
        }
        
    }
    
};
