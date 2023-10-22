const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "will1012",
  database: "hotel",
});

app.post("/createCustomers", (req, res) => {
  const id = req.body.customer_id;
  const name = req.body.customer_name;
  const number = req.body.customer_number;
 ;


  db.query(
    "INSERT INTO hotel.customers (customer_id,customer_name,customer_number) VALUES (?,?,?)",
    [id, name, number],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating customer");
      } else {
        
        res.status(200).send("customer created successfully");
      }
    }
  );
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM hotel.customers", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching customers");
    } else {
      res.send(result);
    }
  });
});

app.put("/updatecustomer/:id", (req, res) => {
  const id = req.params.id;
  const newcustomername = req.body.new_customername;
  db.query(
    "UPDATE hotel.customers SET customer_name = ? WHERE customer_id = ?",
    [newcustomername, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating customer");
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletecustomer/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM hotel.customers WHERE customer_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting customer");
      } else {
        res.send(result);
      }
    }
  );
});

  
app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});