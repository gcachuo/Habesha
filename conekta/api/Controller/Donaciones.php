<?php


namespace Controller;

use Helper\Conekta;

class Donaciones
{
    function pagar()
    {
        ['customer' => $customer, 'payment' => $payment] = $_POST;
        ['name' => $name, 'phone' => $phone, 'email' => $email] = $customer;
        $payment['amount'] = (float)$payment['amount'] * 100;
        ['token_id' => $token_id, 'type' => $type, 'amount' => $amount, 'interval' => $interval] = $payment;

        $Conekta = new Conekta();
        if ($interval == 'subscription') {
            $payment_method = 'card';
            ['status' => $payment_status] = $Conekta->createSubscription($token_id, $customer, $payment['amount']);
            return compact('payment_status', 'payment_method');
        } else {
            ['payment_status' => $payment_status, 'payment_method' => $payment_method] = $Conekta->createOrder(
                $customer,
                [
                    [
                        'name' => 'Donacion',
                        'unit_price' => $amount,
                        'quantity' => 1
                    ]
                ],
                [
                    [
                        'amount' => $amount,
                        'payment_method' => $payment
                    ]
                ]);
            return compact('payment_status', 'payment_method');
        }
    }
}