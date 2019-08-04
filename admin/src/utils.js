import Vue from 'vue'

const filters = {
    dateFormat: (date, fmt = 'yyyy-MM-dd HH:mm:ss') => {
        if (!date) {
            return ''
        }
        let _date = new Date(date)
        let o = {
            'M+': _date.getMonth() + 1, //月份
            'd+': _date.getDate(), //日
            'h+': _date.getHours() % 12 == 0 ? 12 : _date.getHours() % 12, //小时
            'H+': _date.getHours(), //小时
            'm+': _date.getMinutes(), //分
            's+': _date.getSeconds(), //秒
            'q+': Math.floor((_date.getMonth() + 3) / 3), //季度
            S: _date.getMilliseconds() //毫秒
        }
        let week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[_date.getDay() + ''])
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            }
        }
        return fmt
    }
}

var utils = {
    dateFormat: (date, fmt = 'yyyy-MM-dd HH:mm:ss') => {
        if (!date) {
            return ''
        }
        let _date = new Date(date)
        let o = {
            'M+': _date.getMonth() + 1, //月份
            'd+': _date.getDate(), //日
            'h+': _date.getHours() % 12 == 0 ? 12 : _date.getHours() % 12, //小时
            'H+': _date.getHours(), //小时
            'm+': _date.getMinutes(), //分
            's+': _date.getSeconds(), //秒
            'q+': Math.floor((_date.getMonth() + 3) / 3), //季度
            S: _date.getMilliseconds() //毫秒
        }
        let week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[_date.getDay() + ''])
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            }
        }
        return fmt
    }
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Object.keys(utils).forEach(key => {
    Vue.prototype[key] = utils[key]
})
