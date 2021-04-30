import React, {useEffect, useState} from 'react'
import axios from 'axios';
import '../css/PayList.css'
import {Link} from 'react-router-dom'

function PayList() {

    const [list, setList] = useState([]);

    useEffect(() => {
        let option = {
            url : 'http://192.168.0.21:5000/api/history',
            headers : {
                "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTc0NDY4MiwiZXhwIjoxNjE5NzczNDgyfQ.7W9qufTuoYduydcJ0yCcxlJBzXW9FVKJgO5Tu70AkWY"
            },
            method : 'POST',
            data: {"fin_use_num": "120211211988932289661912"}
        }
        axios(option
        ).then(response => {
                console.log(response.data.data)
                setList(response.data.data.res_list)
                }
            )
            }, []);

        function AddComma(dataValue) {
            console.log(dataValue);
            dataValue = dataValue.replaceAll(',','');
            isNumber(dataValue);
            var separateValue = Number(dataValue).toLocaleString('en');
            console.log(separateValue);
            if (separateValue == 'NaN') {
            return '';
            }
            return separateValue;
        }
    
        function isNumber(checkValue) {
            checkValue = '' + checkValue;
            if (isNaN(checkValue) || checkValue == "") {
                alert('숫자만 입력해 주세요.');
                return;
            }
        }

    return(

        <div className="pay-div">
            <nav className="pay-nav">
                <Link to="/">
                    <span className="pay-title">Holy Connect</span> 
                </Link>
            </nav>
        <br/>
        <br/>
        <h1>헌금 내역</h1>
        <br/>
        <table class="full-history-table" border="2px" align="center">
            <tr class="full-title">
                <th>헌금 날짜</th>
                <th>헌금액</th>
            </tr>
            {list.length != 0 &&  
                list.map((element) => {
                return (
                    <tr>
                    <td>{element.tran_date}</td>
                    <td>{AddComma(element.tran_amt)}원</td>
                    </tr>
                    )
                })
            }
        </table>
        <br/>
        <Link to="/">
            <button className="pay-check-btn">확인</button>
        </Link>
        <br/>
        <br/>
        </div>
        

    )
}
    export default PayList