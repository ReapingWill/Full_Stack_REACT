// TransactionForm.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewTransaction from './TransactionCreate'



function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
 }
 

const Transactions = ( props ) => (
  <tr>
    <td>{props.transactions.first_name} {props.transactions.last_name}</td>
    <td>{props.transactions.amount}</td>
    <td>{formatDate(props.transactions.date)}</td>
  </tr>
);
  
export default function TransactionsList(userData,userId) {
  const [refresh, setRefresh] = useState(false);
 const [transactions, setTransactions] = useState([]);
  // This method fetches the records from the database.
 useEffect(() => {
   async function getTransactions() {
     const response = await fetch(`http://localhost:5000/transactions/`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const transactions = await response.json();
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(transactions);
   }
    getTransactions();
    return;
}, [refresh]);

// Callback function to handle new transactions
const handleNewTransaction = (newTransaction) => {
  setTransactions([newTransaction, ...transactions]);
  setRefresh(!refresh);
};

// This method will map out the transactions on the table
function transactionsList(){
  
  return transactions.slice(0, 10).map((transactions) => {
    return (
      <Transactions
        transactions={transactions}
        key={transactions._id}
      />
    );
  });
}
// This following section will display the table with the records of individuals.
return(
  <Container>
  <Row>
    <Col>
      <Card>
      <h3>Transactions</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{transactionsList()}</tbody>
      </table>
      </Card>
  </Col>
    <Col>
    <Card>
      <NewTransaction onNewTransaction={handleNewTransaction}/>
    </Card>
    </Col>
  </Row>
  </Container>
)
  
}
  
   



/// Create schema consisting of id, date, amount
// 