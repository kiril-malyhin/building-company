'use strict';

describe("listCtrl", function(){
    var scope;

    //beforeEach(angular.mock.module('myApp'));
    //
    //beforeEach(angular.mock.inject(function($rootScope, $controller){
    //    scope = $rootScope.$new();
    //    $controller('listCtrl', {$scope: scope});
    //
    //}));

    describe("Initialization", function(){
        it("Should be equal to 3",function(){
            expect(1+2).toBe(3);
        });
    });
});



//describe('listCtrl', function () {
//    beforeEach(module('myApp'));
//
//    var $controller;
//
//    beforeEach(inject(function(_$controller_){
//        // The injector unwraps the underscores (_) from around the parameter names when matching
//        $controller = _$controller_;
//    }));
//
//    //describe('$scope.grade', function() {
//    //    it('sets the strength to "strong" if the password length is >8 chars', function() {
//    //        var $scope = {};
//    //        var controller = $controller('PasswordController', { $scope: $scope });
//    //        $scope.password = 'longerthaneightchars';
//    //        $scope.grade();
//    //        expect($scope.strength).toEqual('strong');
//    //    });
//    //});
//
//    describe("Initialization", function(){
//        it("Should be equal to 3",function(){
//            var $scope = {};
//            var controller = $controller('listCtrl', { $scope: $scope });
//            expect(1+2).toBe(3);
//        });
//    });
//});



