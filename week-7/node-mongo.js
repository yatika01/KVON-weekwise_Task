const { MongoClient, Collection } = require("mongodb");
const url = "mongodb+srv://yatikakumawat13:Yatika%40123@cluster0.1ybvl6d.mongodb.net/mydb?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected!");
    const dbo = client.db("mydb");
    // await dbo.createCollection("customers");                                                          //collection creation
    // console.log("Collection created!");

    // const myobj = [ 
    //     { name: 'John', address: 'Highway 71' },
    //     { name: 'Peter', address: 'Lowstreet 4' },
    //     { name: 'Amy', address: 'Apple st 652' },
    //     { name: 'Hannah', address: 'Mountain 21' },
    //     { name: 'Michael', address: 'Valley 345' }
    //   ];
    
    // const result = await dbo.collection("customers").insertMany(myobj);                                      //insertion
    // console.log(result.insertedCount);


    // const result = await dbo.collection("customers").find().toArray();                                       //find
    // const result = await dbo.collection("customers").find({}, {projection: {_id:0}}).toArray();              //find some with projection
    // console.log(result);


    // const query = {name : /^H/};
    // const result = await dbo.collection("customers").find(query).toArray();                                //query
    // console.log(result);


    // var mysort = {address:1};
    // var mysort = {name:-1};
    // const result = await dbo.collection("customers").find().sort(mysort).toArray();                           //sort
    // console.log(result);


    // var query = {name:{$in:['Amy','Peter']}};
    // const result = await dbo.collection("customers").deleteMany(query);                           //delete
    // console.log(result.deletedCount);


    // var query = {name: 'Hannah'};
    // var newValues = {$set: {name:'Minnie'}}
    // const result = await dbo.collection("customers").updateMany(query,newValues);                           //update
    // console.log(result);


    // const result = await dbo.collection("customers").find().limit(2).toArray();                           // limit
    // console.log(result);

  
    //----------------------------------------------------------------------------------------------
    // await dbo.createCollection("product");
    // console.log("collection created");
    // const products = [
    //   { product_id: 101, name: "Laptop", price: 75000, customer_name: "Minnie" },
    //   { product_id: 102, name: "Mobile", price: 25000, customer_name: "Michael" },
    //   { product_id: 103, name: "Headphones", price: 5000, customer_name: "Minnie" },
    //   { product_id: 104, name: "Keyboard", price: 1500, customer_name: "Lucy" }
    // ];
    // const result = await dbo.collection("product").insertMany(products);
    // console.log(result.insertedCount);

    const result = await dbo.collection("customers").aggregate([                                        //join using $lookup
      {
      $lookup:{
        from: "product",
        localField: "name",
        foreignField: "customer_name",
        as: "ordered_products"
      }
    }]).toArray();
    result.forEach(res => {
      console.log(JSON.stringify(res));
    })
    

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
run();