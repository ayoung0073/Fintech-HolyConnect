import React from 'react'
import '../css/MainPage.css'
import {Link} from 'react-router-dom'
import MainImage from '../images/MainPicture.png';


function MainPage(props) {
    return (
      <div>
        <style>

        </style>
        <div className="nav">
            <span className="title">Holy Connect</span> 
        </div>
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
                    <button className="btn-first">현금</button>
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