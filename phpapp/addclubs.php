<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
$newclub = $_POST['newclub'];
$newdesc =$_POST['newdesc'];
if ($newclub != '') 
{
    $query = "INSERT INTO `clubs`( `clubName`, `clubDesc`) VALUES ('$newclub','$newdesc')";
    $result = @mysqli_query($dbconnect, $query);
    if ($result) {
        $response = "success";
    } else {
        $response = "fail";
    }

    echo $response;
    exit;
}