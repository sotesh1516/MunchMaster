const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db = mongoose
  .connect("mongodb://localhost:27017/MunchMaster")
  .then(() => {
    console.log('database is connected');
  });

//create a schema for vitamins
//sub-schema
const vitaminsSchema = new mongoose.Schema({
  vitaminD: String,
  calcium: String,
  iron: String,
  potassium: String,
});

//create a schema for nutrients info
//sub-schema
const nutrientsSchema = new mongoose.Schema({
  totalFat: String,
  saturatedFat: String,
  transFat: String,
  cholesterol: String,
  sodium: String,
  totalCarbohydrate: String,
  dietaryFiber: String,
  sugars: String,
  protein: String,
  vitamins: vitaminsSchema,
});

//create a schema for VT foods
//main schema
const menuSchema = new mongoose.Schema({
  label: {
    type: String,
    require: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  caloriesFromFat: {
    type: Number,
    required: true,
  },
  nutrients: {
    type: nutrientsSchema,
    require: true,
  },
});

//create a model/collection to add VT foods
const vtFood = new mongoose.model("vtFood", menuSchema);

//a middleware that handles data conversion from JSON to object and object to JSON
app.use(express.json());

//a GET request to access a single data/food
app.get("/foods/:id", (req, res) => {
  vtFood.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        console.log(data);
        res.send({ message: "inquiry successful", data: data });
      } else {
        console.log({ message: "Data not found" });
        res.status(404).send("No data found for the given calories.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error has occured");
    });
});

//a GET request to access all the data/foods
app.get("/foods", (req, res) => {
  vtFood.find()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({'err' : err});
    });
  //res.send({'message':"inquiry successful"});
});

//a POST request to add food into the database
app.post("/foods", (req, res) => {
  const foodToBeAdded = req.body;
  if (typeof foodToBeAdded === "object") {
    vtFood.create(foodToBeAdded);
  } else if (Array.isArray(foodToBeAdded)) {
    for (let i = 0; i < foodToBeAdded.length; i++) {
      vtFood.create(foodToBeAdded[i]);
    }
  }

  res.send({ message: "food has been successfully added" });
});

app.delete("/foods", (req, res) => {
  vtFood.deleteMany({})
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
    res.send('deletion successful')
});

app.delete("/foods/:id", (req, res) => {
  vtFood.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
    res.send('deletion successful')
});

app.put('/foods/:id', (req, res) => {
    
    const food = req.body;
    vtFood.updateOne({_id: req.params.id, food}).then((info) => {
        console.log(info)
        res.send({message: "item has been updated"})
    })
})
app.listen(3000, () => {
  console.log("server is running");
});
