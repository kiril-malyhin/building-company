'use strict';

app.controller("myBarCtrl", function($rootScope,$scope,Alertify, $http, $timeout, $uibModal) {

    $scope.showChooseContent = true;
    $scope.showListContent = false;
    $scope.startStuffs = true;
    $scope.filteringStuffs = false;
    $scope.showFinalListContent = true;
    $scope.bar = [];
    $scope.stuffExist = [];
    $scope.stuffFilters = {};
    $scope.filterValues = {};
    $scope.enabledStuff = [];
    $scope.existStuffs = false;
    $scope.sectionName = {};
    $scope.checkedItems = [];
    $scope.checkedItemsFinalList = [];
    $scope.refreshListOfItems = true;
    $scope.finalItems = [];
    var userStuffs = [];
    var crossedItems = [];
    var listStuffs = [];
    var qwerty = [];
    $scope.addedStuffs = [];

    $scope.listInfo = {
        listname: undefined,
        description: undefined
    };

    var QueryString = function () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    var list_ID = QueryString.list_id;

    $scope.radioButtonSetValue = function (key, value) {
        $scope.bar[key] = value;
    };

    $scope.selectStuff = function(stuffs, sectionName){

        var items = $scope.checkedItems;

        var temp = [];
        for(var item in items){
            temp.push(items[item].stuff_id);
        }

        var sectionFound = false;
        var sectionObject = {};


        for(var section in $scope.checkedItems) {
            if ($scope.checkedItems[section].section_name == sectionName) {
                sectionFound = true;

                if ($scope.checkedItems[section].stuffs.indexOf(stuffs) === -1) {
                    $scope.checkedItems[section].stuffs.push(stuffs);
                } else {
                    $scope.checkedItems[section].stuffs.splice($scope.checkedItems[section].stuffs.indexOf(stuffs), 1);
                }
            }
        }

        if (sectionFound == false) {
            sectionObject = { section_name: sectionName, stuffs: [stuffs] };
            $scope.checkedItems.push(sectionObject);
        }

    };

    $http.post('index.php?r=stuff/stuffs').success(function (response) {
        $scope.stuffFilters = response;

    }).error(function (error) {
        console.error(error);
    });

    $http.post('index.php?r=stuff/category').success(function (response) {

        for (var i in response) {
            $scope.bar[response.cat_filter_id] = null;
        }
        $scope.categories = response;


    }).error(function (error) {
        console.error(error);
    });

    $scope.backToChoose = function () {
        $scope.showChooseContent = true;
        $scope.showListContent = false;
    };

    $http.post('index.php?r=stuff/section').success(function (response) {
        $scope.sections = response;
        for (var section in $scope.sections) {
            for (var stuff in $scope.sections[section].stuffs) {
                $scope.sections[section].stuffs[stuff].selected = false;
            }
        }

    }).error(function (error) {
        console.error(error);
    });

    $scope.unSelectStuff = function (stuffs) {
        stuffs.selected = false;
    };

    $scope.refreshPackingList = function () {

        $scope.checkedItems = [];

        $http.post('index.php?r=stuff/section').success(function (response) {

            $scope.sections = response;
            for (var section in $scope.sections) {
                for (var stuff in $scope.sections[section].stuffs) {
                    $scope.sections[section].stuffs[stuff].selected = false;
                }
            }

        }).error(function (error) {
            console.error(error);
        });
    };

    $scope.refreshPackingFinalList = function () {

        $scope.checkedItems = [];

        for (var section in $scope.sections) {
            for (var stuff in $scope.sections[section].stuffs) {
                $scope.sections[section].stuffs[stuff].selected = false;
            }
        }

    };

    $scope.$watch('bar', function (newValue) {
        for (var i in newValue) {
            if (newValue[i] != '') {
                $scope.filterValues = newValue;
                $scope.startStuffs = false;
                $scope.filteringStuffs = true;
                break;
            }
        }
    }, true);

    $scope.checkItem = function (item) {
        var filters = $scope.stuffFilters;
        var filterValues = $scope.filterValues;

        for (var filterValue in filterValues) {
            if (filterValue)
                for (var filter in filters) {
                    if (filters[filter].cat_filter_id == filterValue) {
                        if (filters[filter].filter_id == filterValues[filterValue]) {
                            if (filters[filter].stuff_id == item.stuff_id) {
                                return true;
                            }
                        }
                    }
                }
        }

        return false;
    };


    $scope.isSectionEmpty = function (section) {
        for (var stuff in section.stuffs) {
            if($scope.checkItem(section.stuffs[stuff])) {
                return false;
            }
        }

        return true;
    };

    $scope.isSectionHidden = function (section) {

        var filters = $scope.stuffFilters;
        var filterValues = $scope.filterValues;

        for (var filterValue in filterValues) {
            for (var filter in filters) {
                if (filters[filter].cat_filter_id == filterValue) {
                    if (filters[filter].filter_id != filterValues[filterValue]) {
                        if (filters[filter].filter_name == section.section_name) {
                            return true;
                        }
                    }
                }

            }
        }
        return false;
    };

    $scope.openNewStuff = function (section, checkedItems) {

        $uibModal.open({

            templateUrl: 'templates/site/newStuff.html',
            controller: function ($scope, $uibModalInstance) {

                $scope.Cancel = function () {
                    $uibModalInstance.dismiss('Cancel');
                };

                $scope.autoClose = function () {
                    $uibModalInstance.dismiss('Cancel');
                };

                $scope.addStuff = function () {

                    var newStuff = {
                        stuff_name: $scope.stuffInfo.stuffName,
                        selected: true,
                        stuff_id: section.stuffs.length * (-1)
                    };

                    section.stuffs.push(newStuff);

                    $scope.autoClose();
                    Alertify.success('Stuff was added!');
                };
            },
            size: 'sm',
            resolve:{
                stuffs: function () {
                    return userStuffs;
                },
                sections: function(){
                    return $scope.sections;
                }
            }
        });
    };

    $scope.packState = function () {
        $scope.showListContent = true;
        $scope.showChooseContent = false;

    };

    $scope.noStuffsInSection = function (section) {
        for (var stuff in section.stuffs) {
            if (section.stuffs[stuff].selected) {
                return false;
            }
        }
        return true;
    };

    $scope.noStuffsInSectionFinal = function (section) {
        for (var stuff in section.stuffs) {
            if (!section.stuffs[stuff].selected) {
                return false;
            }
        }
        return true;
    };

    $http.post('index.php?r=list/user_name').success(function(response){
        $scope.userName = response;
    });

    $scope.openList = function () {
        if($scope.userName != 0){
            $uibModal.open({

                templateUrl: 'templates/site/newListForm.html',
                controller: function ($scope, $uibModalInstance, items, filters) {

                    $scope.Cancel = function () {
                        $uibModalInstance.dismiss('Cancel');
                    };

                    $scope.autoClose = function () {
                        $uibModalInstance.dismiss('Cancel');
                    };

                    $scope.newList = function () {

                        var data = {
                            listname: $scope.listInfo.listname,
                            description: $scope.listInfo.description,
                            selectedItems: items,
                            selectedFilters: filters
                        };

                        if (items != 0) {
                            $http.post('index.php?r=list/create_list', data).success(function (response) {

                                if (JSON.parse(response) != "bad") {
                                    $scope.autoClose();
                                    Alertify.success('List successfully created!');
                                }
                                else {

                                    Alertify.error("Error! List with such name exists!");
                                }
                            }).error(function (error) {
                                console.error(error);
                            });
                        }
                        else if (items == 0) {
                            $scope.autoClose();
                            Alertify.alert('Your list is empty! You should check at least 1 item!')
                        }
                    };
                },
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.checkedItems;
                    },
                    filters: function(){
                        return $scope.filterValues;
                    }
                }
            });
        }else {
            Alertify.alert("You should log in, if You want to save your list!");
        }

    };

    $scope.printDiv = function (divName) {

        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        window.location.href = "index.php?r=pack/create";

    };

    $http.post('index.php?r=list/current_list', {listID: list_ID}).success(function (response) {

        $scope.finalLists = response;

        var finalLists = $scope.finalLists;
        var finalStuffs = JSON.parse(finalLists[0].list_data);

        for (var stuffs in finalStuffs) {
            for(var j in finalStuffs[stuffs].stuffs){
                finalStuffs[stuffs].stuffs[j].selected = false;
            }
            $scope.addedStuffs.push(finalStuffs[stuffs]);
        }

        for (var finalStuff in finalStuffs) {
            for(var i in finalStuffs[finalStuff].stuffs){
                listStuffs.push(finalStuffs[finalStuff].stuffs[i].stuff_id);
            }
        }

        $scope.selectStuffFinalList(listStuffs);
    });

    $scope.selectStuffFinalList = function(stuffs, sectionName){

        var items = $scope.checkedItems;

        var temp = [];
        for(var item in items){
            temp.push(items[item].stuff_id);
        }

        var sectionFound = false;
        var sectionObject = {};

        for(var section in $scope.checkedItems) {
            if ($scope.checkedItems[section].section_name == sectionName) {
                sectionFound = true;

                if ($scope.checkedItems[section].stuffs.indexOf(stuffs) === -1) {
                    $scope.checkedItems[section].stuffs.push(stuffs);
                    crossedItems.push(stuffs);
                } else {
                    $scope.checkedItems[section].stuffs.splice($scope.checkedItems[section].stuffs.indexOf(stuffs), 1);
                    crossedItems.splice(crossedItems.indexOf(stuffs), 1);
                }
            }
        }

        if (sectionFound == false) {
            sectionObject = { section_name: sectionName, stuffs: [stuffs] };
            $scope.checkedItems.push(sectionObject);
        }

        if(listStuffs.length == crossedItems.length){
            Alertify.alert("Your bag has been packed!");
        }

    };

    $scope.backToLists = function(){
        window.location.href = "index.php?r=pack/showlists";
    };
});




