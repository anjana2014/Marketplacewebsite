<?php
include('PHPMailer.php');
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->CharSet = 'UTF-8';

$mail->Host       = "smtp.gmail.com"; // SMTP server example
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Port       = 25;                    // set the SMTP port for the GMAIL server
$mail->Username   = "immigrantservicess@gmail.com"; // SMTP account username example
$mail->Password   = "wdmproject";



$to = 'yaswanthtondepu@gmail.com';
$message = 'hai';
mail($to, 'My Subject', $message);
