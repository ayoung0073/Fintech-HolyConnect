import React, {useEffect, useState} from 'react'
import '../css/SecondPage.css'
import axios from 'axios';

function SecondPage(props) {
    const [User, setUser] = useState([]);
    const [Anonymous, setAnonymous] = useState('false');
    const [Price, setPrice] = useState('');

    useEffect(() => {
        axios.get('http://192.168.0.21:5000/api/info', {
            headers: {"token" : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY1ODMxMSwiZXhwIjoxNjE5Njg3MTExfQ.eouMk7rkaiW57sYE-ZupbBzIkbdImLdXB09VsI2UzNY'}
        }) 
            .then(response => {
                if (response.data.success){
                    console.log(response.data.data)
                    setUser(response.data.data);
                }
            })
    }, []);
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let fin = document.getElementById('fin');
        // console.log(fin.options[fin.selectedIndex].value);
        let body = {
            price: Price,
            anonymous: Anonymous,
            fin_use_num: fin.options[fin.selectedIndex].value
        }
        console.log(body)
        
            let option = {
                url : 'http://192.168.0.21:5000/api/withdraw',
                headers : {
                    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY1ODMxMSwiZXhwIjoxNjE5Njg3MTExfQ.eouMk7rkaiW57sYE-ZupbBzIkbdImLdXB09VsI2UzNY"
                },
                method : 'POST',
                data: body
            }
            axios(option)
            .then(response => {
                if (response.data.success){
                    console.log(response.data.data)
                    props.history.push("/third")
                }
        })
    }

    const onPriceHandler = (event) => {
        setPrice(event.currentTarget.value)
    }


    const changeRadio = (e) => {
        setAnonymous(e.target.value);
    };


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
            <form onSubmit={onSubmitHandler}>
                <div>
                <label>
                <input
                    type="radio"
                    name="anonymous"
                    value="false"
                    checked={Anonymous === "false" ? true : false}
                    onChange={changeRadio}
                ></input>
                기명
                </label>
                <label>
                <input
                    type="radio"
                    name="anonymous"
                    value="true"
                    checked={Anonymous === "true" ? true : false}
                    onChange={changeRadio}
                ></input>
                무기명
                </label>
                </div>
                <label className="SendMoney">보낼금액</label>
                <input type="text" className="Rectangle-2" name="price" value={Price} onChange={onPriceHandler}/>
                <div>
                <label className="Account">
                    출금계좌
                </label>

                <select id="fin">
                    {User.length != 0 &&                
                        User.res_list.map((element) => {
                           return <option value={element.fintech_use_num} selected>{element.bank_name}</option>
                        })
                    }
                </select>
                {User.length != 0 &&   
                    <input type="text" value={User.res_list[0].account_num_masked} className="AccountNumber"></input>
                }   

                </div>
                <button>헌금하기</button>
                </form>
            </div>
        </div>
    )
}

export default SecondPage