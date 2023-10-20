const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "will1012",
  database: "hotel",
});

app.post("/createcustomer", (req, res) => {
  const Customer_ID = req.body.Customer_ID;
  const Customer_Name = req.body.Customer_Name;
  const Customer_Number = req.body.Customer_Number;

  const fullUUID = uuidv4();
  const userid = fullUUID.slice(0, 16);

  db.query(
    "INSERT INTO usersystem.users (Customer_ID, Customer_Name, Customer_Number) VALUES (?,?,?,?,?,?)",
    [Customer_ID, Customer_Name, Customer_Number],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating user");
      } else {
        console.log("Customer Created with ID: " + Customer_ID);
        res.status(200).send("Customer created successfully");
      }
    }
  );
});

app.get("/customer", (req, res) => {
  db.query("SELECT * FROM hotel.customer", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching customer");
    } else {
      res.send(result);
    }
  });
});

app.put("/updatecustomer/:id", (req, res) => {
  const id = req.params.id;
  const newcustomername = req.body.new_customername;
  db.query(
    "UPDATE hotel.customer SET Customer_Name = ? WHERE Customer_ID = ?",
    [newcustomername, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating user");
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletecustomer/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM hotel.customer WHERE Customer_ID = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting user");
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/searchUsers", (req, res) => {
    const searchQuery = req.query.search || "";
  
    const sqlQuery = `
      SELECT hotel.customer.Customer_ID, hotel.book.Booking_Day, hotel.comment.Comment_content
      FROM hotel.users
      INNER JOIN hotel.book ON hotel.customer.Customer_ID = hotel.book.Customer_ID
      INNER JOIN hotel.comment ON hotel.book.Comment_content = hotel.comment.Comment_content
      WHERE hotel.customer.Customer_ID LIKE ?
      OR hotel.book.Booking_Day LIKE ?
      OR hotel.comment.Comment_content LIKE ?
    `;
  
    db.query(
      sqlQuery,
      [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error fetching search results");
        } else {
          res.send(result);
        }
      }
    );
  });

  

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});