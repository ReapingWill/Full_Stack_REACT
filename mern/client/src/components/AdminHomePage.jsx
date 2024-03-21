import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AgentCard from './AgentCard'
import TransactionCard from './TransactionCard'

const AdminHomePage = () => {
 return (
    <Container>
      <Row>
        <Col>
          <AgentCard/>
        </Col>
          <TransactionCard/>
        <Col>
          
        </Col>
      </Row>
    </Container>
 );
};

export default AdminHomePage;