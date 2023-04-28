<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');

$query = "SELECT * FROM roles where roleName!='Admin'";
$result = mysqli_query($dbconnect, $query);
$roles = array();
while ($row = $result->fetch_assoc()) {
    $roles[] = $row;
}
$response = $roles;


echo json_encode($response);
exit;
