<?php

function getTemplate($user_Message, $selected_Content){

    $template = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Report </title>
            <style type="text/css">
                body {margin: 0; padding: 0; min-width: 100%!important;}
                .content {width: 100%; max-width: 800px;}
                @media only screen and (min-device-width: 801px) {
                    .content {width: 800px !important;}
                }  
            </style>
        </head>
        <body bgcolor="#FFFFFF" style="margin:0; padding:0;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0"> <!-- main TABLE -->
                <!-- content  -->
                <tr>
                    <td>

                        <!--[if (gte mso 9)|(IE)]>
                        <table width="800" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td>
                                    <![endif]-->

                        <table bgcolor="#666666" class="content" border="0" cellpadding="0" cellspacing="0" align="center" >
                            <tr>
                                <td height="105" align="right" bgcolor="#df5b57">
                                    <!-- logo -->
                                </td>
                            </tr>
                            <!-- copy -->
                            <tr>
                                <td style="padding: 40px 30px 50px 30px;">
                                    <table bgcolor="#666666" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                                        <tr>
                                            <td style="color: #df5b57; font-family: Arial, sans-serif; font-size: 36px;">
                                                A mistake was reported!
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 15px 0 15px 0; color: #000000; font-family: Arial, sans-serif; font-size: 17px; line-height: 25px;">
                                                <strong>User message:</strong><br>'.htmlspecialchars_decode($user_Message).'
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 15px 0 20px 0; color: #000000; font-family: Arial, sans-serif; font-size: 17px; line-height: 25px;">
                                                <strong>Selected Text:</strong><br>'.htmlentities($selected_Content).'
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- end copy -->
                            <!-- footer -->
                            <tr>
                                <td>
                                    <table bgcolor="#000000" width="100%"  border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td height="20" align="left" style="padding: 20px 30px 20px 30px; color: #FFFFFF; font-family: Arial, sans-serif; font-size: 17px; line-height: 25px">
                                                &copy; mycompany 2014
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- end footer -->
                        </table>

                    <!--[if (gte mso 9)|(IE)]>
                            </td>
                        </tr>
                    </table>
                    <![endif]-->

                    </td>
                </tr>
                <!-- end content  -->
            </table>
            <!-- end main  -->
        </body>
    </html>';

    return $template;

}

?>