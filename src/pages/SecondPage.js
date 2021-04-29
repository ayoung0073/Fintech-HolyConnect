import React, {useEffect} from 'react'
import '../css/SecondPage.css'
import axios from 'axios';


function SecondPage() {
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/info', {
            headers: {"Authorization" : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY1ODMxMSwiZXhwIjoxNjE5Njg3MTExfQ.eouMk7rkaiW57sYE-ZupbBzIkbdImLdXB09VsI2UzNY'}
        }) /* 사이트URL/Third 로 받아오면 됨*/
            .then(response => {
                console.log(response)
            });
    }, []);  
    return(
        <div className="BG">
            <div className="LeftSpace">
                <div className="Value-">
                가치(Value)를 공유하는 삶 
                </div>
                <div className="Holy-Connect-is-always-being-with-you">
                Holy Connect is always being with you
                </div>
            </div>

            <div className="RightSpace">
                <div>
                    <div>
                    <button className="nameBt1">기명</button>
                    <button className="nameBt2">무기명</button>
                    </div>
                    <label className="SendMoney">보낼금액</label>
                    <input type="text" className="Rectangle-2"/>
                </div>
                <div>
                <label className="Account">
                    출금계좌
                </label>
                <select>
                    <option value="kb bank">kb bank</option>
                    <option value="kakao bank">kakao bank</option>
                </select>
                <input type="text" value="123 2434 235435" className="AccountNumber"></input>
                </div>
            <input className="submit" type="submit"></input>
            </div>
        </div>
    
    )
}

export default SecondPage