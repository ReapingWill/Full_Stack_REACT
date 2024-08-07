import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Create() {

  const NotifySuccess = () => toast.success("Agent Created", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });
const NotifyFail = () => toast.error("Failed To Create Agent",{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });





 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   region: "",
   rating: "",
   fee: "",
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
    try{
   const newPerson = { ...form };
    await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   NotifySuccess();
  }catch(error){
    NotifyFail();
     window.alert(error);
     return;
   };
    setForm({ first_name: "", last_name: "", region: "", rating: "", fee: "" });
   navigate("/AdminHomePage");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Agent</h3>
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
         <label htmlFor="region">Region</label>
         <input
           type="text"
           className="form-control"
           id="region"
           value={form.region}
           onChange={(e) => updateForm({ region: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="rating">Rating</label>
         <input
           type="text"
           className="form-control"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="fee">Fee</label>
         <input
           type="text"
           className="form-control"
           id="fee"
           value={form.fee}
           onChange={(e) => updateForm({ fee: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}