<?php

/* @var $this yii\web\View */

$this->title = 'Building company';
?>
<div id="result-page" class="result-page" ng-controller="tableCtrl">
    <div class="container">
        <div class="row" ng-repeat="shop in shops">
            <p class="company-label-result">Building company</p>
            <div class="lead" style="font-size: 40px;">Shop address: {{shop.shop_address}}</div>
            <div class="lead" style="font-size: 40px;margin-bottom: 100px">Shop phone: {{shop.shop_phone}}</div>
            <div class="lead" style="font-size: 40px;">Our clients</div>
            <table style="padding-top: 100px;" class="container row">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
                <tr ng-repeat="client in clients">
                    <td>
                        {{ client.client_name }}
                    </td>
                    <td>
                        {{ client.client_phone }}
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="lead" style="font-size: 40px;margin-top: 100px;">Admin control</p>
            <table style="padding-top: 100px; text-align: center" class="container row">
                <tbody>
                <tr>
                    <th>Category</th>
                    <th>Product name</th>
                    <th>Product amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                <tr ng-repeat="product in products">
                    <td>
                        {{ product.category_name }}
                    </td>
                    <td>
                        {{ product.product_name }}
                    </td>
                    <td>
                        {{ product.product_amount }}
                    </td>
                    <td>
                        <button class="btn btn-warning" ng-click="editList(product.product_id, product.category_name,
                        product.product_name, product.product_amount)">Edit</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" ng-click="deleteList(product.product_id)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button class="btn btn-success pull-right add-button" ng-click="addList(product.product_id)">Add  <span class="glyphicon glyphicon-plus-sign"></span></button>
        </div>
    </div>

</div>
