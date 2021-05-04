import '../css/MainPage.css'
import {Link} from 'react-router-dom'
import '../js/qrcode.js'
import React, {useEffect, useState} from 'react'
// import '@grapecity/wijmo.styles/wijmo.css';
import { BarcodeQrCode } from '@grapecity/wijmo.react.barcode.common';

function QRPage(props) {
    const [HCLink] = useState("http://172.30.1.27:3000");

return(
<div>
<nav>
<Link to="/">   
        <span className="third-title">Holy Connect</span> 
</Link>
</nav>
<main>
<div className="qr-container">
    <div className="qr-content">
        <h3 className="qrcode-name">HolyConnect QR코드</h3>
        <br/>
        <BarcodeQrCode className="qrcode" value={HCLink}/>
        <br/><br/>
        <div className="">Copyright © All Right Reserved</div>
    </div>
</div>
</main>

<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/qrcode.js"> </script>
<script src="js/global.script.js"></script>
</div>

);
}

export default QRPage