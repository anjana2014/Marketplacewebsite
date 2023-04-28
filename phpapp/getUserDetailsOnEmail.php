<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
$email = $_POST['email'];
$query = "SELECT userId,firstName,lastName from user_details where email = '$email'";
$result = @mysqli_query($dbconnect, $query);
$users = array();
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}
$response = $users;
echo json_encode($response);
exit;
