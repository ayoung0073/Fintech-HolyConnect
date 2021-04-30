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
                console.log(response.data.data)
                setList(response.data.data.res_list)
                }
            )
            }, []);

    return (
        <div style={{display:'flex'}}>
            {/* <img src={TransferImage}alt="TransferImage" class="TransferImage"/> */}
            <div className="screen">
                <div className="second-body">
                <div>
                {/* <input className="userName" type="userName"/> */}
                {/* <div className="userNameText">님에게</div> */}
                </div>
                <div>
                    <div className="amount"></div>
                    <h3>✔️ 이체가 성공적으로 완료되었습니다!</h3>
                </div>
                {/* <div>
                    <label className ="withdrawerAccontText"> 받는 계좌</label>
                    <input className="withdrawerInput" type="withdrawerAccount" />
                </div> */}
                <br/>
                <div>
                <h4 className="">최근 헌금 내역</h4>

                {/* function date() {
                    var dateArray = [];
                    for(i = 0; i < 5; i++) {
                        dateArray[i] += {list.length != 0 &&  
                            list.map((element) => {
                            return <p value={element.tran_date}>{element.tran_date}</p>
                            })}
                     }           
                } */}
                
                
                <table class="history-table" border="1px" align="center">
                    <tr >
                        <th class="table-title">헌금 날짜</th>
                        <th class="table-title">가격</th>
                    </tr>
                    {list.length != 0 && 
                    list.slice(0, 5).map((element) => { // 리스트 자르기
                        return <tr>
                                   <td>{element.tran_date}</td>
                                   <td>{element.tran_amt}원</td>
                               </tr>
                    })
                }
                </table>
                <br/>
                <Link to="/third">
                    <button className="btn-history">헌금내역조회</button>
                </Link>
                &nbsp;
                <Link to="/main">
                    <button className="btn-check">
                        확인
                    </button>
                </Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ThirdPage