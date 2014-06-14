<?php

include 'email_template.php'; 

if($_POST){
    $from_Email = "noreplay@company.com"; 
    $to_Email = 'laura.s.v@gmail.com';
    $subject = 'A mistake was reported'; 
    
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    
        //exit script outputting json data
        $output = json_encode(array('type'=>'error', 'text' => 'Request must come from Ajax'));
         die($output);
    } 
    
    //check $_POST vars are set, exit if any missing
    if(!isset($_POST["userMessage"])){
        $output = json_encode(array('type'=>'error', 'text' => 'Message field is empty!'));
        die($output);
    }

    if(!isset($_POST["selectedContent"])){
        $output = json_encode(array('type'=>'error', 'text' => 'Content not selected'));
        die($output);
    }

    //Sanitize input data using PHP filter_var().
    $user_Message = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
    $selected_Content = filter_var($_POST["selectedContent"], FILTER_SANITIZE_STRING);
    
    //additional php validation - check emtpy message
    if(strlen($user_Message)<5){
        $output = json_encode(array('type'=>'error', 'text' => 'Too short message. Please enter something.'));
        die($output);
    }
    
    //proceed with PHP email.
    $headers = 'From: '.$from_Email.'' . "\r\n" .
    "MIME-Version: 1.0\r\n".
    "Content-Type: text/html; charset=ISO-8859-1\r\n".
    'X-Mailer: PHP/' . phpversion();

    //email style
    $message =  getTemplate($user_Message, $selected_Content);

    // sent mail
    $sentMail = @mail($to_Email, $subject, $message, $headers);
   
    if(!$sentMail){
        $output = json_encode(array("type"=>"error", "text" => "Could not send the report, please try again later."));
        die($output);

    }else{
        $output = json_encode(array("type"=>"message", "text" => "Thank you for your report."));
        die($output);
    }
}

?>