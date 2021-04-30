import '../css/MainPage.css'
import {Link} from 'react-router-dom'
// import '../js/global.script.js'
import '../js/qrcode.js'
import React, {useEffect, useState} from 'react'
// import '../js/qr.min.js'
// import '../js/jquery-3.2.1.min.js'
// import MainImage from '../images/MainPicture.png';
// import '@grapecity/wijmo.styles/wijmo.css';
import { BarcodeQrCode } from '@grapecity/wijmo.react.barcode.common';

function QRPage(props) {

    const [Fintech, setFintech] = useState('120211211988932289661912');

return(
<div>
<nav>
<Link to="/">   
        <span className="third-title">Holy Connect</span> 
</Link>
</nav>
<main>
<div class="container">
    
    <div className="qr-content">
        <BarcodeQrCode className="qrcode" value={Fintech}/>
    </div>
</div>

<footer>
    <div className="qr-content">
        <span className="qr-foot">Copyright © All Right Reserved</span>
    </div>
</footer>

</main>

<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/qrcode.js"> </script>
<script src="js/global.script.js"></script>
</div>

);
}

export default QRPage