
var app = angular.module('todoApp', []);

app.controller('createTodoController', function($scope,$http) {
   $scope.createTodo = function(){
       //console.log($scope.todo);
       $http.post('api/create/todo', $scope.todo)
        .then(function(success){
            //success callback
            console.log($scope.todo);
            console.log(success.status);
        }, function(error){
            //error callback
            console.log(error.status);
            
        });
   }
   

});



app.controller("myCtrl", function($scope, $http) {
    
    $http.get("api/get/tasks")
		.then(function (tasks) {
			$scope.tasks = tasks;
			//console.log(tasks);
		});
    
    
    
    
    $scope.deleteTask = deleteTask;
    
    function deleteTask(taskId) {
	    $http.delete("/api/delete/task/"+taskId)
		    .then(function(){
			    //success callback
				console.log('success');
				
			},function(error){
				//error callback
				console.log('Error');
		});
	}			

    
});



  