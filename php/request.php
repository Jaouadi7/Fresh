<?php

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $full_name = filter_var($_POST['fname'], FILTER_SANITIZE_STRING);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_NUMBER_INT);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $sbj = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $msg = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

   
    if (empty($full_name) || empty($phone) || empty($email) || empty($sbj) || empty($msg)) {
        $error = 'Please Fill out all fields';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error =  'Email that you enter is unvalid';
    } else {

        
        $to = 'your@mail.com'; // YOUR ADDRESS EMAIL
        $subject = 'A new contact message has been sent from ' . $full_name;
        $body =
            "Name : " . $full_name. "\r\n" .
            'Email : ' . $email .   "\r\n" .
            'Phone : ' . $phone .   "\r\n" .
            'Subject : ' . $sbj .   "\r\n" .
            'Message: ' . $msg .   "\r\n";

        $headers = 'MIME-Version : 1.0' . "\r\n";
        $headers .= 'Content-Type:text/html;charset=UTF-8' . "\r\n";
        $headers .= 'From : ' . $full_name . ' [ ' . $email . ' ]' . "\r\n";
        if (mail($to, $subject, $body, $headers)) {
            $success = 'Your form has been submitted successfully.';
        } else {
            $error = 'Something went wrong please try again';
        }
       
    }
}


if (!empty($error)) {
?>
    <div class="notification is-danger">
        <?php echo $error; ?>
    </div>
<?php
}

if (!empty($success)) {
?>
    <div class="notification is-success">
        <button class="delete"></button>
        <?php echo $success; ?>
    </div>
<?php

}