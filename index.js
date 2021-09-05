const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//products
app.get("/products", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db.collection("products").find({}).toArray();

    //closing the connection
    await client.close();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.get("/products/:id", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db
      .collection("products")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });

    //closing the connection
    await client.close();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.post("/create-products", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");
    //select the collection and perform action
    let data = await db.collection("products").insertOne(req.body);

    //closing the connection
    await client.close();

    res.json({
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.put("/update-product/:id", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );

    //closing the connection
    await client.close();

    res.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.delete("/delete-product/:id", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db
      .collection("products")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });

    //closing the connection
    await client.close();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

//users

app.get("/users", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db.collection("users").find({}).toArray();

    //closing the connection
    await client.close();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.get("/users/:id", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db
      .collection("users")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });

    //closing the connection
    await client.close();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.post("/create-users", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");
    //select the collection and perform action
    let data = await db.collection("users").insertOne(req.body);

    //closing the connection
    await client.close();

    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.put("/update-user/:id", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );

    //closing the connection
    await client.close();

    res.json({
      message: "Users updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.delete("/delete-user/:id", async function (req, res) {
  try {
    //connect the DB
    let client = await mongoClient.connect(url);

    //select DB
    let db = client.db("dashboardapp");

    //select the collection and perform action
    let data = await db
      .collection("users")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });

    //closing the connection
    await client.close();

    res.json({
      message: "Users deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.listen(PORT, function () {
  console.log(`App listening to the port ${PORT}`);
});
