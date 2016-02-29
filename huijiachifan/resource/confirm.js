//alert 调用
/*
myconfirm("","","sad",1,"");
*/
//comfirm 调用
/* myconfirm(
    function(){
        //否
        $(".alert_box").hide();
        $(".show_info").hide();
        $(".bg_men").hide().css("z-index",2);
        $(".free_sum").removeClass("free_sum2");
    },
    function(){
        //是
        $(".alert_box").hide();
        $(".show_info").hide();
        $(".bg_men").hide().css("z-index",2);
        $(".free_sum").removeClass("free_sum2");
        //订购成功，“订购成功”页面
        $("body").css("background","#fff");
        addFoodFn("remove");
    },msg,"",""
);

//href 点击确认按钮跳转至指定页面

*/

 function myconfirm(calback,callback2,msg,type,href){
        var str='';
        str+='<div class="bg_men" style="display: none;"></div>';
        str+='<div class="alert_box">';
        str+='<div class="title">提示</div>';
        str+='<div class="text"></div>';
        str+='<div class="button">';
        str+='<button type="button" class="no">取消</button>';
        str+='<button type="button" class="yes">确认</button>';
        str+='</div>';
        str+='<div class="button_alert">';
        str+='<button type="button" class="confirm_btn">确认</button>';
        str+='</div>';
        str+='</div>';
         $(".wrapper").append(str);
         $("html").height("100%");
         $("body").height("100%");
         $("body").css("overflow","hidden");
         $(".wrapper").height("100%");
         $(".alert_box").show();
         $(".alert_box").show();
         $(".bg_men").show().css("z-index",5);
        if(type==1){
            //alert
            $(".alert_box").show();
            $(".bg_men").show().css("z-index",5);
            $(".button").hide();
            $(".button_alert").show();
            $(".button_alert .confirm_btn").show();
        }else{
            $(".button").show();
            $(".button_alert").hide();
        }
        $(".text").text(msg);
        //给确定按钮邦定calback事件
         $(".wrapper .no").unbind("click").bind("click",function(){
             if(typeof calback=='function'){
                 $("html").height("auto");
                 $("body").height("auto");
                 $("body").css("overflow","");
                 $(".wrapper").height("auto");
                 calback();
             }
         })
         $(".wrapper .yes").unbind("click").bind("click",function(){
             if(typeof calback=='function'){
                 $("html").height("auto");
                 $("body").height("auto");
                 $("body").css("overflow","");
                 $(".wrapper").height("auto");
                 callback2();

             }
         })

        if(href!="" && href!=undefined){
            $(".wrapper .confirm_btn").unbind("click").bind("click",function(){
                $(".alert_box").remove();
                $(".bg_men").remove().css("z-index",2);
                $("html").height("auto");
                $("body").height("auto");
                $("body").css("overflow","");
                $(".wrapper").height("auto");
                if(href!="" || href!=undefined){
                    location.href=href;
                }else{
                }
            })
        }else{
            $(".wrapper").on("click",".confirm_btn",function(str){
                $("html").height("auto");
                $("body").height("auto");
                $("body").css("overflow","");
                $(".wrapper").height("auto");
                $(".alert_box").remove();
                $(".bg_men").remove().css("z-index",2);
            })
        }

}