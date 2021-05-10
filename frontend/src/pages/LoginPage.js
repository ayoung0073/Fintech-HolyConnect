import React, { useState } from 'react'
import Nav from '../components/Nav'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


function LoginPage(props) {
    const [Email, setEmail] = useState("") // 초깃값 : 빈 string
    const [Password, setPassword] = useState("") 

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value) // Email의 state을 변경
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 안하면 누를 때마다 refresh된다. 뒤에 해야할 일들을 할 수가 없음

        console.log('Email', Email)
        console.log('Password', Password)

        let body = {
            email: Email,
            password: Password
        }
        
        let option = {
            url : 'http://127.0.0.1:5000/api/signin',
            headers: {
                "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mn0sImlhdCI6MTYxOTc0NDY4MiwiZXhwIjoxNjE5NzczNDgyfQ.7W9qufTuoYduydcJ0yCcxlJBzXW9FVKJgO5Tu70AkWY"
            },
            method: 'POST',
            data: body
        }
        axios(option)
        .then(response => {
            if (response.data.success){
                console.log(response.data.token);
                sessionStorage.setItem("token", response.data.token);
                props.history.push("/")
            }
    })
    }

    return (
        <div>
            <Nav/>
            <div class="container">
            <br/><br/>
            <h2 className="login-title">HOLY CONNECT</h2>
                <form onSubmit={onSubmitHandler}>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" value={Email} placeholder="Enter email" onChange={onEmailHandler} /> 
                        <label>Password</label>
                        <input type="password" value={Password} class="form-control" placeholder="Enter password" onChange={onPasswordHandler} />
                    </div>
                    <br/>
                    <button className="btn-login2">LOGIN</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)
