/**
 * 原生jsonp的实现可参考 https://github.com/webmodules/jsonp
 */
import orginJSONP from 'jsonp'

/**
 * 封装jsonp
 * @param {String} url 请求url地址
 * @param {Object} data 请求参数
 * @param {Object} option jsonp的option
 */
export default function jsonp(url, data, option) {
    // 先判断url后面是否有'?' 没有的话就加'?' 有的话就加'&'
    // url拼接  把请求参数拼接到url后面
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

    return new Promise((resolve, reject) => {
        orginJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function param(data) {
    let url = ''
    for (var k in data) {
        // 为了不传undefined到后端, 变为''
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}