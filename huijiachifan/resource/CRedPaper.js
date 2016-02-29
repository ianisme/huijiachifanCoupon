function main_recall_redPaper(ret, p1, p2) {
    if(ret==1){
        location.href="jskz_c_client://action_name=ValidCodeLogin&action_type=jump&jskz_mallow=current";
    }else{
        //doRedPaper()
        if(p1 && p1.length>11){
            doRedPaper()
        }
    }
    function doRedPaper(){
        /*
         * app内版本大于等于2.1.0
         * 规则为点击按钮后。
         * 函数内容为：生成share_key
         *
         * */
        var orderId= getParam('order_id');
        var isInsert=getParam("isInsert");
        var value = utf8to16(base64decode(p1));
        var newArr=new Array();
        newArr = value.split("#");
        newArr = newArr[0].split("_");
        var phone=newArr[1];
        var urlC='/Activity/RedPaperShare';
        var urlObj={"share_phone":phone,'jskz_mallow':'current','order_id':orderId};
        var data=sendPostData(urlC,urlObj);
        var obj = JSON.parse(data);
        if((obj != null && obj != 'undefined') && obj.code == 101){// 该APP版本不支持orderId
            alert('升级版本之后才可以领红包哦~');
            return;
        }
        if(obj.code==0){
            var shareKey=obj.data.share_key;
            var url=urlencode(cRedPackets_share_url+'?share_key='+shareKey+'&isInsert=true');
            var imgUrl=urlencode(cRedPackets_share_imgUrl);
            var title=cRedPackets_share_title;
            var content=cRedPackets_share_desc;
            var urlCur='inner://alertshare?url='+url+'&title='+title+'&content='+content+'&image_url='+imgUrl;
            location.href=urlCur;
        }else{
            alert(obj.msg);
        }
    }
}
$(function(){
    var shareKey=getParam("share_key");
    var link=cRedPackets_share_url+'?share_key='+shareKey+"&isInsert=true#paperBox";
    var shareInfo = {
        title: cRedPackets_share_title,
        desc: cRedPackets_share_desc,
        link: link,
        imgUrl: cRedPackets_share_imgUrl
    }
    var shareInfoPyq = {
        title:cRedPackets_share_desc,
        desc:cRedPackets_share_desc,
        link:link,
        imgUrl:cRedPackets_share_imgUrl
    }
    weiXinShare(shareInfo, shareInfoPyq);

    /*
    * /Activity/CRedPaper?jskz_mallow=new&  app内
    *
    * */
        var shareKey= getParam('share_key');
        var isInsert=getParam("isInsert");
        var ifDown=getParam("ifDown");
        var version=getParam("version");
    //判断是否在APP内，true:代表在APP外，在微信里面；false:代表在APP内
        if(isInsert=="true"){
          /*  $(".redPaper").val("领红包");*/
             //下载APP
            $(".down").on("click",function(){
                downApp();
            })
            //领取红包按钮监听处理器
            $(".redPaper").on("click",function(e){
                e=e || window.event;
                e.stopPropagation();
                 //获取手机号，如果取出的手机号为空，则表示分享当前链接；反之，则是领取红包
                   var phone=$("#paperBox").find(".phone").val();
                    if(phone==''){
                        alert("手机号不能为空");
                    }else if((/^1[3|4|5|7|8|][0-9]{9}$/).test(phone)){
                       //手机号通过验证，转变share_key ，放到url中，分享
                       //先获取优惠券，再转变share_key
                     /*
                       手机号通过验证后，弹出蒙层,生成NewShareKey  ，shareKey替换分享出去，成功之后，去领券，传去的shareKey，为 之前Url的shareKey
                      */
                        var url='/Activity/shareResult';
                        var urlObj={'share_key':shareKey,"phone":phone};
                        var data=sendPostData(url,urlObj);
                        var obj = JSON.parse(data);
                        if(obj.code==0){
                            var coupons=obj.data.coupon_num;
                            //领取成功
                            location.href="/Activity/cRedPaperNewSuccess?share_key="+shareKey+"&phone="+phone+"&coupons="+coupons;
                        }else if(obj.code==113){
                            //已领取
                            location.href="/Activity/cRedPaperNewStatic?static=fail&share_key="+shareKey+"&phone="+phone;
                        }else if(obj.code==101){
                            //该用户当天领取次数已超过五次
                            //location.href="/Activity/cRedPaperNewStatic?static=moreFive&share_key="+shareKey+"&isInsert=true&ifDown=true&phone="+phone;
                            location.href="/Activity/cRedPaperNewEnd?share_key="+shareKey+"&phone="+phone;
                        }else if(obj.code==102){
                            //活动已结束
                            location.href="/Activity/cRedPaperNewEnd?share_key="+shareKey+"&phone="+phone;
                        }else{
                            alert(obj.msg);
                        }

                   }else{
                       alert("手机号输入错误");
                   }
            })

        }else{
            //在APP内给超链接加上地址，并且隐藏掉手机号的输入框
            $(".redPaper").on("click",function(e) {
                e = e || window.event;
                e.stopPropagation();
                location.href = "jskz_c_client://action_name=GetToken&action_type=query&recall=main_recall_redPaper&jskz_mallow=current";
            })
        }


})