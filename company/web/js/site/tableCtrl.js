'use strict';

app.controller("tableCtrl", function($scope, $http, $state, $timeout,Alertify,$uibModal, $rootScope) {

    $rootScope.getProducts = function (){
        $http.post('index.php?r=site/product').success(function (response) {
            $scope.products = response;
        }).error(function (error) {
            console.error(error);
        });
    };

    $rootScope.getProducts();

    $scope.getClients = function (){
        $http.post('index.php?r=site/client').success(function (response) {
            $scope.clients = response;
        }).error(function (error) {
            console.error(error);
        });
    };

    $scope.getData = function (){
        $http.post('index.php?r=site/data').success(function (response) {
            $scope.dates = response;
        }).error(function (error) {
            console.error(error);
        });
    };
    $scope.getData();


    $scope.findDate = function (dataStart, dataEnd) {

        var data = {
            dateStart: dataStart,
            dateEnd: dataEnd
        };

        if (dataEnd < dataStart) {
            Alertify.error('Error! End date more than start date!');
            return;
        }

        $http.post('index.php?r=site/find', data).success(function(response){
            if(response != 'bad'){
                Alertify.success('Success!');
                $scope.data = response;
                $scope.maxTime = Math.max.apply(Math, $scope.data.map(function(o) {
                    return o.sold_product_amount;
                }));
            } else {
                Alertify.error('Error');
            }
        });
    };

    $scope.getClients();

    $scope.getShop = function (){
        $http.post('index.php?r=site/shop').success(function (response) {
            $scope.shops = response;
        }).error(function (error) {
            console.error(error);
        });
    };

    $scope.getShop();

    $scope.deleteList = function (product_id){

        alertify.confirm("Do You really want to delete this list?", function (e) {
            if (e) {
                $http.post('index.php?r=site/delete',{productId: product_id}).success(function(response){

                    if(JSON.parse(response) != "bad"){
                        Alertify.success('Row successfully deleted!');
                        $rootScope.getProducts();
                    }
                }).error(function(error){
                    console.error(error);
                });
            } else {
                Alertify.error("Row was not deleted!");
            }
        });
    };

    $scope.addList = function (size) {

        $uibModal.open({
            templateUrl: 'templates/addForm.html',
            controller: function ($scope, $uibModalInstance) {

                $scope.addInfo = {
                    category: undefined,
                    product_name: undefined,
                    product_amount: undefined
                };

                $scope.Cancel = function () {
                    $uibModalInstance.dismiss('Cancel');
                };

                $scope.autoClose = function () {
                    $uibModalInstance.dismiss('Cancel');
                };

                $scope.add = function () {
                    var data = {
                        category: $scope.addInfo.category,
                        product_name: $scope.addInfo.product_name,
                        product_amount: $scope.addInfo.product_amount
                    };
                    $http.post('index.php?r=site/add', data).success(function(response){
                        if(response != 'bad'){
                            $scope.autoClose();
                            Alertify.success('Success! Row was added!');
                            $rootScope.getProducts();
                        } else {
                            $scope.autoClose();
                            Alertify.error('Error! Such product already exists');
                        }
                    });
                }
            },
            size: size
        });

    };

    $scope.editList = function (product_id, category_name, product_name, product_amount) {

        $rootScope.category_name = category_name;
        $rootScope.product_name = product_name;
        $rootScope.product_amount = product_amount;
        $uibModal.open({
            templateUrl: 'templates/editForm.html',
            controller: function ($scope, $uibModalInstance) {

                $scope.editInfo = {
                    category: $rootScope.category_name,
                    product_name: $rootScope.product_name,
                    product_amount: $rootScope.product_amount
                };

                $scope.Cancel = function () {
                    $uibModalInstance.dismiss('Cancel');
                };

                $scope.autoClose = function () {
                    $uibModalInstance.dismiss('Cancel');
                };


                $scope.save = function () {
                    var data = {
                        productID: product_id,
                        category: $scope.editInfo.category,
                        product_name: $scope.editInfo.product_name,
                        product_amount: $scope.editInfo.product_amount
                    };
                    $http.post('index.php?r=site/save', data).success(function(response){
                        console.log(response);
                        if(response != 'bad'){
                            $scope.autoClose();
                            Alertify.success('Success! Row was saved!');
                            $rootScope.getProducts();
                        } else {
                            $scope.autoClose();
                            Alertify.error('Error! Such product already exists');
                        }
                    });
                }
            }
        });

    };
});
