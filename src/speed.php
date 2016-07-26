<?php
    
if(isset($_GET["url"]))
{
    $get = urlencode($_GET["url"]);
    //$url = 'https://www.googleapis.com/pagespeedonline/v3beta1/mobileReady?url='.$get;    
    
    $url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url='.$get;

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($curl);
    curl_close($curl);
    $array = json_decode($result, true);
    
    $speed = $array["ruleGroups"]["SPEED"];
    
    $json = json_encode($speed, true);
        
    
    
    print_r($json);
}



?>