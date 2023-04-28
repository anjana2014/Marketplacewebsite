<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');

$query1 = "SELECT * FROM user_details where role='SchoolAdmin' and isActive = 2";
$query2 = "SELECT * FROM user_details where role='SchoolAdmin' and isActive = 1";
$query3 = "SELECT * FROM user_details where role='SchoolAdmin' and isActive = 0";
$result1 = mysqli_query($dbconnect, $query1);
$result2 = mysqli_query($dbconnect, $query2);
$result3 = mysqli_query($dbconnect, $query3);
$managerRequests = array();
$activeManagers = array();
$inActiveManagers = array();

while ($row1 = $result1->fetch_assoc()) {
    $managerRequests[] = $row1;
}


while ($row2 = $result2->fetch_assoc()) {
    $activeManagers[] = $row2;
}


while ($row3 = $result3->fetch_assoc()) {
    $inActiveManagers[] = $row3;
}


$response['managerRequests'] = $managerRequests;
$response['activeManagers'] = $activeManagers;
$response['inActiveManagers'] = $inActiveManagers;

echo json_encode($response);
exit;
