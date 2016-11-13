<?php

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" ng-app="myApp">

<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">

<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-animate.js"></script>
<script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.1.2.js"></script>
<script src="http://angular-ui.github.io/ui-router/release/angular-ui-router.js"></script>
<script type="text/javascript" src="http://vk.com/js/api/share.js?90" charset="windows-1251"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>


<?php $this->beginBody() ?>
        <?php
        NavBar::begin([
            'options' => [
                'class' => 'navbar-inverse navbar-fixed-top',
                'style'=> 'background-color: black; font-size: 15px',
            ],
        ]);
        ?>

    <div class="wrap" ng-controller="loginCtrl">
        <div ng-controller="signCtrl">
            <div ng-controller="passwordCtrl">
                <div ng-controller="paymentCtrl">
                    <div ng-controller="contactCtrl">
                    <?

                    echo Nav::widget([
                        'options' => ['class' => 'navbar-nav navbar-right'],
                        'items' => [

                            Yii::$app->user->isGuest ?
                                [
                                    'label' => ''
                                ] :
                                [ 'label' => 'Lists',
                                    'url' => '/index.php?r=pack/showlists',
                                    'linkOptions' => ['data-method' => 'post']
                                ],

                            Yii::$app->user->isGuest ?
                                [
                                    'label' => ''
                                ] :
                                [  'label' => 'Profile',
                                    '<b disabled="caret"></b>',
                                    'items' => [
                                        ['label' => 'Change Password','url' => '#', 'options'=> array('ng-click'=>'openChangePassword()')],
                                        '<li class="divider"></li>',
                                        ['label' => 'Buy Premium Account','url' => '#', 'options'=> array('ng-click'=>'openPremiumAccount()')],
                                    ],
                                ],

                            Yii::$app->user->isGuest ?
                                [
                                    'label' => ''
                                ] :
                                [ 'label' => 'Contact Us',
                                    'options'=> array('ng-click'=>'openContact()')

                                ],

                            Yii::$app->user->isGuest ?
                                [
                                    'label' => 'Login',
                                    'options'=> array('ng-click'=>'openLogin()')
                                ] :
                                ['label' => 'Logout(' . Yii::$app->user->identity->email .')',
                                    'url'=> '/index.php?r=site/logout',
                                    'linkOptions' => ['data-method' => 'post']
                                    ],
                            Yii::$app->user->isGuest ?
                                [
                                    'label' => 'Sign Up',
                                    'options'=> array('ng-click'=>'openSign()')
                                ] :
                                ['label' => ''],
                        ],
                    ]);
                    echo Nav::widget([
                        'options' => ['class' => 'navbar-nav navbar-left'],
                        'items' => [
                            Yii::$app->user->isGuest ?
                                [
                                    'label' => 'BagPack',
                                    'url'=> Yii::$app->homeUrl,
                                ] :
                                [ 'label' => 'BagPack',
                                    'url'=> '/index.php?r=pack/create'
                                ],
                        ],
                    ]);?>
                    </div>
                </div>
            </div>
        </div>
    </div>
       <?php NavBar::end();
    ?>

    <div class="containerContent">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= $content ?>
    </div>

    <footer class="footer" style="background-color: black;">
        <div class="containerContent">
            <p class="pull-left" style="padding-left: 10px">&copy; BagPack <?= date('Y') ?></p>
            <p >Made by USB</p>
        </div>
    </footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>


