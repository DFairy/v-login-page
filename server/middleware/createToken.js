var jwt = require('jsonwebtoken')

module.exports = function(name) {
    const token = jwt.sign({
        name: name
    }, 'secret', { expiresIn: '10s' });
    console.log('服务器token:' + token)
    return token;

}