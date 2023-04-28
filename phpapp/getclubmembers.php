<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
// $userId = $_POST['userId'];
 //$userId = (int)$userId;
$query = "SELECT * from  clubsmembersdetails c join user_details u where c.userId=u.userId ";
$result = @mysqli_query($dbconnect, $query);
$gardens = array();
while ($row = $result->fetch_assoc()) {
    $gardens[] = $row;
}
$response = $gardens;
echo json_encode($response);
exit;
