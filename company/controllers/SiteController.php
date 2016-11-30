<?php

namespace app\controllers;

use Yii;
use yii\db\Query;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;


class SiteController extends BaseController
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionResult()
    {
        return $this->render('result');
    }

    public function actionProduct() {
        $query = new Query();
        $products=$query->select(['category.category_name','category.category_id', 'product.product_name', 'product.product_id', 'warehouse.product_amount'])->from('product')
        ->join('JOIN', 'category_product', 'category_product.product_id = product.product_id')
        ->join('JOIN', 'category', 'category.category_id = category_product.category_id')
        ->join('JOIN', 'warehouse', 'warehouse.product_id = product.product_id')
            ->orderBy('category.category_name')->all();
        return json_encode($products);
    }

    public function actionClient(){
        $query = new Query();
        $clients = $query->select(['client_name','client_phone'])->from('client')->all();
        return json_encode($clients);
    }

    public function actionShop(){
        $query = new Query();
        $shops = $query->select(['shop_phone','shop_address'])->from('shop')->all();
        return json_encode($shops);
    }

    public function actionData(){
        $query = new Query();
        $data = $query->select(['sold_data', 'sold_product_amount', 'id'])->from('sold_product')->orderBy('sold_data')->all();
        return json_encode($data);
    }

    public function actionFind(){

        $start=Yii::$app->request->post('dateStart');
        $end=Yii::$app->request->post('dateEnd');

        $query = new Query();
        $data = $query->select(['sold_data', 'sold_product_amount'])->from('sold_product')
            ->where(['between', 'id', $start, $end])->all();
        return json_encode($data);
    }

    public function actionDelete() {

        $product_id = Yii::$app->request->post('productId');

        Yii::$app->db->createCommand()
            ->delete('product',
                ['product_id'=>$product_id])
            ->execute();
        echo json_encode('ok');
    }

    public function actionAdd(){
        $category=Yii::$app->request->post('category');
        $product_name=Yii::$app->request->post('product_name');
        $product_amount = Yii::$app->request->post('product_amount');

        $query= new Query();

        if($listInfo = $query->from('product')->where(['product_name'=>$product_name])->exists())
        {
            echo json_encode('bad');
        }
        else{

            Yii::$app->db->createCommand()
                ->insert('product',
                    ['product_name'=>$product_name])
                ->execute();

            Yii::$app->db->createCommand()
                ->insert('category',
                    ['category_name'=>$category])
                ->execute();

            if($listInfo = $query->from('product')->where(['product_name'=>$product_name])->exists()){

                $categoryID = floatval($query->select('category_id')->from('category')->where(['category_name'=>$category])->scalar());
                $productID = floatval($query->select('product_id')->from('product')->where(['product_name'=>$product_name])->scalar());


                Yii::$app->db->createCommand()
                    ->insert('category_product',
                        ['category_id'=>json_encode($categoryID), 'product_id'=>json_encode($productID)])
                    ->execute();

                Yii::$app->db->createCommand()
                    ->insert('warehouse',
                        ['product_amount'=>$product_amount, 'product_id'=>$productID])
                    ->execute();

                echo json_encode('ok');
            }
            else {

                echo json_encode('bad');
            }
        }
    }

    public function actionSave(){
        $category=Yii::$app->request->post('category');
        $product_name=Yii::$app->request->post('product_name');
        $product_amount = Yii::$app->request->post('product_amount');
        $productID = floatval(Yii::$app->request->post('productID'));

        $query= new Query();
        if($listInfo = $query->from('product')->where(['product_id'=>$productID])->exists())
        {
            Yii::$app->db->createCommand()
                ->update('product',
                    ['product_name'=>$product_name],['product_id'=>$productID])
                ->execute();

            Yii::$app->db->createCommand()
                ->update('warehouse',
                    ['product_amount'=>$product_amount], ['product_id'=>$productID])
                ->execute();

            Yii::$app->db->createCommand()
                ->update('category_product',
                    ['product_id'=>$productID],['product_id'=>$productID])
                ->execute();

            $categoryID = floatval($query->select('category_id')->from('category_product')->where(['product_id'=>$productID])->scalar());

            Yii::$app->db->createCommand()
                ->update('category',
                    ['category_name'=>$category], ['category_id'=>$categoryID])
                ->execute();

            echo json_encode('ok');
        }
        else{

            echo json_encode('bad');
        }
    }
}
