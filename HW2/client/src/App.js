import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [customerid, setcustomerid] = useState("");
  const [customername, setcustomername] = useState("");
  const [customernumber, setcustomernumber] = useState("");
  const [customerList, setcustomerList] = useState([]);
  

  // Function to add a new customer
  const addcustomer = () => {
    Axios.post("http://localhost:3001/createCustomers", {
      customer_id:customerid,
      customer_name: customername,
      customer_number: customernumber,
   
    }).then(() => {
      getcustomers(); // Refresh the customer list
    });
  };

  // Function to get the list of customers
  const getcustomers = () => {
    Axios.get("http://localhost:3001/customers").then((response) => {
      setcustomerList(response.data);
    });
  };


  // Function to update a customer's information
  const updatecustomer = (customerId) => {
    const newcustomername = prompt("Enter new customername:");
    if (newcustomername !== null) {
      Axios.put(`http://localhost:3001
      /updatecustomer/${customerId}`, {
        new_customername: newcustomername,
      }).then(() => {
        getcustomers(); // Refresh the customer list
      });
    }
  };

  // Function to delete a customer
  const deletecustomer = (customerId) => {
    Axios.delete(`http://localhost:3001/deletecustomer/${customerId}`).then(() => {
      getcustomers(); // Refresh the customer list
    });
  };


  return (
    <div className="App">
      <div className="information">
      <label>customerid:</label>
        <input
          type="text"
          onChange={(event) => {
            setcustomerid(event.target.value);
          }}
        />
        <label>customername:</label>
        <input
          type="text"
          onChange={(event) => {
            setcustomername(event.target.value);
          }}
        />
        <label>customernumber:</label>
        <input
          type="text"
          onChange={(event) => {
            setgender(event.target.value);
          }}
        />
        
        <button onClick={addcustomer}>Add customer</button>
      </div>
      <div className="customers">
        <button onClick={getcustomers}>Show customers</button>

        {customerList.map((customer, index) => {
          return (
            <div className="customer" key={index}>
              <div>
                <h3>ID: {customer.customer_id}</h3>
                <h3>customername: {customer.customer_name}</h3>
                <h3>customernumber:{customer.customer_number}</h3>
                <button onClick={() => updatecustomer(customer.customer_id)}>Update</button>
                <button onClick={() => deletecustomer(customer.customer_id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;