import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AgentCard from './agents/AgentCard.jsx'
import TransactionCard from './transaction/TransactionCard.jsx'

const AdminHomePage = ({userData,userId}) => {
 return (
    <Container>
      <Row>
        <Col>
          <AgentCard
            userData={userData}
            userId={userId}/>
        </Col>
        <Col>
        <TransactionCard
          userData={userData}
          userId={userId}/>
        </Col>
      </Row>
    </Container>
 );
};

export default AdminHomePage;