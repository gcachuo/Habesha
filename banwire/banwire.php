<?php
/**
 * Created by PhpStorm.
 * User: Cachu
 * Date: 06/10/2017
 * Time: 04:32 PM
 */

$_POST += $_POST['post'];
unset($_POST['post']);
echo json_encode($_POST['fn']());

function donacion()
{
    $params = [
        'CARD_NUM' => '5134422031476272',
        'CARD_OWN' => 'Roberto I Ramirez N',
        'CARD_EXP_DT' => '1219',
        'CARD_CVV' => '162',
        'CARD_AVS_ADDR' => 'Calle 118',
        'CARD_AVS_ZIPCODE' => '37000',
        'CARD_TYPE' => 'mastercard',
        'ORD_CURR_CD' => 'mxn',
        'ORD_ID' => '1',
        'ORD_AMT' => '100',
        'ORD_CONCEPT' => 'concepto prueba',
        'user' => 'habesha',
        'EBT_PREVCUST' => 'n',
        'EBT_DEVICEPRINT' => $_POST['EBT_DEVICEPRINT'],
        'CUST_IP' => '189.212.142.48',
        'ebWEBSITE' => 'www.proyectohabesha.org',
        'PROD_DEL_CD' => 'DIG',
        'PAY_TYPE' => 'C',
        'CUST_USER_ID' => '1',
        'CUST_PHONE' => '0000000000',
        'CUST_EMAIL' => 'gcachu.o@gmail.com',
        'ITEM_QTY[1]' => '1',
        'ITEM_CST_AMT[1]' => '100',
        'ITEM_AMT[1]' => '100',
        'ITEM_DESC[1]' => 'prueba',
    ];
    $params = json_encode($params);
    $result = url_request('PRIVATE', "https://test.banwire.com/api/1/payment/direct", 'POST', $params);
    die($result->message);
}

function url_request($type, $path, $HTTPMethod, $JSONPayload, $authHeader = '')
{
    $ch = curl_init();
    if ($type == 'PUBLIC') {
        curl_setopt($ch, CURLOPT_URL, $path);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    } else if ($type == 'PRIVATE') {
        if ($HTTPMethod == 'GET' or $HTTPMethod == 'DELETE') {
            curl_setopt($ch, CURLOPT_URL, $path);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $HTTPMethod);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Authorization: ' . $authHeader,
                'Content-Type: application/json'));
        } else if ($HTTPMethod == 'POST') {
            curl_setopt($ch, CURLOPT_URL, $path);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $HTTPMethod);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $JSONPayload);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: ' . $authHeader, 'Content-Type: application/json'));
        } else {
            echo "Incorrect HTTP method";
        }
    }
    $result = curl_exec($ch);
    if (FALSE === $result)
        die(curl_error($ch) . " " . curl_errno($ch));
    curl_close($ch);

    return json_decode($result);
}