<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
include('ini.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
$_POST = json_decode($rest_json, true);
$email = $_POST['email'];
$isApprove = $_POST['isApprove'];

if ($email != '') {
    if ($isApprove) {
        $query = "UPDATE user_details set isActive = 1 where email= '$email'";
    } else {
        $query = "UPDATE user_details set isActive = 0 where email= '$email'";
    }

    $result = @mysqli_query($dbconnect, $query);
    if ($result) {
        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';
        $mail->SMTPDebug = 1;
        $mail->Host       = "smtp.gmail.com";
        $mail->SMTPDebug  = 0;
        $mail->SMTPAuth   = true;
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->IsHTML(true);
        $mail->Username   = "anjanakillamsetty@gmail.com";
        $mail->Password   = "Krishna@22";
        $mail->From = "anjanakillamsetty@gmail.com";
        $mail->FromName = "Marketplace ";
        $mail->addAddress($email);

        if ($isApprove) {
            $mail->Subject = "Your account is active";
            $mail->Body = "Congratulations,
            Your account with $email is now active. You can now login.<br/>";
        } else {
            $mail->Subject = "Your account is suspended";
            $mail->Body = "Hello,
            Unfortunately, your account with $email is set to inactive by an admin.
            You can no longer use your account to login. You may contact an admin if you think your account is suspended by mistake";
        }
        if(!$mail->send()){
             "Mailer Error: " . $mail->ErrorInfo;
        }else{
             "Message sent!";
        }
        echo json_encode(["sent" => 1,]);
    } else {
        echo json_encode(["sent" => 0,]);
    }
}
