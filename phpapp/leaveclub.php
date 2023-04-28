<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$userId = $_POST['userId'];
$userId = (int)$userId;
$clubName=$_POST['leaveClub'];
$reasontoleave=$_POST['rleaveclub'];


$query = "SELECT * FROM `clubsmembersdetails` where userId=$userId and isJoined=1";
$result = @mysqli_query($dbconnect, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
$clubs = array();


while ($row = $result->fetch_assoc()) {
    $clubs[] = $row;
}

if (count($clubs) != 0) {
    $query1 = "UPDATE `clubsmembersdetails` SET `isJoined`=0,`reasontoleave`= '$reasontoleave' WHERE userId=$userId";
    $result1 = @mysqli_query($dbconnect, $query1) or trigger_error("Query Failed! SQL: $query1 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);

    if ($result1) {
        $response = 'success';
    } else {
        $response = $result1;
    }
} else {
    $response = "you are not part of any clubs";
}
echo $response;
