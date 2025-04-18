//HTTP module
// var http = require('http');
// var dt = require('./firstmodule');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write("The date and time are currently: " + dt.myDateTime());
//   res.end();
// }).listen(8080);

//-----------------------------------------------------------------------------
//URL Module
// var url = require('url');
// var address = "http://localhost:8080/default.htm?month=april&year=2025";
// var q = url.parse(address,true);
// console.log(q.host);
// console.log(q.path);
// console.log(q.search);

// var qdata = q.query;
// console.log(qdata.year);


//combining http and url module(spliting query string)
// var http = require('http');
// var url = require('url');

// http.createServer(function(req,res){
//     res.writeHead(200,{'contentType':'text/html'});
//     var q = url.parse(req.url, true).query;
//     var txt = q.year + " " + q.month;
//     res.end(txt);
// }).listen(8080);

//-----------------------------------------------------------------
//FILE SYSTEM Module(read,create,update,delete,rename)
// var http = require('http');
// var fs = require('fs');
// http.createServer(function(req,res){
//     fs.readFile('demofile.html', function(err,data){    //reading file
//         res.writeHead(200,{'ContentType':'text/html'});
//         res.write(data);
//         return res.end();
//     });
// }).listen(8080);

//creating a new file and updating the file
//1.appendFile()- creates a new file if the specifies file do not exsit and if exists the conent is appended tot he end of the file
// var fs = require('fs');
// fs.appendFile('newDemofile.txt','hello user!', function(err){
//     if(err) throw err;
//     console.log('saved!');
// });

// 2.open()
// var fs = require('fs');
// fs.open('newDemofile.txt', 'r', function(err,file){
//     if(err) throw err;
//     console.log('done!')
// });

// 3.writeFile()
// var fs = require('fs');
// fs.writeFile('newDmeofile.txt', 'This is the new text!', function (err) {
//   if (err) throw err;
//   console.log('replaced!');
// });

//DELETE file
// var fs = require('fs');
// fs.unlink('newDemofile.txt', function(err){
//     if(err) throw err;
//     console.log('deleted!');
// });


//combining url and file module
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// http.createServer(function(req,res){
//     var q = url.parse(req.url, true);
//     var filename = "." + q.pathname;
//     fs.readFile(filename, function(err, data){
//         if(err){
//             res.writeHead(404, {'ContentType':'text/html'});
//             return res.write('error 404');
//         }
//         res.writeHead(200,{'ContentType':'text/html'});
//         res.write(data);
//         return res.end();
//     });
// }).listen(8080);

//-------------------------------------------------------------------------------------------
//EVENT module
// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// var myEventHandler = function(){
//     console.log('I love to eat');
// }  

// eventEmitter.on('scream', myEventHandler);

// eventEmitter.emit('scream');

//------------------------------------------------------------------------------------
//formidable module
// var http = require('http');
// var formidalbe = require('formidable');
// var fs = require('fs');

// http.createServer(function(req,res){
//     if(req.url == '/fileupload'){
//         var form = new formidalbe.IncomingForm();
//         form.parse(req, function(err, fields, files){
//         var oldpath = files.filetoupload.filepath;
//         console.log("Temporary file path:", oldpath);
//         // res.write('File uploaded to temporary path: ' + oldpath);
//         var newpath = 'C:/node-practice/' + files.filetoupload.originalFilename;
//         fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File Uploaded');
//         res.end();
//         });
//     });
//     }else{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" entype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
//     }
// }).listen(8080);


//nodemailer module----------------------------------------------------------------------------------
var nm = require('nodemailer');
var transporter = nm.createTransport({
    service : 'gmail',
    auth : {
        user : 'yatikakumawat13@gmail.com',
        pass: 'password'
    }
});
var mailoption = {
    from : 'yatikakumawat13@gmail.com',
    to : 'yatikakumawat11@gmail.com',
    sunject: 'sending nodemailer through node js',
    html : '<h1>hello</h1><p>thi sis first mail</p>'
};
transporter.sendMail(mailoption, function(error, info){
    if(error){
        console.log(error);
    } else{
        console.log('Email sent:' + info.response);
    }
});