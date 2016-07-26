<?php

    if(isset($_GET["url"]))
       {
           $get = urlencode($_GET["url"]);
           
        
        $url = "https://validator.w3.org/check?uri=".$get."&output=json";
        
        $url2 = "https://validator.w3.org/nu/?doc=http://www.google.com&out=json";
        
        
         // Initializing curl
        $curl = curl_init( $url );

        // Configuring curl options
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array('Content-type: application/json') ,
        );

        // Setting curl options
        curl_setopt_array( $curl, $options );

        // Getting results
        $result =  curl_exec($curl); // Getting jSON result string
        curl_close($curl);
        
        //$new = htmlentities($result);
        $string = substr($result , strpos($result , "{"));
        
        
        $replace = json_encode(str_replace('"\"', " ", $string));
        
        $htmlfreecontent = strip_tags($replace);
        
        $json = json_encode($htmlfreecontent);
            
       print_r($json);     
            
            
       }
?>