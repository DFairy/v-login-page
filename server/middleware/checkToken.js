// 监测 token 是否过期
const jwt = require('jsonwebtoken')
    // const api = require("./unLogin");
    // module.exports = function(req, res, next) {
    //     let token = req.headers['authorization'].split(' ')[1]
    //     let t = token.substring(0, token.length - 1)
    //     console.log(t)
    //         // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
    //     let decoded = jwt.decode(t, 'secret')
    //     console.log(decoded)
    //     console.log(Date.now() / 1000)
    //         // 监测 token 是否过期
    //     if (token && decoded.exp <= Date.now() / 1000) {
    //         return res.json({
    //             code: 401,
    //             message: 'token过期，请重新登录'
    //         })
    //     }
    //     next();
    // }


let unLogin = {
    get: [
        '/users/checkCode'
    ],
    post: [
        '/users/login',
        '/users/register'
    ],
    put: [],
    delete: [],
}
module.exports = function(req, res, next) {
    let method = req.method.toLowerCase()
    let path = req.path
        //接口不需要登陆：直接next
        //判断method类型，并且是否包含path
    if (unLogin[method] && unLogin[method].indexOf(path) !== -1) {
        console.log('到这里不用验证喔')
        return next()
    }
    const t = req.headers['authorization'].split(' ')[1]
    let token = t.substring(0, t.length - 1)

    // console.log(req.headers)
    //没有token值，返回401
    if (!token) {
        return res.json({
            status: 401,
            msg: 'you need login:there is no token'
        })
    }
    console.log('checkToken:' + token)
        //认证token
    jwt.verify(token, 'secret', (err, decoded) => {
        console.log(decoded)
        console.log('这边需要验证')
        if (err) {
            console.log('1')
            return res.json({
                status: 401,
                msg: 'token失效'
            })
        } else {
            console.log('2')
                // 将携带的信息赋给req.user
                // req.user = decoded
            return next()
        }
    })
}