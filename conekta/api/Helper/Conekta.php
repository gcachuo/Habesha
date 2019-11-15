<?php


namespace Helper;


use Conekta\Customer;
use Conekta\Handler;
use Conekta\Order;
use Conekta\ParameterValidationError;
use Conekta\Plan;
use Conekta\ProcessingError;
use Conekta\ResourceNotFoundError;
use Exception;
use HTTPStatusCodes;
use JsonResponse;

class Conekta
{
    public function __construct()
    {
        \Conekta\Conekta::setApiKey("key_JtPYSvaUjsWCq9swaA1aQw");
    }

    /**
     * @param $customer_info
     * @param $line_items
     * @param $charges
     * @param string $currency
     * @return mixed
     */
    function createOrder($customer_info, $line_items, $charges, $currency = 'MXN')
    {
        try {
            $amount = 0;
            foreach ($line_items as $line_item) {
                $amount += $line_item['unit_price'] ?: 0 * $line_item['quantity'] ?: 0;
            }
            $order = compact('currency', 'amount', 'customer_info', 'line_items', 'charges');
            ['payment_status' => $payment_status, 'charges' => $charges] = json_decode(Order::create($order), true);
            [$charge] = $charges;
            ['payment_method' => $payment_method] = $charge;
            return compact('payment_status', 'payment_method');
        } catch (ParameterValidationError|ProcessingError $exception) {
            $message = str_replace('"', '', $exception->getMessage());
            JsonResponse::sendResponse(compact('message'), HTTPStatusCodes::ServiceUnavailable);
        }
    }

    function createCharge($order_id, $token_id, $amount)
    {
        $hours = 1;
        $order = Order::find($order_id);
        return $order->createCharge(
            [
                'payment_method' => [
                    'amount' => $amount,
                    'type' => 'card',
                    'token_id' => $token_id,
                    'expires_at' => time() + ($hours * 60 * 60),
                ]
            ]
        );
    }

    /**
     * @param string $token_id
     * @param Customer $customer
     * @param float $amount
     * @return mixed
     */
    function createSubscription($token_id, $customer, $amount)
    {
        try {
            /** @var Customer $customer */
            $customer = $this->createCustomer($token_id, $customer);
            $this->createPlan($amount);
            $subscription = $customer->createSubscription(
                array(
                    'plan' => 'donacion-recurrente-' . $amount / 100
                )
            );
            return $subscription;
        } catch (ResourceNotFoundError $error) {
            JsonResponse::sendResponse(['message' => 'Hubo un error. Contacte a Soporte.', 'error' => (array)$error], HTTPStatusCodes::InternalServerError);
        }
    }

    function createPlan($amount)
    {
        try {
            $amount_text = $amount / 100;
            $plan = Plan::find("donacion-recurrente-" . $amount_text);
            if (!empty($plan)) {
                return $plan;
            }
        } catch (ParameterValidationError $exception) {
            JsonResponse::sendResponse((array)$exception);
        } catch (ResourceNotFoundError $exception) {
            return Plan::create(
                array(
                    "id" => "donacion-recurrente-" . $amount_text,
                    "name" => "Donación de $amount_text que se cobra cada mes",
                    "amount" => $amount,
                    "currency" => "MXN",
                    "interval" => "month"
                )//plan
            );
        }
    }

    /**
     * @param $token_id
     * @param $customer
     * @return mixed
     */
    function createCustomer($token_id, $customer)
    {
        try {
            ['name' => $name, 'email' => $email, 'phone' => $phone] = $customer;
            return Customer::create(
                array(
                    "name" => $name,
                    "email" => $email,
                    "phone" => $phone,
                    "metadata" => array("reference" => "12987324097", "random_key" => "random value"),
                    "payment_sources" => array(
                        array(
                            "type" => "card",
                            "token_id" => $token_id
                        )
                    )//payment_sources
                )//customer
            );
        } catch (ProcessingError $error) {
            JsonResponse::sendResponse((array)$error);
        } catch (ParameterValidationError $error) {
            JsonResponse::sendResponse((array)$error);
        } catch (Handler $error) {
            JsonResponse::sendResponse((array)$error);
        }
    }
}