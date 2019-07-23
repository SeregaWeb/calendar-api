<?php

class router{

    private $method;
    private $url;

    public function __construct()
    {
        //var_dump($_REQUEST);
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->url = $_SERVER['REQUEST_URI'];
        /*if($_SERVER['SERVER_PROTOCOL']==="HTTP/1.0 404 Not Found"){
            $notFound = new NotFoundController();
        }*/
    }

    
    public function methodChoose()
    {
        list($s, $u, $r, $ser, $a, $class, $meth, $par) = explode('/', $this->url, 8);
        //echo $this->url;
        //echo $this->method;
        switch ($this->method) {
            case 'GET':
                $this->setMethod(ucfirst($class), 'get' . ucfirst($meth), $par);
                break;
            case 'DELETE':
                $this->setMethod(ucfirst($class), 'delete' . ucfirst($meth), $par);
                break;
            case 'POST':
                $this->setMethod(ucfirst($class), 'post' . ucfirst($meth), $par);
                break;
            case 'PUT':
                $this->setMethod(ucfirst($class), 'put' . ucfirst($meth), $par);
                break;
            default:
                return false;
        }
    }

    private function setMethod($class, $method, $par = false)
    {
        //$_POST['name'];
        
        $obj = new $class;
        // var_dump(method_exists($obj, $method));
        explode('?',$method);
        // print_r($par);

        if (method_exists($obj, $method)) {
            echo call_user_func([$obj, $method], $par);


            //echo $_REQUEST['password_log'];
            //echo "gg";
            /*if (stristr($par, '/') && (!stristr($par, '.txt') || !stristr($par, '.json') || !stristr($par, '.html') || !stristr($par, '.xml'))) {
                $arr = explode('/', $par);
                //echo "f";
                $carsRes = call_user_func([$obj, $method], $arr);
                $this->viewer->view($carsRes, '');
            } elseif (stristr($par, '.') && (stristr($par, '.txt') || stristr($par, '.json') || stristr($par, '.html') || stristr($par, '.xml'))) {
                $arr = explode('/', $par);
                //echo "f";
                $carsRes = call_user_func([$obj, $method], $arr[0]);
                $this->viewer->view($carsRes, $arr[1]);
            } else {
                //echo "f";
                $carsRes = call_user_func([$obj, $method], $par);
                $this->viewer->view($carsRes, $par);
            }*/

        } 
        /*elseif(http_response_code(404)){
            $notFound = new NotFoundController();
        }*/
    }
}