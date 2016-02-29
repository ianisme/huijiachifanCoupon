<?php
header("Content-type: text/html; charset=utf-8"); 
/**
 * 发送post请求
 * @param string $url 请求地址
 * @param array $post_data post键值对数据
 * @return string
 */
function _sendPost($url, $post_data) {

  $postdata = http_build_query($post_data);
  $options = array(
    'http' => array(
      'method' => 'POST',
      'header' => 'Content-type:application/x-www-form-urlencoded',
      'content' => $postdata,
      'timeout' => 15 * 60 // 超时时间（单位:s）
    )
  );
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);

     $resultJson = json_decode($result, true);
  if ($resultJson['code'] == 0) {
        echo "手机号：".$post_data['phone']."领取了红包".$resultJson['data']['coupon_num']."元"."</br>";
   } else if ($resultJson['code'] == 113) {
        echo "已经领取过了"."</br>";
   } else if ($resultJson['code'] == 101) {
         echo "领取超过5次了,明天再来吧！"."</br>";
   }else{
        echo "参数错误或者服务器繁忙"."</br>";
   }

  return $result;
}

/**
 * 整理key
 *
 *
 * @param string $url
 * @return string
 *
 */
function _getTheReadKey($url){
    if (!$url) {
        return;
    }
    $temp_str_1 = explode("share_key=", $url);
    $temp_str_2 = explode("&", $temp_str_1[1]);
    $current_red_code = $temp_str_2[0];
    if($current_red_code){
        return $current_red_code;
    }else{
        return ;
    }
}
/**
 * 测试用主程序
 */
function main(){
    $current_url = "http://m.jiashuangkuaizi.com/Activity/shareResult";
    $phone = $_POST['phone'];
    $temp_str_1 = explode(";", $phone);

    $phoneRandom = "158115".generate_code(5);

    $red_paper_share = "http://m.jiashuangkuaizi.com/Activity/RedPaperShare?share_phone=".$phoneRandom."&jskz_mallow=current&order_id=";

    $result = file_get_contents($red_paper_share);

    $resultJson = json_decode($result, true);
    foreach ($temp_str_1 as $phone) {
        $post_data = array(
            'share_key' => $resultJson["data"]["share_key"],
            'phone' => $phone
        );
        _sendPost($current_url, $post_data);
    }
}

function generate_code($length) {
    return rand(pow(10,($length-1)), pow(10,$length)-1);
}

main();