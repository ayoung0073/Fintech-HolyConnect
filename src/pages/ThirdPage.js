import React, {useEffect} from 'react'
import checkImage from '../images/checkImage.PNG';
import TransferImage from '../images/TransferImage.PNG';
import axios from 'axios';
import '../css/ThirdPage.css'
import {Link} from 'react-router-dom'
// const request = axios.post('/api/board', dataTosubmit, {
//     headers: { "Content-Type": `application/json`}
// })
function ThirdPage() {
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/info', {
            headers: {"Authorization" : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY1ODMxMSwiZXhwIjoxNjE5Njg3MTExfQ.eouMk7rkaiW57sYE-ZupbBzIkbdImLdXB09VsI2UzNY'}
        }) /* 사이트URL/Third 로 받아오면 됨*/
            .then(response => {
                console.log(response)
            });
    }, []);  
    return (
        <div>
          <img src={TransferImage}alt="Trans" class="Trans"/>
            <div className="screen">
                <img src = {checkImage}
                  width = '100px'
                  height='100px' />
                <div>
                <input className="userName" type="userName"/>
                <div className="userNameText">님에게</div>
                </div>
                <div>
                    <div className="amount"></div>
                    <div className="transferMessage">이체가 성공적으로 완료되었습니다</div>
                </div>
                <div>
                    <label className ="withdrawerAccontText"> 받는 계좌</label>
                    <input className="withdrawerInput" type="withdrawerAccount" />
                </div>
                <div>
                <div className="recentTransferRecordName">최근 거래내역</div>
                <div className="recentTransferRecord"></div>
                </div>
                <button className="TransferRecordBtn">거래내역조회</button>
                <button className="checkBtn">확인</button>
            </div>
        </div>
    );
}

export default ThirdPage