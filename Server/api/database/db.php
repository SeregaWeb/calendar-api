<?php

class db 
{   
    private $connect;

    public function __construct(){
        $now = new DateTime();
        $mins = $now->getOffset() / 60;
        $sgn = ($mins < 0 ? -1 : 1);
        $mins = abs($mins);
        $hrs = floor($mins / 60);
        $mins -= $hrs * 60;
        $offset = sprintf('%+d:%02d', $hrs*$sgn, $mins);
        
        //Your DB Connection - sample
        $db = $this->getConnection();
        $db->exec("SET time_zone='$offset';");
         
    }

    public function getConnection()
    {
        $this->connect = new PDO('mysql:host='.HOST.';dbname='.DB.'', USER, PASSWORD);
        return $this->connect;
    }

    
}


// CREATE TABLE BookerUser (
//         id int(11) primary key auto_increment,
//         name varchar(100) not null,
//         email varchar (100) not null,
//         password varchar (255) not null,
//         role varchar (255) not null,
//         status varchar (255) not null,
//         UNIQUE (email)
//     );
// INSERT INTO BookerUser (name , email , password , role , status) VALUE ('Serhii Milchenko', 'milchenko2k16@gmail.com','12345','admin','ok');    

//     CREATE TABLE Booker_event (
//         id int(11) primary key auto_increment,
//         name varchar(100) not null,
//         start DATETIME not null,
//         end DATETIME not null,
//         user_id int(11) not null,
//         create_data DATETIME not null,
//         recur_id int(11) not null,
//         room_id int(11) not null,
//     );
    
// CREATE TABLE Booker_rooms (
//     id int(11) primary key auto_increment,
//     name varchar(100) not null 
// );    

// INSERT INTO Booker_rooms (name) value ('Play-room'),('Miting-room'),('Guest-room');