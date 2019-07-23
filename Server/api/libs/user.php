<?php 

class User
{
    private $con;
    public function __construct()
    {
        $db = new db;
        $this->con = $db->getConnection();
        
    }

    public function post_registration($login , $fname, $sname,  $email, $password )
    {
        $today = date("F j, Y, g:i a");
        $token = md5($login.$password.$today);
        $pass = md5($password);
        // echo($login." , ".$fname." , ".$sname." , ".$email." , ".$pass." , ".$token);

        $sql = "INSERT INTO CarsUser (login, fname, sname , email, password, token) VALUES (?,?,?,?,?,?)";
        $stmt = $this->con->prepare($sql);
        if( $stmt->execute([$login,$fname, $sname, $email, $pass, $token])){
            return json_encode($token);
            
        }else{
            return json_encode('error server');
        }
    }
    public function put_auth($login, $pass)
    {
        
        $today = date("F j, Y, g:i a");
        $token = md5($login.$pass.$today);
        $pass = md5($pass);
        $data = [
            'token' => $token,
            'login' => $login,
            'password' => $pass
        ];
        
        
        $que = "SELECT id FROM CarsUser WHERE login="."'".$login."' AND password="."'".$pass."'";
           
        $stmt = $this->con->prepare($que);
        $stmt->execute([$id]); 
        $row = $stmt->fetch();

            $tmp_arr = array(
            'id'=>$row['id']);

        
        if($tmp_arr['id'] != ''){
            $sql = "UPDATE CarsUser SET token=:token WHERE login=:login AND password=:password";
            $stmt = $this->con->prepare($sql);
            if($stmt->execute($data))
            { 
                $arr = [];
                array_push($arr , $token);
                array_push($arr , $tmp_arr['id']);
                return json_encode($arr);
            }
            else
            {
                return json_encode('error server');
            }
        }

        
    }
}

// CREATE TABLE CarsUser (
//         id int(11) primary key auto_increment,
//         login varchar(100) not null,
//         fname varchar(100) not null,
//         sname varchar(100) not null,
//         email varchar (100) not null,
//         password varchar (255) not null,
//         token varchar (255) not null
//     );