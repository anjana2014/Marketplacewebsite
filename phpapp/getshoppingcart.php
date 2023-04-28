<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');
$query1 = "SELECT * FROM shoppingcart b join products p where b.ProductName= p.ProductName";
$result1 = mysqli_query($dbconnect, $query1);
$clubs = array();
while ($row1 = $result1->fetch_assoc()) {
    $clubs[] = $row1;
}


$response = $clubs;


echo json_encode($response);
exit;