import React, {useEffect, useState} from 'react'
import TransferImage from '../images/TransferImage.PNG';
import axios from 'axios';
import '../css/ThirdPage.css'

import {Link} from 'react-router-dom'




function ThirdPage() {

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
                console.log(response.data.data.res_list)
                setList(response.data.data.res_list)
                }
            )
            }, []);

    return (
        <div style={{display:'flex'}}>
            <img src={TransferImage}alt="TransferImage" class="TransferImage"/>
            <div className="screen">
                
                  <div style={{display : 'flex', flexDirection:'column'}}>
                <div>
                {/* <input className="userName" type="userName"/> */}
                {/* <div className="userNameText">님에게</div> */}
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


                {/* function date() {
                    var dateArray = [];
                    for(i = 0; i < 5; i++) {
                        dateArray[i] += {list.length != 0 &&  
                            list.map((element) => {
                            return <p value={element.tran_date}>{element.tran_date}</p>
                            })}
                     }           
                } */}
                
                
                <ul class="date">
                    <li>
                    {list.length != 0 &&  
                    list.map((element) => {
                    return <p value={element.tran_date}>{element.tran_date}</p>
                    })} 
                    

                    </li>
                    <li>
                   {list.length != 0 &&
                    list.map((element) => {
                    return <p value={element.tran_amt}>{element.tran_amt}</p>
                    })} 
                    </li>
                    
                </ul>


                </div>

                <button className="TransferRecordBtn">거래내역조회</button>
                <button className="checkBtn">확인</button>
                </div>
            </div>
        </div>
    );
}

export default ThirdPage