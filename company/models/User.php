<?php

namespace app\models;

use Yii;
use yii\base\NotSupportedException;
use yii\web\IdentityInterface;

class User extends \yii\db\ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return 'user';
    }


    public function rules()
    {
        return [
            [['email', 'password', 'authKey'], 'required'],
            [['email', 'authKey'], 'string', 'max' => 255],
            [['password'], 'string', 'max' => 60]
        ];
    }


    public function attributeLabels()
    {
        return [
            'userId' => 'User ID',
            'email' => 'Email',
            'password' => 'Password',
            'authKey' => 'Auth Key',
        ];
    }

    public static function findIdentity($id)
    {
        return self::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
{
        throw new NotSupportedException();
    }

    public function getId()
    {
        return $this->userId;
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    public static function findByUsername($username, $password){
         return self::findOne(['email'=>$username, 'password'=>$password]);
    }
}
