<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
include('ini.php');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$productName = $_POST['buycartproduct'];
$userId = $_POST['addedBy'];
$userId = (int)$userId;
$sId=$_POST['sId'];
$sId=(int)$sId;
if ($productName != '') {
    $query = "INSERT INTO `productsbuyed`( `productName`, `userId`) VALUES ('$productName',$userId)";
     $result = @mysqli_query($dbconnect, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
     if ($result) {
        $query1=" DELETE FROM `shoppingcart` WHERE sId = $sId ";
        $result1 = @mysqli_query($dbconnect, $query1) or trigger_error("Query Failed! SQL: $query1 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
        if($result1){
            $response = "success";
        }
        else{
            $response = $result1;
        }
         
     } else {
         $response = $result;
     }
     echo $response;
 }
