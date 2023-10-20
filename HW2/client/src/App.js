import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [Customer_ID, setCustomer_ID] = useState("");
  const [Customer_Name, setCustomer_Name] = useState("");
  const [Customer_Number, setCustomer_Number] = useState("");

//

  const addcustomer = () => {
    Axios.post("http://localhost:3001/customer", {
      Customer_ID: ID,
      Customer_Name: Name,
      Customer_Number: Number,
    }).then(() => {
      getcustomer();
    });
  };

  const getcustomer = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      setcustomerList(response.data);
    });
  };

  const formatData = (dataString) => {
    const data = new Data(dataString);
    return data.toLocaleDateString();
  };

  const updatecustomer = (Customer_ID) => {
    const newCustomername = prompt("Enter New Customer Name:");
    if (newCustomername !== null) {
      Axios.put(`http://localhost:3001/updatecustomer/${Customer_ID}` , {
    }).then({} => {
      getcustomer();
    });
    }
  };

  const deletecustomer = (Customer_ID) => {
    Axios.get(`http://localhost:3001/deletecustomer/${Customer_ID}`).then(() => {
      getcustomer();
    });
  };

  const searchcustomer = () => {
    Axios.get(`http://localhost:3001/searchcustomer?search=/${searchQuery}`).then(
      (response) => {
        setSearchResults(response,data);
      }
    );
  };

  return (
    <div className="App">
      <div className="information">
        <label>Customer_ID:</label>
        <input
          type="Customer_ID"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Customer_Name:</label>
        <input
          type="Customer_Name"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Customer_Number:</label>
        <input
          type="Customer_Number"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <button onClick={addcustomer}>Add customer</button>
      </div>
      <div className="customer">
        <button onClick={getcustomer}>Show customer</button>

        {customerList.map((customer, index) => {
          return (
            <div className="customer" key={index}>
              <div>
                <h3>ID: {customer.customer_id}</h3>
                <h3>Name: {customer.customer_name}</h3>
                <h3>Number: {customer.customer_number}</h3>
                <button onClick={() => updatacustomer(customer.customer_id)}>Updata</button>
                <button onClick={() => deletecustomer(customer.customer_id)}>Delete</button>
              </div>
            </div>
          );
        })};
      </div>

      <div className="search">
        <label>Search customer:</label>
        <input
          type="text"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button onClick={searchcustomer}>Search</button>
      </div>

      {/* Display search results */}
      <div className="search-results">
        {searchResults.map((result, index) => {
          return (
            <div className="search-result" key={index}>
              {/* <p>customername: {result.customer_name}</p> */}
              <p>Ingredient: {result.ingredient_name}</p>
              <p>Expiration Date: {formatDate(result.expiration_date)}</p>
            </div>
          );
        })}
      </div>


    </div>
  );
}

export default App;