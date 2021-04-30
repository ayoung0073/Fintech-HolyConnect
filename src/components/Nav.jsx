import React from 'react';
import {Link} from 'react-router-dom'


const Nav = () => {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js" defer></script>
            {/* <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet"/>
            <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script> */}
            
        <nav className="main-nav">
            <span className="main-title">Holy Connect</span> 
            <button className="login-btn">로그인</button>
            <Link to="qrcode?fin_use_num=120211211988932289661912">
                <button className="qr-btn">QR코드 생성</button>
            </Link>
        </nav>
    </div>
    );
  };
export default Nav;