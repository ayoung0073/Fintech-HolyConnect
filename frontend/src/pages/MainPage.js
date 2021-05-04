import React from 'react'
import '../css/MainPage.css'
import {Link} from 'react-router-dom'
import Nav from '../components/Nav'
import MainImage from '../images/MainPicture.png';


function MainPage(props) {
    return (
      <div>
        <Nav />
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
      </div>
    );
}

export default MainPage