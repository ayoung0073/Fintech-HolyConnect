const express = require('express') // Express module
const app = express() 
const port = 5000 
const request = require('request');

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

    // user.token = token

});

// 사용자정보조회 API
app.get('/api/info', (req, res) => {
    // var userId = req.decoded.userId;
    var userId = 2;
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[userId], function(err , result){
        if(err){
            console.log("사용자 정보 조회 에러");
            console.error(err);
            throw err
        }
        else {
            console.log(result);
            var option = {
                method : "GET",
                url : "https://testapi.openbanking.or.kr/v2.0/user/me",
                headers : {
                    Authorization : 'Bearer ' + result[0].accesstoken
                },
                qs : {
                    user_seq_no : result[0].userseqnum
                }
            }
            request(option, function(err, response, body){
                console.log(body);
                
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var accessRequestResult = JSON.parse(body);
                    console.log(accessRequestResult);
                    res.json(accessRequestResult)
                }
            })
        }
    })
})

// 출금이체 API
app.post('/withdraw', function (req, res) {
    // var userId = req.decoded.userId;
    var userId = 2;
    var fin_use_num = req.body.fin_use_num;

    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "M202112119U" + countnum; // 이용기관번호
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[userId], function(err , result){
        if(err){
            console.error(err);
            throw err
        }
        else {
            console.log(result);
            var option = {
                method : "POST",
                url : "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
                headers : {
                    Authorization : 'Bearer ' + result[0].accesstoken,
                    "Content-Type" : "application/json"
                },
                json : {
                    "bank_tran_id": transId,
                    "cntr_account_type": "N",
                    "cntr_account_num": "100000000003",
                    "dps_print_content": "헌금",
                    "fintech_use_num": fin_use_num,
                    "wd_print_content": "헌금",
                    "tran_amt": "100000",
                    "tran_dtime": "20200424131111",
                    "req_client_name": "문아영",
                    "req_client_fintech_use_num" : "199159919057870971744807",
                    "req_client_num": "HONGGILDONG1234",
                    "transfer_purpose": "TR",
                    "recv_client_name": "신성교회",
                    "recv_client_bank_code": "097",
                    "recv_client_account_num": "100000000003"
                }
            }
            request(option, function(err, response, body){
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    console.log(body);
                    if(body.rsp_code == 'A0000'){
                        res.json(1)
                    }
                }
            })
        }
    })
})


// 거래내역조회 API
app.post('/api/history', (req, res) => {
    var userId = 2;
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql,[userId], function(err , result){
        if(err){
            console.log("사용자 정보 조회 에러");
            console.error(err);
            throw err
        }
        else {
            console.log(result);
            var fin_use_num = req.body.fin_use_num;
            console.log(fin_use_num)
            var countnum = Math.floor(Math.random() * 1000000000) + 1;
            var transId = "M202112119U" + countnum; // 이용기관번호 
            var option = {
                method : "GET",
                url : "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
                headers : {
                    Authorization : 'Bearer ' + result[0].accesstoken
                },
                qs : {
                    bank_tran_id : transId,
                    fintech_use_num : fin_use_num,
                    inquiry_type : 'A',
                    inquiry_base : 'D',
                    from_date : '20181231',
                    from_time : '10000',
                    to_date : '20210428',
                    to_time : '110000',
                    sort_order : 'D',
                    tran_dtime : '20210428184200',
                    befor_inquiry_trace_info : '123'
                }
            }
            request(option, function(err, response, body){
                console.log(body);
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var accessRequestResult = JSON.parse(body);
                    console.log(accessRequestResult);
                    res.json(accessRequestResult)
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) // 실행
})    