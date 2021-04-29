import React, {useEffect, useState} from 'react'
import '../css/SecondPage.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ajax';

function SecondPage(props) {
    const [User, setUser] = useState([]);
    const [Anonymous, setAnonymous] = useState('false');
    const [Price, setPrice] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/info', {
            headers: {"token" : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY4Nzc4NiwiZXhwIjoxNjE5NzE2NTg2fQ.OerDKIgvYtxcHt8GaQzd0MYKGANzX0Wqpu3leiTxn0Y'}
        }) 
            .then(response => {
                if (response.data.success){
                    console.log(response.data.data)
                    setUser(response.data.data.res_list);
                }
            })
    }, []);
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let fin = document.getElementById('fin');
        // console.log(fin.options[fin.selectedIndex].value);
        let body = {
            price: Price.replaceAll(',',''),
            anonymous: Anonymous,
            fin_use_num: fin.options[fin.selectedIndex].value
        }
        console.log(body)
        
            let option = {
                url : 'http://127.0.0.1:5000/api/withdraw',
                headers : {
                    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTY4Nzc4NiwiZXhwIjoxNjE5NzE2NTg2fQ.OerDKIgvYtxcHt8GaQzd0MYKGANzX0Wqpu3leiTxn0Y"
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

    // const onPriceHandler = (event) => {
    //     setPrice(event.currentTarget.value)
    // }


    const changeRadio = (e) => {
        setAnonymous(e.target.value);
    };

    const onPriceHandler = (event) => {
        var input = document.getElementById('price');
        console.log(input);
        var value = input.value;

      
        // 원단위로 변경하기
        var result = AddComma(value);
        setPrice(result)
      
        //   _$self.val(result);
    
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
    }
      
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
                <div class="form-check-inline">
                <label class="form-check-label" className="form">
                    <input 
                        type="radio" 
                        class="form-check-input" 
                        name="anonymous"
                        value="false"
                        checked={Anonymous === "false" ? true : false}
                        onChange={changeRadio}
                        />
                        기명
                </label>
                <br/>
                &nbsp;&nbsp;&nbsp;
                <label class="form-check-label" className="form"> 
                    <input 
                        type="radio" 
                        class="form-check-input" 
                        name="anonymous"
                        value="true"
                        checked={Anonymous === "true" ? true : false}
                        onChange={changeRadio}
                        />
                        무기명
                </label>
                <br/><br/><br/>
                </div>
                </div>
                <label class="form-check-label" className="form">보낼금액 
                &nbsp;&nbsp;<input type="text" class="form-inline-input" id="price" name="price" value={Price} onChange={onPriceHandler}/> &nbsp;원
                </label>
                <br/><br/>
                <div>
                <label class="form-check-label" className="form">
                    출금계좌&nbsp;&nbsp;&nbsp;
                <select id="fin" className="selectbox">
                    {User.length != 0 &&                
                        User.map((element) => {
                           return <option value={element.fintech_use_num} selected>{element.bank_name}</option>
                        })
                    }
                </select>
                &nbsp;&nbsp;
                {User.length != 0 &&   
                    <input class="form-inline-input" type="text" value={User[0].account_num_masked} readOnly/>
                }   
                </label>

                </div>
                <br/><br/>
                <button className="form-button" class="btn btn-light">헌금하기</button>
                </form>
            </div>
            <script>
                
            </script>
        </div>
    )
}

export default SecondPage