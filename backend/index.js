const express = require('express') // Express module
const app = express() 
const port = 5000 
const request = require('request');
const cors = require('cors');
app.use(cors()); // CORS 미들웨어 추가

var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var auth = require('./lib/auth');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Database Connect
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'fintech',
    password : '123412341234',
    database : 'test'
});
connection.connect();

// 회원가입
app.post('/api/signup', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var userSeqNum = req.body.userSeqNum;

    var sql = "INSERT INTO user (name, email, password, accesstoken, refreshtoken, userseqnum) VALUES (?,?,?,?,?,?)"
    connection.query(
        sql, 
        [name, email, password, accessToken, refreshToken, userSeqNum], 
         function(err, result){
            if(err){
                console.error(err);
                let data = {
                    success: false,
                    message: "회원가입 실패"
                }
                res.json(data);
                throw err;
            }
            else {
                let data = {
                    success: true,
                    message: "회원가입 성공"
                }
                res.json(data);
            }
    })
})

// 로그인
app.post('/api/signin', (req, res) => { 
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
                res.json({success:false});
            }
            // 2. Password 비교
            else {
                var dbPassword = result[0].password;
                if(dbPassword == plainPassword){
                    jwt.sign({
                        data: {
                            userId : result[0].id
                            }   
                        }, 
                        'secret', 
                        { expiresIn: '8h' },
                        function(err, token){
                            var data = {
                                success: true,
                                token: token
                            }
                          res.json(data);
                    });
                }
                else {
                    res.json({success:false})
                }
            }
        }
    })
});

// 사용자정보조회 API
app.get('/api/info', auth, (req, res) => {
    var userId = req.decoded.data.userId;
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
                    var response = {
                        success: true,
                        data: JSON.parse(body)
                    }
                    res.json(response)
                }
            })
        }
    })
})

// 출금이체 API
app.post('/api/withdraw', auth, function (req, res) {
    console.log(req.body);
    var userId = req.decoded.data.userId;
    var fin_use_num = req.body.fin_use_num;
    var price = req.body.price;
    var anonymous;
    if (req.body.anonymous) anonymous = 1; // true
    else anonymous = 0; // false
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
                    "tran_amt": price,
                    "tran_dtime": "20200429131111",
                    "req_client_name": result[0].name,
                    "req_client_fintech_use_num" : "120211211988932289661912",
                    "req_client_num": "HOLYCONNECT",
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
                        var response = {
                            success: true,
                            data: body
                        } 
                        var sql = "INSERT INTO withdraw (user_id, price, banktrans_id, trans_date, anonymous, remain) VALUES (?,?,?,?,?,?)";
                        connection.query(
                            sql, 
                            [userId, price, body.bank_tran_id, body.bank_tran_date, anonymous, body.wd_limit_remain_amt], 
                             function(err, result){
                                if(err){
                                    console.error(err);
                                    let data = {
                                        success: false,
                                        message: "회원가입 실패"
                                    }
                                    res.json(data);
                                    throw err;
                                }
                            });
                        res.json(response);
                    }
                }
            })
        }
    })
})


// 거래내역조회 API
app.post('/api/history', auth, (req, res) => {
    var userId = req.decoded.data.userId;
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
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var response = {
                        success: true,
                        data: JSON.parse(body)
                    }
                    res.json(response)
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) // 실행
})    