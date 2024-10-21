<?php
require './emailemail.php'; // Adjust the path as needed

// Call the sendAutomatedEmail function with desired arguments
$recipientEmail = 'harshal.dulera@somaiya.edu';
$recipientName = 'Harshal Harshal';
$subject = 'Automated Email Example';
$body = '<h1>Hello!</h1><p>This is an automated email sent using PHPMailer.</p>';

sendAutomatedEmail($recipientEmail, $recipientName, $subject, $body);
?>
