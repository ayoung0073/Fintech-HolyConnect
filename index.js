const express = require('express') // Express module
const app = express() 
const port = 5000 

var jwt = require('jsonwebtoken');
var mysql = require('mysql');
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.json());
app.use(express.urlencoded({extended:false}));


const bodyParser = require('body-parser')

// Database Connect
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'fintech',
    password : '123412341234',
    database : 'test'
});
connection.connect();

app.get('/api/test', (req, res) => {
    res.json({message:'Get JSON Example'});
})

app.get("/api/test/data", (req, res) => {
    const q=req.query;
    res.json({message:'Get JSON Example', name:q.name})
})

app.post('/api/signup', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var userSeqNum = req.body.userSeqNum;
    // console.log(name, accessToken, userSeqNum);

    bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
        if(err) return next(err)
            password = hash // 해시된 비밀번호로 설정
        });
    })

    var sql = "INSERT INTO user (name, email, password, accesstoken, refreshtoken, userseqnum) VALUES (?,?,?,?,?,?)"
    connection.query(
        sql, // excute sql
        [name, email, password, accessToken, refreshToken, userSeqNum], // ? <- value
         function(err, result){
            if(err){
                console.error(err);
                let data = {
                    responseCode: 400,
                    message: "회원가입 실패"
                }
                res.json(data);
                throw err;
            }
            else {
                let data = {
                    responseCode: 201,
                    message: "회원가입 성공"
                }
                res.json(data);
            }
    })
})

app.post('/api/signin', (req, res) => { // 로그인
    var email = req.body.email;
    var plainPassword = req.body.password;
    const sql = "SELECT * FROM user WHERE email = ?";
    connection.query(sql, [email], function(err, result){
        if(err){
            console.error(err);
            res.json(result);
            throw err;
        }
        else {
            // 1. User 있는지 체크

            // 2. Password 비교

            // 3. 토큰 생성 후, 클라이언트에게 넘겨주기
            
        }
    })

    // 비밀번호 비교하는 코드입니다 참고해주세용 
    // bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    //     if(err) 
    //     return cb(null, isMatch)
    // })

    // 토큰 생성하는 코드
    // // jsonwebtoken을 이용해 토큰 생성
    // var user = this;
    // var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // // user._id + 'secretToken' = token

    // user.token = token

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) // 실행
})    