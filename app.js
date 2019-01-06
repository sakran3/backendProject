

var sql = require('mysql');
var express=require("express");
var app = express();
var fs = require("fs");

var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myDB"
});
app.post('/addUsers/:name/:lastname/:address/:status', function(req, res){
    sql = "insert into admin (name,lastname,address,status) values('" +req.params.name +"','" +req.params.lastname+ "','"+req.params.address+"','"+req.params.status+"')";
    con.query(sql, function(err, result){
        if (err)throw err;
        var ans = JSON.stringify(result);
        res.end('success');
    });
    // fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err,data)  {
    //     data = JSON.parse(data);
    //     data["user4"] = user["user4"];
    //     res.end( JSON.stringify(data) );
    // });
});
app.get('/getUsers', function(req, res){
    //
    sql = "SELECT * FROM admin";
    con.query(sql, function(err, result){
        if (err)throw err;
        var ans = JSON.stringify(result);
        res.end(ans);
    });
    
    // fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err,data)  {
    //     console.log( data );
    //     res.end( data );
    // }); sql = "UPDATE MyGuests SET lastname='Doe' WHERE id=2";
});
app.get('/getUsers/:id', function(req, res){
    sql = "SELECT * FROM admin where adminID=" + req.params.id;
    con.query(sql, function(err, result){
        if (err)throw err;
        var ans = JSON.stringify(result);
        res.end(ans);
    });
    // fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err,data)  {
    //     console.log( data );
    //     res.end( data );
    // });
});

app.get('/updateUsers/:id/:name/:lastname/:address/:status', function(req, res){
    sql = "UPDATE admin SET name='"+req.params.name +"', lastname='" +req.params.lastname+ "', address='"+req.params.address+"', status='" + req.params.status +"' WHERE adminID="+ req.params.id;
    con.query(sql, function(err, result){
        if (err)throw err;
        res.end('success');
    });
    
    // fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err,data)  {
    //     console.log( data );
    //     res.end( data );
    // });
});

app.delete('/delUsers/:id', function(req, res){
    sql = "DELETE from admin where adminID=" + req.params.id;
    con.query(sql, function(err, result){
        if (err)throw err;
        var ans = JSON.stringify(result);
        res.end('success');
    });
    // fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err,data)  {
    //     data = JSON.parse(data);
    //     delete data["user" + req.params.index];
    //     res.end( JSON.stringify(data) );
    // });
});
var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s",host, port)
});