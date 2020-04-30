<?php
require_once __DIR__ . '/Controller.php';


class GameController extends Controller{

  function __construct(){
    //doe iets
  }

  public function index(){
    $this->set('title','Phaser PHP Demo');
  }

}
