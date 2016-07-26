<?php

    if(isset($_GET["url"]))
       {
           $get = urlencode($_GET["url"]);
           
        
        
        
    
        $url = "https://validator.w3.org/check?uri=".$get."&output=json";
        
        $url2 = "https://validator.w3.org/nu/?showsource=false&doc=http://www.google.com&out=json";
        
         // Initializing curl
        $curl = curl_init( $url );

        // Configuring curl options
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array('Content-type: application/json') ,
            CURLOPT_HTTPHEADER, array('Accept: application/json'),
            
        );

        //curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));

        
        
        // Setting curl options
        curl_setopt_array( $curl, $options );

        // Getting results
        $result =  curl_exec($curl); // Getting jSON result string
        curl_close($curl);
        
        //show html entities
        $result_html = htmlentities($result);
        //remove backslashes
        $result_noSlashes = stripcslashes(stripcslashes($result_html));
        //remove triple spaces
        $noTriple = str_replace("   ", " ", $result_noSlashes);
        
        //no headers
        $noHeaders = substr($noTriple , strpos($noTriple , "{"));
        
        //$json = preg_replace('/(\\\n)+/m', '\\\n', $result_html);

        
            echo("<pre>");
       
            print_r($noHeaders);     
            echo("</pre>");
            
       }
?>