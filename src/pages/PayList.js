import React, {useEffect, useState} from 'react'
import axios from 'axios';
import '../css/PayList.css'


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

    return(

        
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
                    <td>{element.tran_amt}원</td>
                    </tr>
                    )
                })
            }
        </table>

        

    )
}
    export default PayList