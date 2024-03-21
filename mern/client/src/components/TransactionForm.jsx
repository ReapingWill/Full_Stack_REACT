// TransactionForm.js
import React from 'react';
import  Container  from 'react-bootstrap';
import  useForm  from 'react-hook-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const TransactionForm = ({ agents }) => {
 const { register, handleSubmit } = useForm();

 const onSubmit = (data) => {
    // Handle form submission
 };

 return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" {...register('amount', { required: true, min: 0 })} />
      <select {...register('agent_id', { required: true })}>
        {agents.map(agent => (
          <option key={agent.id} value={agent.id}>{agent.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
 );
};

const onSubmit = (data) => {
    if (window.confirm('Are you sure you want to submit this transaction?')) {
       fetch('/transaction', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
       })
       .then(response => response.json())
       .then(data => {
         // Handle response
       });
    }
    
   <Container>
   <Row>
     <Col>
       <h3>Agent List</h3>
       <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Full Name</th>
           <th>Region</th>
           <th>Rating</th>
           <th>Fee</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody></tbody>
       </table>
   </Col>
   </Row>
   </Container>
   };


export default TransactionForm;
