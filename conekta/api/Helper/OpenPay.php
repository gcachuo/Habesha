<?php


namespace Helper;


use HTTPStatusCodes;
use JsonResponse;

class OpenPay
{
    function pagar()
    {
        $source_id = $_POST['source_id'];
        $amount = $_POST['amount'];
        $device_session_id = $_POST['device_session_id'];
        $customer = [
            'name' => $_POST['customer']['name'],
            'last_name' => $_POST['customer']['last_name'],
            'phone_number' => $_POST['customer']['phone_number'],
            'email' => $_POST['customer']['email']
        ];
        $order_id = rand(10000, 99999);
        $curl = curl_init();

        $payload = json_encode([
            'source_id' => $source_id,
            'method' => 'card',
            'amount' => $amount ?: 100,
            'currency' => 'MXN',
            'description' => 'Donación',
            'order_id' => "oid-$order_id",
            'device_session_id' => $device_session_id,
            'customer' => $customer
        ]);

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://sandbox-api.openpay.mx/v1/m8qrxeoq1gdu6if4516v/charges",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 500,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_USERPWD => 'sk_c9b75ece52ca4defb86fac5979047837',
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => array(
                "Content-type: application/json"
            ),
        ));

        $response = json_decode(curl_exec($curl), true);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            JsonResponse::sendResponse(['message' => $err], HTTPStatusCodes::InternalServerError);
        } else {
            if (!empty($response['error_code'])) {
                JsonResponse::sendResponse(['message' => $response['description']]);
            }
            return $response;
        }
    }
}