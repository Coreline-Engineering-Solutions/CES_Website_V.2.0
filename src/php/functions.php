<?php
    //short hand redirect
    function redirect($loc) {
        header("Location: {$loc}");
    }

    // simple count record instance 
    function count_field_val($pdo, $tbl, $fld, $val) {
        try {
            $sql="SELECT {$fld} FROM user_profiles.{$tbl} WHERE {$fld}=:value";
            $stmnt=$pdo->prepare($sql);
            $stmnt->execute([':value'=>$val]);
            return $stmnt->rowCount();
        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }


    // return user record
    function return_user_field_data($pdo, $fld, $val) {
        try {
            $sql="SELECT * FROM user_profiles.users WHERE {$fld}=:value";
            $stmnt=$pdo->prepare($sql);
            $stmnt->execute([':value'=>$val]);
            return $stmnt->fetch();
        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }

    //this function sets user_session data on login
    function user_login_session_start($pdo, $username, $cookie_exp, $last_page, $user_ip, $user_host, $user_port ) {
        try {
            if ($cookie_exp == true){
                $sql="INSERT INTO user_profiles.user_session(username, last_login, cookie_exp, last_activity, last_page, user_ip, user_host, user_port) VALUES (:username, NOW(), (NOW() + INTERVAL '28800 seconds'), NOW(), :last_page, :user_ip, :user_host, :user_port);";
            } else {
                $sql="INSERT INTO user_profiles.user_session(username, last_login, cookie_exp, last_activity, last_page, user_ip, user_host, user_port) VALUES (:username, NOW(), NULL, NOW(), :last_page, :user_ip, :user_host, :user_port);";
            }
            $stmnt=$pdo->prepare($sql);
            $stmnt->execute([':username'=>$username, ':last_page'=>$last_page, ':user_ip'=>$user_ip, ':user_host'=>$user_host, ':user_port'=>$user_port]);
        } catch(PDOException $e) {
            log_an_error($pdo, $e->getMessage() );
            return $e->getMessage();
        }
    }


    //Transfer offline log to the db when necesary, will bind this to the login process
    function transfer_logs($pdo) {
        try {
            $db = new SQLite3('local_error.db');
            $countQuery = "SELECT COUNT(*) AS count FROM local_errors";
            $result = $db->querySingle($countQuery);
            if ($result > 0) {
                $sql = "SELECT * FROM local_errors";
                $stmnt = $db->prepare($sql);
                $result = $stmnt->execute();
        
                while ($row  = $result->fetchArray(SQLITE3_ASSOC)) {
                    $time_logged = $row['time_logged'];
                    $error_logged = $row['error_logged'];
                    $was_succesfull = true;
                    try {
                        $sql="INSERT INTO website.website_to_db_errors(time_logged, error_logged) VALUES (:the_time, :the_error);";
                        $stmnt=$pdo->prepare($sql);
                        $stmnt->execute([':the_time'=>$time_logged, ':the_error'=>$error_logged]);
                        
                    } catch(PDOException $e) {
                        log_unreached_db_error($e->getMessage());
                        $was_succesfull = false;
                    }
                }
                if ($was_succesfull == true) {
                    $sql = "DELETE FROM local_errors";
                    $stmnt = $db->prepare($sql);
                    $stmnt->execute();
                }
            }
        } catch (Exception $e) {
            log_unreached_db_error($e->getMessage());
        }
    }


    //Offline error logging to local sqlitedb, this is failsafe for when geoserver cant be reached
    function log_unreached_db_error($the_error) {
        try {
            $db = new SQLite3('local_error.db');
            $sql = "INSERT INTO local_errors (time_logged, error_logged) VALUES (datetime('now'), :error)";
            $stmnt = $db->prepare($sql);
            $stmnt->bindParam(':error', $the_error, SQLITE3_TEXT);
            $stmnt->execute();
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            redirect('oops.php');
        }
    }






?>