/*
 * 公共变量
 *
 * */
var textArea = 'http://m.jiashuangkuaizi.com';
//var textArea='http://beta.m.jiashuangkuaizi.com';


/**
 *
 * 公共函数
 * 公共的HttpClient
 */
/*
 * 截取地址栏value
 *
 * paramName  key
 * */

function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = this.location.search.substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=",2)[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

//获取#之后的内容
function getAnchor(){
    var loc=location.href;
    var array=new Array();
    array=loc.split("#");
    var index = array.length > 1 ? array[1].split("&")[0] : '';
    return index;
}
/*
 * ajax 请求
 * 无上传参数
 * post
 *
 * */
function sendPost($url) {
    var dataStr;
    $.ajax({
        async: false,   //同步请求
        type: "post",
        url: $url,
        success: function (data) {
            dataStr = data;
        }
    });
    return dataStr;
}

/*
 * ajax 请求
 * 有传参数  为对象
 * post
 * */
function sendPostData($url, dataObj) {
    var dataStr;
    $.ajax({
        async: false,   //同步请求
        type: "post",
        url: $url,
        data: dataObj,
        success: function (data) {
            dataStr = data;
        }
    });
    return dataStr;
}

function sendPostDataAsync($url, dataObj, callback) {
    var dataStr;
    $.ajax({
        async: true,
        type: "post",
        url: $url,
        data: dataObj,
        success: callback
    });
    return dataStr;
}

/*
 *
 *  ajax 请求
 *  无参
 *  get
 *
 * */
function sendGet($url) {
    var dataStr;
    $.ajax({
        async: false,   //同步请求
        type: "get",
        url: $url,
        success: function (data) {
            dataStr = data;
        }
    });
    return dataStr;
}




function SendPostData($url, dataObj) {
    var dataStr;
    $.ajax({
        async: true,   //同步请求
        type: "post",
        url: $url,
        data: dataObj,
        success: function (data) {
            dataStr = data;
        }
    });
    return dataStr;
}

//处理图片函数
//all  显示所有图片
//showNum 为显示的张数
function dealImgs(string, showNum) {
    var imageArr = new Array(); //定义一数组
    var newArr = new Array();
    imageArr = string.split(",");
    var len = imageArr.length;
    if (showNum == "all") {
        showNum = len;
    } else if (showNum > len) {
        showNum == 1;
    } else {
        showNum = showNum;
    }
    for (var i = 0; i < showNum; i++) {
        newArr.push(imageArr[i]);
    }
    return newArr;
}

//截取字符串
function showLen(str, len,type) {
    var result = "";
    if (str.length > len) {
        if(type==1){
            result = str.substr(0, len);
        }else{
            result = str.substr(0, len)+"...";
        }
    } else {
        result = str
    }
    return result;
}


//deal num
function dealNumFont(str,box){
    var result="";
    var w=$(box).width();
    var font_size=parseInt($(box).css("font-size"));
    var font_num=(w/font_size)*2;
    var len=font_num-4;
    var lens=str.length;
    if(lens > len) {
        result = str.substr(0, len) + "...";
    }else if(font_size <lens){
        result = str;
    }else {
        result = str;
    }
    return result;
}

//获取某元素下，高小于某一高度的数据，成为诶威十足
//box  盒子的class  或id   注：必须带有#或.
//height   标准， 当图片小于这一高度会取出来放到数组
function lessHeight(box, height) {
    var len = $(box).find("img").length;
    var data = {};
    data[0] = [];
    data[1] = [];
    if ($(box).find("li").length != 0) {
        for (var i = 0; i < len; i++) {
            var h = $(box).find("img").eq(i).height();
            if (h < height) {
                data[0][i] = i;
                data[1][i] = h;
            }
        }
    }

    return data;
}
//判断是否换行
//解决在屏幕大的情况下，文字无法垂直居中
function ifChange(box) {
    var lineH = parseInt($(box).css("lineHeight"));
    var actH = parseInt($(box).css("height"));
    if (actH == lineH) {
        $(box).css("lineHeight", actH * 2 + "px");
    }
}

function goToByScroll(id) {
    $('html,body').animate({scrollTop: $(id).offset().top}, 10);
}

function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}


//截取字符串
//高仿 placeholder
function placeShow(id, placeText, attrName) {
    $(id).bind("focus", function (e) {
        if ($(this).attr(attrName) == placeText) {
            $(this).attr(attrName, "");
        } else {
            $(this).attr(attrName, $(this).attr(attrName));
        }

    })
    $(id).bind("blur", function (e) {
        if ($(this).attr(attrName) == "") {
            $(this).attr(attrName, placeText);
        }
    })
}
/*
 * 输入框限制长度  并截取  显示剩余长度
 *
 *
 * */
function words_deal(box, showBox, num, msg) {
    var curLength = $(box).val().length;
    if (curLength > num) {
        var num = $(box).val().substr(0, num);
        $(box).val(num);
    }
    else {
        var num = num - $(box).val().length;
        $(showBox).text(num);
    }
}

//检查是否全是空
function checkBlankSpace(str) {
    while (str.lastIndexOf(" ") >= 0) {
        str = str.replace(" ", "");
    }
    return str.length;
}


//alert  橙色按钮  需拷贝css html
/*function jAlert(msg) {
    $(".bgAlert").show();
    $(".alertBox").show();
    $(".textTi").prepend(msg);
    $(".alertBtn").bind("click", function () {
        $(".alertBox").hide();
        $(".bgAlert").hide();
        return true;
    })
}*/

function jAlert(msg) {
    $(".bgAlert").show();
    $(".alertBox").show();
    $(".textTi").html(msg);
    $(".alertBtn").bind("click", function () {
        $(".alertBox").hide();
        $(".bgAlert").hide();
        return true;
    })
}



function tAlert(msg) {
    $(".bgAlert").show();
    $(".alertBox").show();
    $(".textTi").html(msg);
    $('.bgAlert').bind("click", function (e) {
        e=e || window.event;
        e.stopPropagation();
        $(".alertBox").hide();
        $(".bgAlert").hide();
        return true;
    })
}

/*MAlert  弹框*/
/*
 * 背景为黑  font  为#fff
 * 需拷贝css
 * */
function MAlert(msg) {
    //$("body").css("max-width","640px");
/*    var sec = $('<section class="alertBox"></section>');
    var divAlert = $('<div class="alert"></div>');
    var pAlert = $('<p>'+msg+'</p>');
    pAlert.appendTo(divAlert);
    divAlert.appendTo(sec);
    $("body").append(sec);
    $("p").css( "padding","1.8em 4em");*/
   /* $(".alert").css({
        "position":"fixed","bottom":"4em",
        "left":"50%",
        "bottom":"8em",
        "background":"rgba(0,0,0,0.6)",
        "color":"#fff",
        "border-radius":"4px",
        "font-size":"1.3em",
        "zIndex":"41"
        });
    $(".alert").animate({opacity: "1"}, 500);
    var marLe = $(".alertBox").find("p").outerWidth();
    var w=marLe/2;
    $(".alert").css("margin-left","-"+w+"px");
    //3秒之后消失
    setTimeout(function () {
        $(".alert").animate({opacity: "0"}, 300);
        $(".alertBox").remove();
    }, 3000);*/
   // $("body").css("max-width","");
    alert(msg);
}


//down  app  ios  到appStore
//android  到应用宝
//pc  直接下
//微信  跳到应用宝会自动区分
function downApp() {
    var from = "";
    var userAgent = window.navigator.userAgent.toLowerCase();
    //平台
    var platform = (function () {
        var ua = navigator.userAgent;
        return /MicroMessenger/i.test(ua) ? "weixin" : /Android/i.test(ua) ? "android" : /iPhone|iPad|iPod/i.test(ua) ? "ios" : "pc";
    })();
    var version = "2.4.3";
    if (platform == "android") {
        window.location.href = 'http://m.oyekeji.com/apk/media/huijiachifan/huijiachifan_user_' + version + '.apk';
    } else if (platform == "ios") {
        location.href = 'https://itunes.apple.com/app/id922791815';
    } else if (platform == "weixin") {
        location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.privatekitchen.huijia";
    } else if (platform == "pc") {
        location.href = 'http://m.oyekeji.com/apk/media/huijiachifan/huijiachifan_user_' + version + '.apk';
    }
}
//down  B 厨房端  app
function downAppKitchen() {
    var from = "";
    var version = '2.3.0'
    var userAgent = window.navigator.userAgent.toLowerCase();
    //平台
    var platform = (function () {
        var ua = navigator.userAgent;
        return /MicroMessenger/i.test(ua) ? "weixin" : /Android/i.test(ua) ? "android" : /iPhone|iPad|iPod/i.test(ua) ? "ios" : "pc";
    })();
   // var version = "2.3.0";
    if (platform == "android") {
        window.location.href = 'http://m.oyekeji.com/apk/huijiachifan_kitchen_' + version + '.apk?jskz_mallow=new';
    } else if (platform == "ios") {
        location.href = 'https://itunes.apple.com/cn/app/id919044974?mt=8&jskz_mallow=new';
    } else if (platform == "weixin") {
        location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jiashuangkuaizi.huijiachifan&jskz_mallow=new";
    } else if (platform == "pc") {
        location.href = 'http://m.oyekeji.com/apk/huijiachifan_kitchen_' + version + '.apk?jskz_mallow=new';
    }
}
//urlEncode
function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
//urlDecode
function UrlDecode(zipStr){
    var uzipStr="";
    for(var i=0;i<zipStr.length;i++){
        var chr = zipStr.charAt(i);
        if(chr == "+"){
            uzipStr+=" ";
        }else if(chr=="%"){
            var asc = zipStr.substring(i+1,i+3);
            if(parseInt("0x"+asc)>0x7f){
                uzipStr+=decodeURI("%"+asc.toString()+zipStr.substring(i+3,i+9).toString());
                i+=8;
            }else{
                uzipStr+=AsciiToString(parseInt("0x"+asc));
                i+=2;
            }
        }else{
            uzipStr+= chr;
        }
    }

    return uzipStr;
}

function StringToAscii(str){
    return str.charCodeAt(0).toString(16);
}
function AsciiToString(asccode){
    return String.fromCharCode(asccode);
}


//配送 数字与类型的判断
function showType(typeNum) {
    var style = '';
    if (typeNum == 1) {
        style = "配送";
    } else if (typeNum == 2) {
        style = "自取";
    } else if (typeNum == 3) {
        style = "上门就餐";
    }
    return style;
}

/*  $('img').error(function(){
 $(this).attr('src', '加载失败.png');
 });*/

//图片在家失败时，调用该函数   jquery
//box 代表父盒子,例：#parent
//type  1为隐藏  2.为替代  选替代则为空
//targetBox  要隐藏的祖父盒子  例：#parents
//imgUrl  替代图片的路径  选择1，则为空 ''

function imgErrorFn(box, type, targetBox, imgUrl) {
    $(box + " img").error(function () {
        /* $(this).parents("#remen_main").hide();*/
        //隐藏
        if (type == 1) {
            if (targetBox == '') {
                $(this).hide();
            } else {
                $(this).parents(targetBox).hide();
            }
            //替代
        } else if (type == 2) {
            $(this).attr('src', imgUrl);
        }
    })
}


/**
 * 两个经纬度的差
 * approx distance between two points on earth ellipsoid
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getFlatternDistance(lat1, lng1, lat2, lng2) {
    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

/*二次分享处理函数  */
//shareInfo  duixiang
function shareInfoFn(shareInfo) {
    var wxShareRoute = [
        'onMenuShareTimeline',//朋友圈
        'onMenuShareAppMessage',//微信好友
        'onMenuShareQQ',//qq好友
        'onMenuShareWeibo',//腾讯微博
        'openLocation',
        'getLocation'
    ];
    wxShareRoute.forEach(function (route) {
        wx[route]({
            title: shareInfo.title, // 分享标题
            desc: shareInfo.desc,//分享内容
            link: shareInfo.link, // 分享链接
            imgUrl: shareInfo.imgUrl, // 分享图标
            success: function (res) {
                // 用户确认分享后执行的回调函数
                // alert(res.errMsg);
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
                //  alert(res.errMsg);
            }
        })
    });
}


/*微信配置*/
function shareConfig(obj) {
    var appId = 'wx0bd1d7499bc95dcc';
    wx.config({
        debug: false,
        appId: appId,
        timestamp: obj.timestamp,
        nonceStr: obj.noncestr,
        signature: obj.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'openLocation',
            'getLocation'
        ]
    });
}
/*
* 分享到朋友圈与分享给好朋友文案不一致时
* 调用此函数
* */

/*二次分享处理函数  */
function jumpPage(phone,shareKey,newShareKey){
    var url='/Activity/717ReceiveCoupons';
    var urlObj={'share_key':shareKey,"phone":phone};
    var data=sendPostData(url,urlObj);
    var obj = JSON.parse(data);
    if(obj.code==0){
        location.href="/Activity/CHJCF717Success?share_key="+newShareKey+"shareFrom=app&isInsert=true&ifDown=true";
        //领取成功
    }else if(obj.code==104 ){
        //已领取
        location.href="/Activity/CHJCF717Fail?share_key="+newShareKey+"shareFrom=app&isInsert=true&ifDown=true";
    }else{
       // alert(obj.msg);
    }
}



/*
 * *晚餐券活动
 * * */



function cWorkTimeCoupon(op,phone,share){
    var code="";
    var url='/Activity/WorkOvertimeCoupon';
    var urlObj={"phone":phone,"op":op,"jskz_mallow":"current"};
    var data=sendPostData(url,urlObj);
    var obj = JSON.parse(data);
    if(op=="check"){
        code=obj;
    }else if(op==""){
        if(obj.code==0){
            location.href="/Activity/cWorkTimeSuccess?shareSource="+ifInApp+share;
        }else if(obj.code==1){
            location.href="/Activity/cWorkTimeFail?shareSource="+ifInApp+share;
        }else if(obj.code==2){
            location.href="/Activity/cWorkTimeEnd?shareSource="+ifInApp+share;
        }else{
            jAlert(obj.msg);
        }
    }
    return code;
}



/* 直接分享   */

/*微信检查*/
// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
function shareCheck() {
    wx.checkJsApi({
        jsApiList: [
            'getNetworkType',
            'previewImage'
        ],
        success: function (res) {
           // alert(JSON.stringify(res));
        }
    });
}
function shareWxError() {
    wx.error(function (res) {
        // alert(res.errMsg);
    });
}
//下面是64个基本的编码
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//编码的方法
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
//解码的方法
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {

        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
//将参数全部转化为大写或小写  方便比对  解决ios 的大小写分辨问题
//全部转化为小写
function toUperCase(str) {
    str.toUpperCase();
}
//全部转化为小写
function toLowerCase(str) {
    str.toLowerCase();
}
//将时间转化为秒
function changeToSeconds(str) {
    var timeStartArr = str.split(":");
    var h = 0;
    var m = 0;
    if (timeStartArr[0][0] == 0) {
        h = timeStartArr[0][1];
    } else {
        h = timeStartArr[0];
    }
    if (timeStartArr[1][0] == 0) {
        m = timeStartArr[1][1];
    } else {
        m = timeStartArr[1];
    }
    var seconds = h * 3600 + m * 60;
    return seconds;
}

/*
*  求数组中的最大值，最小值
*  调用方法:maxMinIndex ([1,2,4,5],"max")
*  返回  最小值+“，”+索引
* */

function maxMinIndex(arr,minMax) {
    if(minMax=="min"){
        var min=Math.min.apply(Math, arr);
        return arr.indexOf(min)+","+min;
    }else if(minMax=="max"){
        var max=Math.max.apply(Math, arr);
        return arr.indexOf(max)+","+max;
    }

}


/*
*
* m页特有函数
* */

//判断接口返回的是否为202，是否要跳到录页
 function ifJumpLogin(obj){
    if(obj.code==202){
         //删除cookie user_key
        var url=base64encode(location.href);
        location.href="/UKitchen/mUserLogin?ReturnUrl="+url;
    }
}

//判断user_key是否存在，如果不存在跳登陆页。，、
function ifJumpLoginUserKey(){
    var key=getCookie("user_key");
    if(key==''){
        var url=base64encode(location.href);
        return "/UKitchen/mUserLogin?ReturnUrl="+url;
    }else{
        return 0;
    }
}

/*
 * * android 不支持placeholder 的居中
 * * */
function changePlaceholder(){
    var value=$(this).parent().parent().find(".phone").val();
    var default_value=$(this).parent().parent().find(".phone").attr("default_value");
    if(value==default_value){
        $(this).parent().parent().find(".phone").val("");
    }
}
/*
*
* */




function CHJCF817Coupons(phone,ifInApp,op,sharedeal,urlShareKey,shareKeyNew){
    if(sharedeal=="weiXin"){
         window.timer = true;
     }
       var code="";
       // var url='/activities/api/get817Coupon';
       var url='/activities/a201508/getScratchCard';
       var reqShareKey="";
       var appAddUrl="";
       if(op=="check"){
           reqShareKey=urlShareKey;
       }else if(op=="coupon"){
           reqShareKey="";
       }
       var urlObj={"phone":phone,"op":op,"jskz_mallow":"current","key":reqShareKey};
       var data=sendPostData(url,urlObj);
       var obj = JSON.parse(data);
       if(op=="check"){
         code=obj;
       }else if(op=="coupon"){
          if(ifInApp==1){
                appAddUrl="&type='share'&shareType=5";
          }else{
                appAddUrl="&noType=true";
          }

            if(obj.code==1){
                  location.href="/Activity/CHJCF817Success?shareSource="+ifInApp+"&share_key="+shareKeyNew+"&title=家与美食怎可辜负&jskz_mallow=new"+appAddUrl;
            }else if(obj.code==2){
                  location.href="/Activity/CHJCF817Old?shareSource="+ifInApp+"&share_key="+shareKeyNew+"&title=家与美食怎可辜负&jskz_mallow=new"+appAddUrl;
            }else if(obj.code==3){
                  location.href="/Activity/CHJCF817Fail?shareSource="+ifInApp+"&share_key="+shareKeyNew+"&title=家与美食怎可辜负&jskz_mallow=new"+appAddUrl;
            }else if(obj.code==4){
                  location.href="/Activity/CHJCF817End?shareSource="+ifInApp+"&share_key="+shareKeyNew+"&title=家与美食怎可辜负&jskz_mallow=new"+appAddUrl;
            }else{
                jAlert(obj.msg);
            }
     }  
     return code;
}



function dealPlaceHolder(className){
    var phone='';
       $(className).on("focus",function(){
            var phone=$(this).parent().parent().find(className).val();
            var default_value=$(this).parent().parent().find(className).attr("default_value");
            if(phone==default_value){
                $(this).val("");
                phone="";
            }else{
                phone=phone;
            }
            $("#bottom1_login").css("position","relative");
        })
        $(className).on("blur",function(){
            var phone=$(this).parent().parent().find(className).val();
            var default_value=$(this).parent().parent().find(className).attr("default_value");
            if(phone==""){
                $(this).parent().parent().find(className).val(default_value);
                phone="";
            }else{
                phone=phone;
            }
            $("#bottom1_login").css("position","absolute");
        })
    return phone;
}


  //917活动接口
function CHJCF917Coupons(phone,ifInApp,op,sharedeal,urlShareKey,shareKeyNew){
    if(sharedeal=="weiXin"){
         window.timer = true;
     }
       var code="";
       var url='/activities/a201509/get917Coupon';
       var reqShareKey="";
       var appAddUrl="";
       if(op=="check"){
           reqShareKey=urlShareKey;
       }else if(op=="coupon"){
           reqShareKey="";
       }
       var urlObj={"phone":phone,"op":op,"jskz_mallow":"current","key":reqShareKey};
       var data=sendPostData(url,urlObj);
       var obj = JSON.parse(data);
       if(op=="check"){
         code=obj;
       }else if(op=="coupon"){
          if(ifInApp==1){
                appAddUrl="&type='share'&shareType=5";
          }else{
                appAddUrl="&noType=true";
          }
          //判断状态显示相应页面
          if(obj.code==1){
              $('#success').show().siblings("section").hide();
              $(".bgMen").hide();
          }else if(obj.code==2){
              $('#old').show().siblings("section").hide();
              $(".bgMen").hide();
          }else if(obj.code==3){
              $('#fail').show().siblings("section").hide();
              $(".bgMen").hide();
          }else if(obj.code==4){
              $('#end').show().siblings("section").hide();
              $(".bgMen").hide();
          }else{
              jAlert(obj.msg);
          }
     }  
     return code;
}

//shareInfo  分享到朋友圈与其他文案不一致时
////分享成功调用接口时，需传入type，type需约定
////兼容直接分享，及以前晚餐券，717活动
function shareExceptPYQ(shareInfo,shareInfoPyq) {
    //alert(shareInfo.link)
    var wxShareRoute = [
        'onMenuShareAppMessage',//微信好友
        'onMenuShareQQ',//qq好友
        'onMenuShareWeibo',//腾讯微博
        'onMenuShareTimeline'//朋友圈
    ];
    wxShareRoute.forEach(function (route) {
          var links=shareInfoPyq.link;
        if(route!="onMenuShareTimeline"){
            wx[route]({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.desc,//分享内容
                link: shareInfo.link, // 分享链接
                imgUrl: shareInfo.imgUrl, // 分享图标
                success: function (res) {
                    if(shareInfo.share_type && shareInfo.share_type!=''){
                        var type=shareInfo.share_type;
                        //alert(type);
                        if(type==201508){
                            var phone=shareInfo.phone;
                            if(phone){
                              CHJCF817Coupons(phone,"weiXin","coupon","weiXin",shareInfoPyq.urlShareKey,shareInfoPyq.shareKeyNew);
                            }
                        }else if(type==20150802){
                            var phone=shareInfo.phone;
                            if(phone){
                                get817ReCoupons(phone,"weiXin","coupon","weiXin",shareInfoPyq.urlShareKey,shareInfoPyq.shareKeyNew);
                            }
                        }else if(type==20150906){
                            var phone=shareInfo.phone;
                            get(phone,"share");
                            //location.reload();
                            window.location.href=window.location.href;
                        }else if(type==2015091401){
                            location.reload();
                        }else if(type==2015091402){
                            //alert(2222)
                            location.href=shareInfo.href;
                        }else if(type==20150917){
                            //alert(2222)

                            var phone=shareInfoPyq.phone;
                            CHJCF917Coupons(phone,"weiXin","coupon","weiXin",shareInfoPyq.urlShareKey,shareInfoPyq.shareKeyNew);
                            $(".bgMen").hide();
                        }
                    }else{
                         if(shareInfo.phone && shareInfo.shareKey && shareInfo.newShareKey){
                            var phone=shareInfo.phone;
                            var shareKey=shareInfo.shareKey;
                            var newShareKey=shareInfo.newShareKey;
                            jumpPage(phone,shareKey,newShareKey);
                         }else if(shareInfo.phone){
                            var phone=shareInfo.phone;
                             cWorkTimeCoupon("",phone,"");
                         }
                    }
                   // alert(1);
                    $(".bgMen").hide();
                },
                cancel: function (res) {
                  // alert(shareInfoPyq.share_type)
                    if(shareInfoPyq.share_type && shareInfoPyq.share_type!=''){
                        var type=shareInfoPyq.share_type;
                        if(type==2015091401){
                            //影藏蒙版
                            $(".men_box").hide();
                            $(".men_box").find("img").hide();
                        }else if(type==2015091402){
                            $(".men_box").hide();
                            $(".men_box").find("img").hide();
                        }
                    }
                    $(".bgMen").hide();
                }
            })
        }else{
            wx[route]({
                title: shareInfoPyq.title, // 分享到朋友圈标题
                desc: shareInfoPyq.desc,//分享到朋友圈内容
                link: shareInfoPyq.link, // 分享到朋友圈链接
                imgUrl: shareInfoPyq.imgUrl, // 分享到朋友圈图标
                success: function (res) {
                   if(shareInfoPyq.share_type && shareInfoPyq.share_type!=''){
                        var type=shareInfoPyq.share_type;
                        //alert(type);
                      // alert(shareInfoPyq.share_phone);
                        if(type==201508){
                            var phone=shareInfoPyq.phone;
                            CHJCF817Coupons(phone,"weiXin","coupon","weiXin",shareInfoPyq.urlShareKey,shareInfoPyq.shareKeyNew);
                        }else if(type==20150802){
                            var phone=shareInfo.phone;
                            if(phone){
                                get817Coupons(phone,"weiXin","coupon","weiXin",shareInfoPyq.urlShareKey,shareInfoPyq.shareKeyNew);
                            }
                        }else if(type==20150906){
                            var phone=shareInfo.phone;
                            get(phone,"share");
                            //location.reload();
                            window.location.href=window.location.href;
                           // alert(1);
                        }else if(type==2015091401){
                            //alert(1);
                            location.reload();
                        }else if(type==2015091402){
                            //alert(2);
                            location.href=shareInfo.href;
                        }else if(type==20150917){
                            //alert(2222)
                            var phone=shareInfoPyq.phone;
                            CHJCF917Coupons(phone,"weiXin","coupon","weiXin",shareInfoPyq.urlShareKey,shareInfoPyq.shareKeyNew);
                            $(".bgMen").hide();
                        }
                    }else{
                         if(shareInfoPyq.phone && shareInfoPyq.shareKey && shareInfoPyq.newShareKey){
                            var phone=shareInfoPyq.pWhone;
                            var shareKey=shareInfoPyq.shareKey;
                            var newShareKey=shareInfoPyq.newShareKey;
                            jumpPage(phone,shareKey,newShareKey);
                         }else if(shareInfoPyq.phone){
                            var phone=shareInfoPyq.phone;
                             cWorkTimeCoupon("",phone,"");
                         }


                    }
                     $(".bgMen").hide();
                },
                cancel: function (res) {
                    //alert(res.msg)
                    if(shareInfoPyq.share_type && shareInfoPyq.share_type!=''){
                        var type=shareInfoPyq.share_type;
                        if(type==2015091401){
                            //影藏蒙版
                            $(".men_box").hide();
                            $(".men_box").find("img").hide();
                        }else if(type==2015091402){
                            //影藏蒙版
                            $(".men_box").hide();
                            $(".men_box").find("img").hide();
                        }
                    }
                    $(".bgMen").hide();
                }
            })
        }
    });
}




/*
 *  *817返场活动，与；
 *   *phone为当前手机号；
 *    *ifInApp 除去app其他情况传weiXin；
 *     *op，是检查是否领取过，还是领券；
 *      *sharedeal，是微信传weiXin，其他为空；
 *       *urlShareKey，当前url的shareKey；
 *        *shareKeyNew，新生成的shareKey；
 *         */

function get817ReCoupons(phone,ifInApp,op,sharedeal,urlShareKey,shareKeyNew,c2cShareKeyNew){
    if(sharedeal=="weiXin"){
        window.timer = true;
    }

    var code="";
    var url='/activities/api/get817EncoreCoupon';
    var reqShareKey="";
    var appAddUrl="";
    if(op=="check"){
        reqShareKey=urlShareKey;
    }else if(op=="coupon"){
        reqShareKey="";
    }

    var urlObj={"phone":phone,"op":op,"jskz_mallow":"current","key":reqShareKey};
    var data=sendPostData(url,urlObj);
    var obj = JSON.parse(data);
    if(op=="check"){
        code=obj;
    }else if(op=="coupon"){
        if(ifInApp==1){
            appAddUrl="&share_title=我请你吃邻家私房菜，只要一块钱&share_content=在北京，听说1块钱就能吃到邻家私房菜？&share_image_url=http://m.jiashuangkuaizi.com/static/images/activity/cToCFirstRevision/shareIcon.jpg&share_url=http://m.jiashuangkuaizi.com/Activity/c2CFirstRevisionHome";
        }else{
            appAddUrl="&noType=true";
        }

        if(obj.code==1){
            location.href="/Activity/cRe817Success?shareSource="+ifInApp+"&share_key="+c2cShareKeyNew+"&title=817返场第二波&jskz_mallow=new"+appAddUrl;
        }else if(obj.code==2){
            location.href="/Activity/cRe817Old?shareSource="+ifInApp+"&share_key="+c2cShareKeyNew+"&title=817返场第二波&jskz_mallow=new"+appAddUrl;
        }else if(obj.code==3){

            location.href="/Activity/cRe817Fail?shareSource="+ifInApp+"&share_key="+c2cShareKeyNew+"&title=817返场第二波&jskz_mallow=new"+appAddUrl;
        }else if(obj.code==4){
            location.href="/Activity/cxRe817End?shareSource="+ifInApp+"&share_key="+c2cShareKeyNew+"&title=817返场第二波&jskz_mallow=new"+appAddUrl;
        }else{
            jAlert(obj.msg);
        }
    }
    return code;
}


function dealScaleImg(parentBox){
    var s= $(parentBox).find("img").length;
    for(var i=0;i<s;i++){
        var imgs=$(parentBox).find("img").eq(i).attr("src");
        var img=imgs;
        var img_url = img;
        var img = new Image();
        img.src = img_url;
        if(img.complete){
            var img_width=img.width;
            var img_height=img.height;
        }else{
            img.onload = function(){
                // 打印
                var img_width=img.width;
                var img_height=img.height;
                if(img_width>0&&img_height>0 ){
                    if(img_width>img_height){
                        $(parentBox).find("img").eq(i).css({"width":"auto","height":"100%"});
                    }else if(img_width==img_height>0){
                        $(parentBox).find("img").eq(i).css({"width":"100%","height":"100%"});
                    }else{
                        $(parentBox).find("img").eq(i).css({"height":"auto","width":"100%"});
                    }
                }
            };
        }
        if(img_width>img_height){
            $(parentBox).find("img").eq(i).css({"width":"auto","height":"100%"});
        }else if(img_width==img_height>0){
            $(parentBox).find("img").eq(i).css({"width":"100%","height":"100%"});
        }else{
            $(parentBox).find("img").eq(i).css({"height":"auto","width":"100%"});
        }
    }

}

function get(phone,op){
      var share_key=getParam("share_key");
      var url='/activities/a201508/getScratchCard';
      var urlObj={"phone":phone,"op":op,"jskz_mallow":"current"};
      var data=sendPostData(url,urlObj);
      var obj = JSON.parse(data);
      if(op=='check'){
          if(obj.code==1){
              var num_available=obj.data["available"];
              var num_sum=obj.data["sum"];
          }else if(obj.code==4){
              location.href='/Activity/cScratchCardEnd?jskz_mallow=new&title=回家吃饭刮刮乐.&share_key='+share_key;
          }else{
              num_available="";
          }
      }
      return num_available+","+num_sum;
}

//生成share_key
function getShareKey(phone,type){
    var urlC='/Activity/shareNew';
    var urlObj={"share_phone":phone,'jskz_mallow':'current',"type":type};
    var data=sendPostData(urlC,urlObj);
    var obj = JSON.parse(data);
    var shareKey=obj.data.share_key;
    return shareKey;
}


/*
 * *十一活动
 * * */
function cNationalday(phone,ifInApp){
    var url='/activities/a201509/getNationalDayCoupon';
    var urlObj={"phone":phone};
    var data=sendPostData(url,urlObj);
    var obj = JSON.parse(data);
    if(obj.code==0){
        $('#box').hide();
        $('.success').show();
    }else if(obj.code==1){
        $('#box').hide();
        $('.end').show();
   }else if(obj.code==2){
        $('#box').hide();
        $('.fail').show();
   }else if(obj.code==3){
        $('#box').hide();
        $('.fail').show();
   }else{
      jAlert(obj.msg);
    }

}


/**/


function returnArr(str){
    var arr=new Array();
    arr=str.split("___");
    if(arr[0]){
        $("#"+arr[0]).show().siblings().hide();
    }
    //控制具体操作  控制所调用的函数
    //这个方法做了一些操作、然后调用回调函数  
    if(arr[1]){
        var s=arr[1];//next
        if(s!=""){
            eval(s+"()");
        }
        if(arr[0]=="procedure" || arr[0]=="static"){
            eval(s+"('"+arr[2]+"')");
        }
    }
}

/*
* 将字符串的每一位拆分出来
* 返回结果：00112
* */
function becomeNumFn(num,len){
    var num=num.toString();
    var arr=new Array();
    var lens=num.length;
    if(lens<len){
        for(var s=0;s<len-lens;s++){
            arr.push("0")
        }
    }
    for(var i=0;i<num.length;i++){
        arr.push(num[i])
    }
    return arr;
}



  //1017活动接口
function CHJCF1017Coupons(phone,ifInApp,op,media,sharedeal,urlShareKey,shareKeyNew){
       var code="";
       var url='/activities/a201510/get1017Coupon';
       var reqShareKey="";
       var appAddUrl="";
       var media=getParam("media");
       if(op=="check"){
           reqShareKey=urlShareKey;
       }else if(op=="coupon"){
           reqShareKey="";
       }
       var urlObj={"phone":phone,"op":op,"media":media,"jskz_mallow":"current","key":reqShareKey};
       var data=sendPostData(url,urlObj);
       var obj = JSON.parse(data);

        if(parseInt(obj.data["number"])%10 === 7) {
            $('.coupon-info .money').text(15);
        }

       var luckynum=obj.data["number"];
       var s=luckynum && becomeNumFn(luckynum,6);
       $('.fail_num').text(luckynum);
       if(op=="check"){
         code=obj;
       }else if(op=="coupon"){
          var str='';
          for(var i=0;i<s.length;i++){
                str+='<p>'+ s[i] + '</p>';
          }
          $('.old_num').append(str);
          if(ifInApp==1){
                appAddUrl="&noType=true";
          }else{
                appAddUrl="&noType=true";
          }
          //判断状态显示相应页面
          if(obj.code==1){
              $('#lucky').show().siblings("section").hide();
          }else if(obj.code==2){
              $('#old').show().siblings("section").hide();
          }else if(obj.code==3){
              $('#success').show().siblings("section").hide();
          }else if(obj.code==4){
              $('#fail').show().siblings("section").hide();
          }else if(obj.code==5){
              $('#end').show().siblings("section").hide();
          }else{
              jAlert(obj.msg);
          }
     }  
     return code;
}

  //1117活动接口
function CHJCF1117Coupons(phone,op){
    var url='/activities/a201511/get1117Coupon';
    var urlObj={"phone":phone,"op":op,"jskz_mallow":"current"};
    function CHJCF1117callback(data){
        var obj = JSON.parse(data);
        if(op=='check'){
            if(obj.code==0){
                $('#home').show().siblings().hide();
            }else if(obj.code==1){
                $('#home_none').show().siblings().hide();
            }
        }else if(op=='coupon'){
            //判断状态显示相应页面
            if(obj.code==2){
                $('#fail').show().siblings().hide();
            }else if(obj.code==3){
                $('#success').show().siblings().hide();
            }else if(obj.code==5){
                $('#end').show().siblings().hide();
            }else{
                jAlert(obj.msg);
            }
        }
    }
    sendPostDataAsync(url,urlObj,CHJCF1117callback);
}
