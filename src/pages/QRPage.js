import React from 'react'
// import '../css/MainPage.css'
import {Link} from 'react-router-dom'
// import '../js/global.script.js'
import '../js/qrcode.js'
// import '../js/qr.min.js'
// import '../js/jquery-3.2.1.min.js'
// import MainImage from '../images/MainPicture.png';

function QRPage(props) {
    function getQueryStringObject() {
        var a = window.location.search.substr(1).split('&');
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    }
    var qs = getQueryStringObject();
    // var jwtToken = sessionStorage.getItem('jwtToken');
    // new QRCode(document.getElementById("qrcode"), qs.fin_use_num);
return(
<div>
<main>
<div class="container">
    <div id="qrcode"></div>
</div>

<div class="form-divider"></div>

<footer>
    <div class="container">
        <ul>
            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa fa-google"></i></a></li>
            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
        </ul>
        <p>Copyright © All Right Reserved</p>
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