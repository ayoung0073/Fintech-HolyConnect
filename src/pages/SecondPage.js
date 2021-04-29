import React, {useEffect, useState} from 'react'
import '../css/SecondPage.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


function SecondPage() {
    const [User, setUser] = useState([]);

    const [Account, setAccount] = useState('');
    useEffect(() => {
        axios.get('http://192.168.0.21:5000/api/info', {
            headers: {"Authorization" : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY1ODMxMSwiZXhwIjoxNjE5Njg3MTExfQ.eouMk7rkaiW57sYE-ZupbBzIkbdImLdXB09VsI2UzNY'}
        }) 
            .then(response => {
                if (response.data.success){
                    console.log(response.data.data)
                    setUser(response.data.data);
                }
            })
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
                    <label className="named">기명</label>
                    <input type="checkbox" className="nameBt1"/>
                    <label className="named">무기명</label>
                    <input type="checkbox" className="nameBt2"/>
                </div>
                <label className="SendMoney">보낼금액</label>
                <input type="text" className="Rectangle-2"/>
                <div>
                <label className="Account">
                    출금계좌
                </label>
                <select>
                    {User.length != 0 &&                
                        User.res_list.map((element) => {
                           return <option value={element.fintech_use_num} selected>{element.account_alias}</option>
                        })
                    }
                </select>
                {User.length != 0 &&   
                    <input type="text" value={User.res_list[0].account_num_masked} className="AccountNumber"></input>
                }   

                </div>
                <Link to="/third">
                    <input className="submit" type="submit"></input>
                </Link>
            </div>
        </div>
    
    )
}

export default SecondPage