const jwt = require('jsonwebtoken')
const tokenKey = "secret"

const auth = (req, res, next) => {
    const token = req.headers['authorization']
    console.log(req.headers)
    console.error(token)
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "로그인 실패"
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, tokenKey, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        console.log(error);
        res.status(403).json({
            success: false,
            message: "로그인 실패"
        })
    }

    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}

module.exports = auth;