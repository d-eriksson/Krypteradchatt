const express = require("express");
var schedule = require('node-schedule');
var mysql = require('mysql');

// Initialize http server
const app = express();


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "134GF1570a",
  database: "TheMainFrame"
});



// Handle / route
app.get('/', function (req, res){
  res.send('Welcome to the mainframe!')
})

app.get('/messages/:roomID/', function (req, res){
	
  		var sql = "SELECT * FROM chat_messages WHERE roomID = " + mysql.escape(req.params.roomID);
  		con.query(sql , function (err, result, fields) {
    		if (err) {
				res.send("no result!");//throw err;
    		}
    		else{
    			res.send(result);
    		}
  		});
})
app.get('/messages/:roomID/:time/', function (req, res){
		
		var time = req.params.time;
		//time = time.replace('T', ' ');
		//time = time.replace('.000Z', '');
		//time = time + "+2:00";
		var sql = "SELECT * FROM chat_messages WHERE roomID = " + mysql.escape(req.params.roomID) + " AND (TIMESTAMPDIFF(second,send_time," +mysql.escape(time)+ ") < -3600)";
		//var sql = "SELECT TIMESTAMPDIFF(second,sent_time," + mysql.escape(time) + ") FROM chat_messages";
  		con.query(sql , function (err, result, fields) {
    		if (err) {
				//res.send("no result!");
				throw err;
    		}
    		else{
    			res.send(result);
    		}
  		});
  		//res.send(sql);
})
app.get('/submit/:roomID/:message/:sentby', function (req, res){
	  	
		var sql = "SELECT connected FROM chatts WHERE roomID = "+ mysql.escape(req.params.roomID);
		con.query(sql,function(err, result){
			if(err) throw err;
			if(result[0].connected == 0){
				res.send("No other user connected to this chat room!");
			}
			else{
				var sql = "INSERT INTO chat_messages (roomID, message,sentby) VALUES ("+ mysql.escape(req.params.roomID) + "," + mysql.escape(req.params.message) + "," + mysql.escape(req.params.sentby) + ")";
			  	con.query(sql, function (err, result)
			  	{
			    	if (err) throw err;
			    	console.log("1 record inserted");
			  	});
			  	res.send("");
			}
		})
	  	
})
app.get('/create/', function(req,res){
	var sql ="INSERT INTO chatts(connected) VALUES (0)";
	con.query(sql, function(err,result){
		if(err) throw err;
		s = JSON.stringify(result.insertId);
		res.send(s);
		console.log("chatt created!");
	})
})
app.get('/connect/:roomID', function(req,res){
	var sql = "UPDATE chatts SET connected=1 WHERE roomID = " + mysql.escape(req.params.roomID);
	con.query(sql, function(err, result){
		if(err) throw err;
		console.log("Connected to chatt");
	})
	res.send("Connected");
})
app.get('/lastmessage/:roomID', function(req,res){
	var sql = "SELECT * FROM chat_messages WHERE roomID= " + mysql.escape(req.params.roomID) + " ORDER BY sentby DESC LIMIT 1"
	con.query(sql,function(err,result){
		if(err) throw err;
		res.send(result);
	})
})
app.get('/listchatts/',function(req,res){
	var sql = "SELECT * FROM chatts";
	con.query(sql, function(err,result){
		if(err) throw err;
		res.send(result);
	})
})
app.get('/clear/', function(req,res){
	var sql= "DELETE FROM chatts WHERE connected=0 AND TIMESTAMPDIFF(minute,reg_date,CURRENT_TIMESTAMP()) > 30";
		con.query(sql, function(err, result){
		if(err) throw err;
		console.log("Clear!");
		res.send("");
	})
})

var removeUnconnectedChatrooms = schedule.scheduleJob('59 * * * *', function(){
  var sql= "DELETE FROM chatts WHERE connected=0 AND TIMESTAMPDIFF(minute,reg_date,CURRENT_TIMESTAMP()) > 30";
		con.query(sql, function(err, result){
		if(err) throw err;
		console.log("Clear!");
	})
});



// Launch the server on port 3000
const server = app.listen(8080, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});