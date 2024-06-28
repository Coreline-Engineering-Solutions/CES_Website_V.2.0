<?php
ob_start();
session_start();

// ************* For PoSTGRES
    $dsn = "pgsql:host=172.16.58.11;dbname=corgis_users;port=5432";
    $opt = [
        PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES      => false
    ];
    try {
    $pdo = new PDO($dsn, 'postgres', 'IPX4_ce_UK_CA', $opt);
    }  catch(PDOException $e) {
        // php_functions.php is not executed before this block, thus log an error undifined 
        // still thinking through solution if function can be called before and in the block
        //log_an_error($pdo, $e->getMessage() );

        // temp solution
        try {
            $db = new SQLite3('local_error.db');
            $sql = "INSERT INTO local_errors (time_logged, error_logged) VALUES (datetime('now'), :error)";
            $stmnt = $db->prepare($insertQuery);
            $stmnt->bindParam(':error', $the_error, SQLITE3_TEXT);
            $stmnt->execute();
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            redirect('oops.php');
        }


    }
    
// WEBDAV CREDENTIALS
    $webdav_url = "http://attachments.corelineengineering.com/ces_WebDAV/corgis/";
    $wd_username = "Web_GIS";
    $wd_password = '2~PTl&d!Sh8K"Z^^8S]vy6v9r';

// Emails
    $from_email = "info@corelineengineering.com";
    $reply_email = "info@corelineengineering.com";

// includes the functions in all the pages    
    include "functions.php";




// ******* refrence to extentions me might need to activate
// extension=pdo_pgsql
// extension=pdo_sqlite
// extension=pgsql
// extension=sqlite3
// extension=php_ftp.dll
// extension=gd
// file_uploads=On

// ***STILL need to get SMTP SERVER method from warcom
// SMTP=localhost
// smtp_port=1025

?>
