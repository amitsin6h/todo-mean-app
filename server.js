//calling express library
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo');

//creating model
var TaskSchema = mongoose.Schema({
	task: {type:String}
}, {collection: 'task'});

var TaskModel = mongoose.model("TaskModel", TaskSchema);



//configure app
app.use('/app', express.static(__dirname + '/app')); //use static file
app.use(bodyparser.json()); // for parsing application/json
app.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//GET request 
app.get('/', function(req, res){
	res.sendfile('app/index.html');
});


//POST request to save todo task in database
app.post("/api/create/todo", createTodo);
function createTodo(req, res) {
	var todoTask = req.body;
	//console.log(todoTask);
	
	//save the todoTask in db
	TaskModel
		.create(todoTask)
		.then(
			function (success) {
				console.log('Success');
			},
			function (error) {
				console.log('Error');
			}
		)
	
	res.json(todoTask);
}




//GET all task
app.get("/api/get/tasks", getAllTasks);
function getAllTasks(req, res) {
	TaskModel
	.find()
	.then(
		function (tasks) {
			res.json(tasks);
		},
		function (err) {
			res.sendStatus(400);
		});
}

//DELETE task
app.delete("/api/delete/task/:id", deleteTask);
function deleteTask(req, res) {
	var taskId = req.params.id;
	//console.log(taskId);
	TaskModel
	.remove({_id: mongoose.Types.ObjectId(taskId)})
		.then(function () {
			res.sendStatus(200);
		},
		function () {
			res.sendStatus(400)
		});
}





app.listen('8080', function(){
	console.log('Server Running!!');
});
