<?php

    if(isset($_GET["url"]))
       {
           $get = urlencode($_GET["url"]);
           
        
        $url = "https://validator.w3.org/check?uri=".$get."&output=json";
        
        
        
         // Initializing curl
        $ch = curl_init( $url );

        // Configuring curl options
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array('Content-type: application/json') ,
        );

    // Setting curl options
    curl_setopt_array( $ch, $options );

    // Getting results
    $result =  curl_exec($ch); // Getting jSON result string
      
            
       var_dump($result);     
            
            
       }
?>