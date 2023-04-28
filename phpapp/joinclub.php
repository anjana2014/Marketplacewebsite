<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$clubName = $_POST['joinClub'];
$userId = $_POST['createdBy'];
$userId = (int)$userId;
if ($clubName != '') {
   $query = "INSERT INTO `clubsmembersdetails`(`clubName`, `userId`, `isJoined`, `reasontoleave`) VALUES ('$clubName','$userId',1,'')";
    $result = @mysqli_query($dbconnect, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
    if ($result) {
        $response = "success";
    } else {
        $response = $result;
    }
    echo $response;
}
