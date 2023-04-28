<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
$naBuilding = $_POST['naBuilding'];
$naApartment = $_POST['naApartment'];
$userId = $_POST['addedby'];
$userId = (int)$userId;
$naprodcategory =$_POST['naprodcategory'];
$naprice = $_POST['naprice'];
$rPrice = (int)$naprice ;
if ($naApartment != '') {
        $query2 = "INSERT INTO products (ProductName, BusinessName,ProductCategory,price,userId) VALUES ('$naApartment','$naBuilding','$naprodcategory',$naprice,'$userId')";
            $result2 = @mysqli_query($dbconnect, $query2);
            if ($result2) {
                $response = 'Added successfully';
            } else {
                $response = "already exists. please try another one.";
            }
        
        echo json_encode($response);
    }


