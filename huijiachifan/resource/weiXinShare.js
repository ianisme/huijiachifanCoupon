document.write("<script src='/static/js/common/jweixin-1.0.0.js'><\/script>");
function weiXinShare(shareInfo,shareInfoPyq){
    var curUrl = urlencode(location.href.split('#')[0]);
    var url = '/Activity/getWXSignature?url=' + curUrl;
    var data = sendGet(url);
    var obj = JSON.parse(data);
    if (obj.code == 0) {
        shareConfig(obj.data);
        wx.ready(function () {
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            shareCheck();
            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口   user=key
            shareExceptPYQ(shareInfo,shareInfoPyq)
        });
        shareWxError();
    } else {
        //alert(obj.msg);
    }
}

