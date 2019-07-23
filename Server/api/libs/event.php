<?php 
class Event 
{
    private $autoCatalog;
    private $con;
    public function __construct()
    {
        $db = new db;
        $this->con = $db->getConnection();
        
    }

    public function getAllEvent()
    {
        $id = $_GET['id'];
        +$id += 1;
        $year = $_GET['year'];
        $mount = $_GET['mount'];
        $que = "SELECT Booker_event.id, start , end , create_data , Booker_event.id , BookerUser.email, Booker_rooms.name
        FROM  Booker_event,  BookerUser, Booker_rooms         
        WHERE YEAR(start) = '$year' AND MONTH(start) = '$mount' AND room_id = '$id' AND Booker_event.user_id = BookerUser.id AND Booker_rooms.id = Booker_event.room_id";
        $stmt = $this->con->prepare($que);
        $stmt->execute();
        $res = $stmt->fetchAll();
        return json_encode($res);

    }
    public function deleteEventId()
    {
        $id = $_REQUEST[0]; 
        $que = 'DELETE FROM Booker_event WHERE id = '.$id;
        $stmt = $this->con->prepare($que);
        if($stmt->execute()){
            return json_encode(array('delete event'));
        }else{
            return json_encode(array('error server'));
        }
    }
    function putEditEvent()
    {
        $body = json_decode(file_get_contents('php://input'), true);
        $id = $body['body']['id'];
        $room_id = $body['body']['room_id'];
        
        $date = $body['body']['create_data'];
        $dataArr = date_parse_from_format ( 'Y.n.j' , $date );
        $mount = $this->validDates($dataArr['month']);
        $day = $dataArr['day'];
        $day =  $this->validDates($day);
        $start = $dataArr['year']."-".$mount."-".$day." ".$body['body']['start'];
        $end =  $dataArr['year']."-".$mount."-".$day." ".$body['body']['end'];

        $TimeStart = date_parse_from_format ( 'h:i:s A' , $body['body']['start']);
        $TimeEnd = date_parse_from_format ( 'h:i:s A' , $body['body']['end']);
            // print_r($TimeStart);
            // print_r($TimeEnd);
        if($this->checkTime($TimeStart , $TimeEnd))
        {
            $checkBooking = $this->checkBooking($start , $end , $room_id);
            if(0 == sizeof($checkBooking) || $checkBooking[0]['id'] == $id && sizeof($checkBooking) == 1)
            {
                $que = 'UPDATE Booker_event SET start = ? ,end = ?  WHERE id = ?';
                $stmt = $this->con->prepare($que);
                if( $stmt->execute([$start,$end , $id]))
                {
                    return json_encode(array('edit ok'));
                }else
                {
                    return json_encode(array('error server'));
                }
            }else
            {
                return json_encode(array('this time is already taken'));
            }
        }else
        {
            return json_encode(array('uncorect time'));
        }
    }
    function postAddEvent($body){
        $body = json_decode(file_get_contents('php://input'), true);

        $date = $body['body']['create_data'];
        $dataArr = date_parse_from_format ( 'Y.n.j' , $date );
        $mount = $this->validDates($dataArr['month']);
        $day = $dataArr['day'];
        $day =  $this->validDates($day);
        
        $name = $body['body']['name'];
        $start = $dataArr['year']."-".$mount."-".$day." ".$body['body']['start'];
        $end =  $dataArr['year']."-".$mount."-".$day." ".$body['body']['end'];
        $user_id =  $body['body']['user_id'];
        $create_data = $dataArr['year']."-".$mount."-".$day." 00:00:00";
        $recur_id = $body['body']['recur_id'];
        $room_id = $body['body']['room_id'];
        $TimeStart = date_parse_from_format ( 'h:i:s A' , $body['body']['start']);
        $TimeEnd = date_parse_from_format ( 'h:i:s A' , $body['body']['end']);

        if($this->checkTime($TimeStart , $TimeEnd)){
            if($recur_id == 4){
                $Date = $dataArr['year']."-".$mount."-".$day;
                $timeTmp = [];
                for ($i = 0 ; $i <= $recur_id ; $i++){
                    $Date = date('Y-m-d', strtotime($Date. ' +7 days'));
                    $start = $Date." ".$body['body']['start'];
                    $end =  $Date." ".$body['body']['end'];
                    $checkBooking = $this->checkBooking($start , $end , $room_id);
                    if(0 == sizeof($checkBooking)){
                        array_push($timeTmp , [$start,$end]);
                    }else{
                        return json_encode(array('this time is already taken'));
                    }
                }
                $recur_id = rand(1 , 25000);
                $sql = "INSERT INTO  Booker_event (name, start, end, user_id, create_data, recur_id, room_id) VALUES ";
                for ($i = 0 ; $i <5 ; $i ++) {
                    $start = $timeTmp[$i][0];
                    $end = $timeTmp[$i][1];
                  $sqlEnd .= "('$name','$start', '$end', $user_id, '$create_data',  $recur_id, $room_id),";
                }
                $sql = $sql.$sqlEnd;
                $stmt = $this->con->prepare($sql);
                if($stmt->execute()){
                    return json_encode(array('ok'));
                }else{
                    return json_encode(array('error server'));
                }
            }else{
                $checkBooking = $this->checkBooking($start , $end , $room_id);
                if(0 == sizeof($checkBooking)){
                    $sql = "INSERT INTO  Booker_event (name, start, end, user_id, create_data, recur_id, room_id) VALUES (?,?,?,?,?,?,?)";
                    $stmt = $this->con->prepare($sql);
                        if($stmt->execute([$name,$start, $end, $user_id, $create_data, $recur_id, $room_id])){
                            return json_encode(array('ok'));
                        }else{
                            return json_encode(array('error server'));
                        }
                    }else{
                        return json_encode(array('this time is already taken'));
                    }
                
                    return json_encode(array('uncorect time'));
            }
        }
    }

    public function checkBooking($start , $end , $id)
    {
        $que = "SELECT * FROM Booker_event WHERE end > '$start' AND start < '$end' AND room_id = '$id'";
        $stmt = $this->con->prepare($que);
        $stmt->execute();
        $res = $stmt->fetchAll();
        return $res;
    }

    public function checkTime($TimeStart , $TimeEnd)
    {
        if($TimeStart['hour'] == 0 ){
            $TimeStart['hour'] = 12;
        }
        if($TimeEnd['hour'] == 0 ){
            $TimeEnd['hour'] = 12;
        }

        if( $TimeStart['minute'] == 0 || $TimeStart['minute'] == 15 || $TimeStart['minute'] == 30 || $TimeStart['minute'] == 45 ){
            $fl = true;    
        }else{
            $fl = false;
        }
        if( $TimeEnd['minute'] == 0 || $TimeEnd['minute'] == 15 || $TimeEnd['minute'] == 30 || $TimeEnd['minute'] == 45 ){
            $fl = true;    
        }else{
            $fl = false;
        }

        if($fl && $TimeStart['hour'] < 20 && $TimeStart['hour'] >= 8 && $TimeEnd['hour'] <= 20 && $TimeEnd['hour']>= 8){
            if($TimeEnd['hour'] == 20 && $TimeEnd['minute'] != 0){
                return false;
            }
            if($TimeStart['hour'] < $TimeEnd['hour']){
                return true;
            }else if($TimeStart['hour'] == $TimeEnd['hour'] && $TimeStart['minute'] < $TimeEnd['minute']){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    public function validDates($d)
    {
        if(+$d < 10){
            $res = '0'.$d;
        }else{
            $res = $d;
        }
        return $res;
    }

    function getRooms()
    {
        $resultArray = array();

        foreach($this->con->query('SELECT id , name 
        from Booker_rooms'
        ) as $row) {
            $tmp_arr = array('id'=>$row['id'],'name'=>$row['name']);
            array_push($resultArray, $tmp_arr); 
        }
        
        return json_encode($resultArray);
    }

}