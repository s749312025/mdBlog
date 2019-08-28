import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store'
// import { easEncrypt, aesDecrypt } from '../plugins/crypto'

// const key = 'OHquocgSapxR!GJ577nb2sR33zmEId*O'
// console.log(key, key.substring(0, 16))
// console.log(easEncrypt('test', key, key.substring(0, 16)))

// const headers = {
//     'X-Requested-With': 'XMLHttpRequest',
//     'Content-Type': 'application/x-www-form-urlencoded'
// }

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'put') {
            config.data = qs.stringify(config.params)
            config.params = {}
        }
        // config.params = easEncrypt(qs.stringify(config.params), key, key.substring(0, 16))
        return config
    },
    error => Promise.resolve(error.response || error)
)
// axios.defaults.baseURL = 'http://api.ccuui.com/'

axios.interceptors.response.use(
    response => {
        if (response.data.errno != 0 && response.data.errmsg) {
            Message.error(response.data.errmsg)
        }
        if (response.data.errno == 401) {
            location.href = '/login'
        }
        return response
    },
    error => {
        if (error.response.status == 401 && error.response.statusText == 'Unauthorized') {
            Message.error('您需要重新登录')
            setTimeout(() => {
                store.dispatch('setLogout')
                location.href = '/home'
            }, 2000)
            return
        }
        Message.error(error.response.data.msg)
        return Promise.resolve(error.response || error)
    }
)

const fetch = (url, params = {}, method = 'get') => {
    return new Promise((resolve, reject) => {
        axios({
            url,
            params,
            method
        }).then(res => resolve(res.data))
    })
}

Vue.prototype.$fetch = fetch
