<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
$email = $_POST['email'];
$password = $_POST['password'];
if ($email != '') {
  $query = "SELECT * from user_details where email= '$email' and isActive = 1";
  $result = @mysqli_query($dbconnect, $query);
  $userDetails = array();
  $hashedPass = '';
  while ($row = $result->fetch_assoc()) {
    $userDetails[] = $row;
    $hashedPass = $row['password'];
  }
  if ($result) {
    if (password_verify($password, $hashedPass)) {
      echo json_encode($userDetails);
    } else {
      echo json_encode('wrong password');
    }
  } else {
    echo json_encode(["sent" => 0,]);
  }
}
