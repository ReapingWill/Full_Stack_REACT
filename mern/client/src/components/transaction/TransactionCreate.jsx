import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function NewTransaction({onNewTransaction,userData,userId}) {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   amount: "",
   date: ""
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
  const newPerson = { ...form };
   try{
    const response = await fetch("http://localhost:5000/transactions/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   });
   
   if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

   const newTransaction = await response.json(); 
    onNewTransaction(newTransaction); // Call the callback with the new transaction
    setForm({ first_name: "", last_name: "", amount: "", date:"" });
  } catch(error) {
     window.alert(error);
     return;
   };
   
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Transaction</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="first_name">First Name</label>
         <input
           type="text"
           className="form-control"
           id="first_name"
           value={form.first_name}
           onChange={(e) => updateForm({ first_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="last_name">Last Name</label>
         <input
           type="text"
           className="form-control"
           id="last_name"
           value={form.last_name}
           onChange={(e) => updateForm({ last_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="amount">Amount</label>
         <input
           type="number"
           min='0'
           className="form-control"
           id="amount"
           value={form.amount}
           onChange={(e) => updateForm({ amount: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create Transaction"
           className="btn btn-primary submit-btn"
         />
       </div>
     </form>
   </div>
 );
}