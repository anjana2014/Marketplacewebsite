<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phoneNumber'];
$message = $_POST['query'];
if ($firstName != '') {
    $query = "INSERT INTO contact_us (firstName, lastName,phoneNumber,email,comment) VALUES ('$firstName', '$lastName', '$phone','$email', '$message')";
    $result = @mysqli_query($dbconnect, $query);
    if ($result) {
        $mail = new PHPMailer();
        // $mail->IsSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host       = "smtp.gmail.com";
        $mail->SMTPDebug  = 0;
        $mail->Port = 587; // TLS only
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth   = true;
        $mail->Username   = "utamarketplace238@gmail.com";
        $mail->Password   = "Abcdefg1234";
        $mail->IsHTML(true);
        $mail->From = "utamarketplace238@gmail.com";
        $mail->FromName = "utamarketplace texas";
        $mail->addAddress($email, $firstName);
        $mail->Subject = "We have received your message";
        $mail->Body = "Hello $firstName! <br/>
        We have received your message. We will get back to you soon <br/>";
        if(!$mail->send()){
            echo "Mailer Error: " . $mail->ErrorInfo;
        }else{
            echo "Message sent!";
        }
        echo json_encode(["sent" => 1,]);
    } else {
        echo json_encode(["sent" => 0,]);
    }
}
