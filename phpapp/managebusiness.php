<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include('ini.php');
$rbBuilding = $_POST['rbBuilding'];
$rProdcategory=$_POST['rProdcategory'];
$rbApartment = $_POST['rbApartment'];
$naBuilding = $_POST['naBuilding'];
$naApartment = $_POST['naApartment'];
$reqType = $_POST['reqType'];
$daBuilding = $_POST['daBuilding'];
$daApartment = $_POST['daApartment'];
$daApartment = (int)$daApartment;
$dbBuilding = $_POST['dbBuilding'];
$rnbBuilding = $_POST['rnbBuilding'];
$rnbNewBuilding = $_POST['rnbNewBuilding'];
$rnaBuilding = $_POST['rnaBuilding'];
$rnaApartment = $_POST['rnaApartment'];
$rnaApartment = (int)$rnaApartment;
$rnaNewApartment = $_POST['rnaNewApartment'];
$rnaNewApartment = (int)$rnaNewApartment;
$rPrice = $_POST['rPrice'];
$rPrice = (int)$rPrice ;
$userId = $_POST['addedby'];
$userId = (int)$userId;

if ($reqType == 'registerBuilding') {
    if ($rbApartment != '') {
        $query = "INSERT INTO Business (BusinessName) VALUES ('$rbBuilding')";
        $result = @mysqli_query($dbconnect, $query);
        if ($result) {
            $response['building'] = 'success';
        } else {
            $response['building'] = 'fail';
        }
        $rbApartmentArr = explode(",", $rbApartment);
        foreach ($rbApartmentArr as $b) {
            $query1 = "INSERT INTO products (ProductName, BusinessName,ProductCategory,price,userId) VALUES ('$b','$rbBuilding','$rProdcategory',$rPrice,'$userId')";
            $result1 = @mysqli_query($dbconnect, $query1) or trigger_error("Query Failed! SQL: $query1 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
            if ($result1) {
                $response[$b] = 'success';
            } else {
                $response[$b] = $result1;
            }
        }
        echo json_encode($response);
    }
} else if ($reqType == 'addNewApt') {
    if ($naApartment != '') {
        $naApartmentArr = explode(",", $naApartment);
        foreach ($naApartmentArr as $b) {
            $query2 = "INSERT INTO products (ProductName, BusinessName,ProductCategory,price,userId) VALUES ('$b','$rbBuilding','$naprodcategory',$naprice,'$userId')";
            $result2 = @mysqli_query($dbconnect, $query2);
            if ($result2) {
                $response[$b] = 'Added successfully';
            } else {
                $response[$b] = "already exists. please try another one.";
            }
        }
        echo json_encode($response);
    }
} else if ($reqType == 'delApt') {
    $query3 = "DELETE FROM products where ProductName= '$daApartment'";
    $result3 = @mysqli_query($dbconnect, $query3) or trigger_error("Query Failed! SQL: $query3 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
    if ($result3) {
        $response = 'success';
    } else {
        $response = $result3;
    }
    echo json_encode($response);
} else if ($reqType == 'delBuilding') {
    $query8 = "SELECT * from Business where BusinessName = '$dbBuilding'";
    $result8 =  @mysqli_query($dbconnect, $query8);
    $apartments = array();
    while ($row = $result8->fetch_assoc()) {
        $apartments[] = $row;
    }
    if (count($apartments) == 0) {
        $query4 = "DELETE FROM Business where BusinessName = '$dbBuilding'";
        $result4 = @mysqli_query($dbconnect, $query4) or trigger_error("Query Failed! SQL: $query4 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
        if ($result4) {
            $response = 'success';
        } else {
            $response = $result4;
        }
    } else {
        $response = 'fail';
    }

    echo json_encode($response);
} else if ($reqType == "renameBuilding") {
    $query6 = "UPDATE Business SET BusinessName = '$rnbNewBuilding' WHERE BusinessName = '$rnbBuilding'";
    $result6 = @mysqli_query($dbconnect, $query6) or trigger_error("Query Failed! SQL: $query6 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);

    if ($result6) {
        $query5 = "UPDATE Business SET BusinessName = '$rnbNewBuilding' WHERE BusinessName = '$rnbBuilding'";
        $result5 = @mysqli_query($dbconnect, $query5) or trigger_error("Query Failed! SQL: $query5 - Error: " . mysqli_error($dbconnect), E_USER_ERROR);
        if ($result5) {
            $response = 'success';
        } else {
            $response = $result5;
        }
    } else {
        $response = $result6;
    }
    echo json_encode($response);
} 
