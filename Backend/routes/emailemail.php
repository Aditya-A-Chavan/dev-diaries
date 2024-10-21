<?php
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendAutomatedEmail($recipientEmail, $recipientName, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 0;                     
        $mail->isSMTP();                           
        $mail->Host       = 'smtp.gmail.com';    
        $mail->SMTPAuth   = true;                  
        $mail->Username   = 'foruntrust640@gmail.com'; 
        $mail->Password   = 'omym eocv hwjx crqy';   
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587;                   

        $mail->setFrom('foruntrust640@gmail.com', 'Aditya Aditya'); 
        $mail->addAddress($recipientEmail, $recipientName);     

        $mail->isHTML(true);                                  
        $mail->Subject = $subject;                            
        $mail->Body    = $body;                              
        $mail->AltBody = strip_tags($body);                  

        $mail->send();
        echo 'Email has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

$recipientEmail = 'harshal.dulera@somaiya.edu';
$recipientName = 'Harshal Harshal';
$subject = 'Automated Email Example';
$body = '<h1>Hello!</h1><p>This is an automated email sent using PHPMailer.</p>';

sendAutomatedEmail($recipientEmail, $recipientName, $subject, $body);

?>
