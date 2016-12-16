//Udit Panchal

angular.module('calendarApp',[])
.controller('calendarCtrl',function($scope){
	$scope.calendar = {};
	setup();
	function setup(){
	if(localStorage.data){
		$scope.calendar = JSON.parse(localStorage.data);
		$scope.days = $scope.calendar.days;
		$scope.month = $scope.calendar.month;
	}else{

		$scope.calendar = {'days':[],'month':getCurrentMonth()};
		$scope.days = $scope.calendar.days;
		$scope.month = $scope.calendar.month;
		for(var i=1;i<=$scope.calendar.month.days;i++){
			$scope.calendar.days.push({"date":i,"events":[]});
		}
	}
}

	$scope.addEvent = function(day){
		day.editMode = true;
		day.events.push({'subject':'','start':0,'end':0,'editMode':true});
	}

	$scope.clicked = function(event,day){
		for(var i=0;i<day.events.length;i++){
			if(day.events.indexOf(event)!=i && event.start>=day.events[i].start && event.end<=day.events[i].end){
				alert('Conflicting Time, Try Again');
				day.events.splice(days.events.indexOf(event),1);
				break;
			}
		}
		event.editMode=false;
		localSave();
	}
	function getCurrentMonth() {
		var obj = {};
	    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	    var d = new Date();
	    obj.name =  month[d.getMonth()];
	    obj.year = d.getFullYear();
	    var d2 = new Date(obj.year, d.getMonth(), 0);
	    obj.days = d2.getDate();
	    obj.days ++;
	     
	    return obj;
	}
	function localSave(){
		console.log('called');
		localStorage.data = JSON.stringify($scope.calendar);
	}
})
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});



