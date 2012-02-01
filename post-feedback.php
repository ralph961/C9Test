<?php 
$name = $_REQUEST['name'];
if(empty($name)) {
	$name = 'anonymous';	
}

$email = $_REQUEST['email'];
if(empty($email)) {
	$email = 'unkown email';	
}

$body = $_REQUEST['body'];
if(empty($body)) {
	header('HTTP/1.0 500 Feedback missing');
}else {
	$careEmail = 'care@burgerbiteslb.com';
	mail ( $careEmail, 'Feedback from '.$name.' ('.$email.')', $body ); 
}

?>