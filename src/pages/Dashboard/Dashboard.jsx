import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css"

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:3001/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <Container>
      <h1 className="titulo">Análise de controle</h1> <hr/>
      <Row className="row">
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Clientes cadastrados</Card.Title>
              <Card.Text>{dashboardData?.totalCliente}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Pets cadastrados</Card.Title>
              <Card.Text>{dashboardData?.totalPet}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Produtos cadastrados</Card.Title>
              <Card.Text>{dashboardData?.totalProduto}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Serviços cadastrados</Card.Title>
              <Card.Text>{dashboardData?.totalServico}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card">
            <Card.Body className="body">
              <Card.Title>Agendamentos realizados</Card.Title>
              <Card.Text>{dashboardData?.totalAgendamento}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row> 
    </Container> 
  );
}
