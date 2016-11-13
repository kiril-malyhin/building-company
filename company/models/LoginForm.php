<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\db\Query;

class LoginForm extends Model
{
    public $username;
    public $password;
    public $rememberMe = true;

    private $_user = false;

    public function login()
    {
        $query= new Query();

        if ($this->validate()) {

            $identity = User::findIdentity(['email' => $this->username, 'password'=>sha1($this->password)]);

            if(count($identity) == 1){
                return Yii::$app->user->login($this->getUser(), $this->rememberMe ? 3600*24*30 : 0);
            }else{
                return false;
            }
        }
        return false;
    }


    public function getUser()
    {
        if ($this->_user === false) {
            $this->_user = User::findByUsername($this->username, sha1($this->password));
        }

        return $this->_user;
    }
}
