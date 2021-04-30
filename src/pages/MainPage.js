import React from 'react'
import '../css/MainPage.css'
import {Link} from 'react-router-dom'
import MainImage from '../images/MainPicture.png';


function MainPage(props) {
    return (
      <div>
        <nav className="main-nav">
            <span className="main-title">Holy Connect</span> 
            <button className="login-btn">로그인</button>
            <Link to="qrcode?fin_use_num=120211211988932289661912">
                <button className="qr-btn">QR코드 생성</button>
            </Link>
        </nav>
        {/* <img src={MainImage} height="1000px" alt="MainImage" class="MainImage"> */}
        <div className="bg">
            <div className="mainBody">
                <div className="mainContent">
                    Be with you, <br/>
                    Be valuable.
                </div>
                <div className="subContent">
                    Holy Connect, 가치를 부여하다
                </div>
                <Link to="/second">
                    <button className="btn-first">헌금</button>
                </Link>
                <button className="btn-second">
                    스케줄
                </button>
            </div>
        </div>
        {/* </img> */}
      </div>
    );
}

export default MainPage