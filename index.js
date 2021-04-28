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
    user     : 'testuser',
    password : 'mysqlwjdfl',
    database : 'testdb'
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
            if(result.length == 0) {
                res.json(0);
            }
            // 2. Password 비교
            else {
                var dbPassword = result[0].password;
                if(dbPassword == plainPassword){
                    //login
                    jwt.sign({
                        data: {
                            userId : result[0].id
                            }   
                        }, 
                        'secret', 
                        { expiresIn: '1h' },
                        function(err, token){
                            var data = {
                                success: true,
                                token: token
                            }
                          res.json(data);
                    });
                }
                else {
                    res.json(2)
                }
            }
            // 3. 토큰 생성 후, 클라이언트에게 넘겨주기
            
        }
    })

    // 비밀번호 비교하는 코드입니다 참고해주세용 
    // bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    //     if(err) 
    //     return cb(null, isMatch)
    // })

    // 토큰 생성하는 코드
    // // json webtoken을 이용해 토큰 생성
    // var user = this;
    // var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // // user._id + 'secretToken' = token

    // user.token = token

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) // 실행
})    