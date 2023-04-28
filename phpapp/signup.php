<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phoneNumber'];
$pass = $_POST['password'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT, ['cost' => 15]);

$role = $_POST['role'];
if ($firstName != '') {
  if ($role != "SchoolAdmin" ) {
    $query = "INSERT INTO user_details (firstName, lastName,phoneNumber,email,password,role,isActive) VALUES ('$firstName', '$lastName', '$phone','$email', '$password', '$role', 1)";
    $result = @mysqli_query($dbconnect, $query);
    if ($result) {
      $mail = new PHPMailer();
      $mail->CharSet = 'UTF-8';
      $mail->Host       = "smtp.gmail.com";
      $mail->SMTPDebug  = 0;
      $mail->SMTPAuth   = true;
      $mail->Port = 587;
      $mail->SMTPSecure = 'tls';
      $mail->IsHTML(true);
      $mail->Username   = "utamarketplace238@gmail.com";
      $mail->Password   = "ynvenlbjagtqqnef";
      $mail->From = "utamarketplace238@gmail.com";
      $mail->FromName = "utamarketplace texas";
      $mail->addAddress($email, $firstName);
      $mail->Subject = "Welcome to Marketplace";
      $mail->Body = "Hello $firstName!
      Welcome to Marketplace. Here are your login credentials.
      Email: $email
      Password: $pass
      You have signed up as a $role.
      Enjoy!";
    if(!$mail->send()){
             "Mailer Error: " . $mail->ErrorInfo;
        }else{
             "Message sent!";
        }
      echo json_encode(["sent" => 1,]);
    } else {
      echo json_encode(["sent" => 0,]);
    }
  } elseif ($role == "SchoolAdmin") {
    $query = "INSERT INTO user_details (firstName, lastName,phoneNumber,email,password,role,isActive) VALUES ('$firstName', '$lastName', '$phone','$email', '$password', '$role', 0)";
    $result = @mysqli_query($dbconnect, $query);
    if ($result) {
      $mail = new PHPMailer();
      $mail->CharSet = 'UTF-8';
      $mail->Host       = "smtp.gmail.com";
      $mail->SMTPDebug  = 0;
      $mail->SMTPAuth   = true;
      $mail->Port = 587;
      $mail->SMTPSecure = 'tls';
      $mail->Username   = "utamarketplace238@gmail.com";
      $mail->Password   = "ynvenlbjagtqqnef";
      $mail->From = "utamarketplace238t@gmail.com";
      $mail->FromName = "utamarketplace texas";
      $mail->addAddress($email, $firstName);
      $mail->Subject = "Welcome to Marketplace";
      $mail->Body = "Hello $firstName!
      Welcome to Marketplace. Here are your login credentials
      Email: $email
      Password: $pass
      You have signed up as a $role.
      Please wait for an Admin to approve your request before you login.";
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
  $activation_code = hash('sha256',mt_rand(0,1000));
  $_SESSION['email']=$_POST['email'];
  $_SESSION['password']=$_POST['password'];
  $_SESSION['activation_code']=$activation_code;
  include('activate_email.php');
}
