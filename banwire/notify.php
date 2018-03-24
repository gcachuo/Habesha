<?php
/**
 * Created by PhpStorm.
 * User: Cachu
 * Date: 23/03/2018
 * Time: 10:59 PM
 */

if(empty($_POST['cancel_url']))
    return;

$fromName = 'Proyecto Habesha';
$mailFrom = "contacto@proyectohabesha.org";
$mailTo = "contacto@proyectohabesha.org";
$subject = "Respuesta Automatica";
$body = <<<html
Se ha realizado un pago de tipo recurrente a nombre de $_POST[card_owner] con id: $_POST[id]
html;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require_once "../vendor/autoload.php";
ini_set("display_errors", 1);
error_reporting(E_ALL);
$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    $mail = new PHPMailer(); // create a new object
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "gcachu.o@gmail.com";
    $mail->Password = "xlclvhnjxpfznilw";
    $mail->addReplyTo($mailFrom, $fromName);
    $mail->SetFrom($mailFrom, $fromName);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($mailTo);

    if (!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message has been sent";
    }
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}