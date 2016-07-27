<?php


$url = 'http://99webtools.com/inc/links.php?u=http%3A%2F%2Fgoogle.com';


$exec = file_get_contents($url);    



    print_r($exec);
    



?>