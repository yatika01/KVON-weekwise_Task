var mysql = require('mysql2');
var conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "12345678",
    database : "mydb"
});
//creating table
// conn.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//     conn.query(sql, function(err,result){
//         if(err) throw err;
//         console.log("Table created");
//     });
// });

//------------------------------------------------------------------------------------------
//inserting into table
// conn.connect(function(err){
//         if(err) throw err;
//         console.log("Connected!");
//         var sql = "INSERT INTO customers (name, address) VALUES ?";
//         var values = [
//             ['John', 'Highway 71'],
//             ['Peter', 'Lowstreet 4'],
//             ['Amy', 'Apple st 652'],
//             ['Viola', 'Sideway 1633']
//         ]
//         conn.query(sql,[values], function(err,result){
//             if(err) throw err;
//             console.log("Number of records inserted:" + result.affectedRows);
//             // console.log("Number of records inserted:" + result.insertID);
//         });
//     });


// conn.connect(function(err){
//     if(err) throw err;
//     console.log("connected");
    // var sql= "CREATE TABLE cust_info (id INT AUTO_INCREMENT PRIMARY KEY, city VARCHAR(255))";
    // var sql= "INSERT INTO cust_info (city) VALUES ?";
    // var values= [
    //     ['jaipur'],
    //     ['mumbai'],
    //     ['NY'],
    //     ['kasol']
    // ];
//     var sql= "SELECT * FROM cust_info"
//     conn.query(sql,function(err,result){
//         if(err) throw err;
//         console.log(result);
//     });
// });


//----------------------------------------------------------------------------------------------------
//SELECT FROM
// conn.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!");
//     // var sql = "SELECT * FROM customers";      //slescting everything
//     var sql = "SELECT name,id FROM customers";  //selecting columns
//     conn.query(sql, function(err,result,fields){
//         if(err) throw err;
//         // console.log( result[2].name);
//         // console.log(fields[1].name);
//     });
// });

//----------------------------------------------------------------------------------------------
// WHERE
// conn.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // var sql = "SELECT * FROM customers WHERE id='2'";
//     // var sql = "SELECT * FROM customers WHERE name LIKE '%A'";

//     var name = 'John';             //escaping variable values
//     var adr = 'Highway 71';
//     var sql = "SELECT * FROM customers WHERE address = ? OR name = ?";
//     conn.query(sql,[name,adr], function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

//-----------------------------------------------------------------------------------------------
//ORDER BY(sorting)
// conn.connect(function(err) {
//     if (err) throw err;
//     conn.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

//-----------------------------------------------------------------------------------------------
//DELETE RECORDS
// conn.connect(function(err) {
//     if (err) throw err;
//     conn.query("DELETE FROM customers WHERE id = '5'", function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       console.log(result.affectedRows);
//     });
//   });

//---------------------------------------------------------------------------------------------
//UPDATE
// conn.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!");
//     var sql = "UPDATE customers SET name = 'lucy' WHERE name='John'";
//     conn.query(sql, function(err,result){
//         if(err) throw err;
//         console.log("updated");
//         console.log(result.affectedRows + ' records updated')
//     });
// });

//-------------------------------------------------------------------------
//LIMIT
// conn.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!");
//     // var sql = "SELECT * FROM customers LIMIT 3";
//     // var sql = "SELECT * FROM customers LIMIT 3 OFFSET 1";
//     var sql = "SELECT * FROM customers LIMIT 1, 3";
//     conn.query(sql, function(err,result,){
//         if(err) throw err;
//         console.log(result);
//     });
// });

//--------------------------------------------------------------
// JOIN
// conn.connect(function(err){        
//     if(err) throw err;
//     console.log("Connected!");           //Inner join
//     var sql = "SELECT customers.name , cust_info.city FROM customers JOIN cust_info ON customers.id = cust_info.id ";
//     conn.query(sql, function(err,result,){
//         if(err) throw err;
//         console.log("combined:")
//         console.log(result);
//     });
// });


// conn.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!");       //left join
//     // var sql= "DELETE FROM cust_info WHERE id='4'";
//     var sql = "SELECT customers.name , cust_info.city FROM customers LEFT JOIN cust_info ON customers.id = cust_info.id ";
//     conn.query(sql, function(err,result,){
//         if(err) throw err;
//         console.log("left joined")
//         console.log(result);
//     });
// });


conn.connect(function(err){
    if(err) throw err;
    console.log("Connected!");       //right join
    // var sql= "DELETE FROM customers WHERE id='2'";
    var sql = "SELECT customers.name , cust_info.city FROM customers RIGHT JOIN cust_info ON customers.id = cust_info.id ";
    conn.query(sql, function(err,result,){
        if(err) throw err;
        console.log("right joined");
        console.log(result);
    });
});