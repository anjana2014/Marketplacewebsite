<?php

	if(!isset($_SESSION['email']))
		header('location:signup.php');

	if(!isset($_SESSION)){ 
	  session_start(); 
	} 

	require 'phpmailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;                             

	$mail->isSMTP();                                      
	$mail->Host = 'smtp.gmail.com';  
	$mail->SMTPAuth = true;                               
	$mail->Username = 'utamarketplace238@gmail.com';                
	$mail->Password = 'ynvenlbjagtqqnef';                           
	$mail->SMTPSecure = 'tls';                            
	$mail->Port = 587;                                    
	$to=$_SESSION['email'];
	$mail->setFrom('utamarketplace238@gmail.com', 'Modern Marketing','0');
	$mail->addAddress($to);     

	$mail->isHTML(true);                                  

	$mail->Subject = 'Account Confirmation Message';
	$mail->Body = "	 Thank You   for signing up!
	Your account has been created, you can login with the following credentials after you have activated <br> your account by pressing the url below.
	 
	------------------------<br><br><br><br>
	Username:" .$_SESSION['email']."<br>
	Password:" .$_SESSION['password']."<br><br><br><br>
	------------------------
	 
	Please click this link to activate your account:----------------------<br><br><br><br>
	http://localhost/Work/register.php?email=".$_SESSION['email']."&activation_code=".$_SESSION['activation_code']."  "; 

	if(!$mail->send()){
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	}else{
			echo '<script type="text/javascript">';
            echo 'setTimeout(function () { sweetAlert("Success","<b> Thank you  you have successfully registered.A confirmation link has been sent to your email address '. $email .' Please activate your account by clicking the activation link!!!...</b>","success");';
            echo '}, 500);</script>';
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@7.28.11/dist/sweetalert2.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sweetalert2@7.28.11/dist/sweetalert2.min.js"></script>
</head>
<body>

</body>
</html>