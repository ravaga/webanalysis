<?php

    if(isset($_GET["url"]))
       {
           $get = urlencode($_GET["url"]);
           
        
        
        
    
        $url = "https://validator.w3.org/check?uri=".$get."&output=json";
        
        $url2 = "https://validator.w3.org/nu/?doc=".$get."&out=json";
        
         // Initializing curl
        $curl = curl_init( $url2 );

        // Configuring curl options
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array("Content-type: application/x-www-form-urlencoded;charset=UTF-8") ,
            CURLOPT_HTTPHEADER, array("Accept: text/html,application/xhtml+xml,application/json,application/xml;q=0.9,image/webp,*/*;q=0.8"),
            
        );
        // Setting curl options
        curl_setopt_array( $curl, $options );

        // Getting results
        $result =  curl_exec($curl); // Getting jSON result string
        curl_close($curl);
        
        //show html entities
        //$result_html = htmlentities($result);
        
        //str_replace('\ ', '', $result_html);
        
        print_r($result);
        
 
        
       }
?>