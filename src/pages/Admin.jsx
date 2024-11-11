import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Admin() {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Row className="g-4">
        
        {/* Add Book */}
        <Col xs={12} md={6} lg={2}>
          <Link to="/addb" style={{ textDecoration: 'none' }}>
            <Card className="h-100 text-center shadow-sm" bg="success" text="white">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📚</div>
                <Card.Title className="mt-3">Add Book</Card.Title>
                <Card.Text>Upload new books to the application.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        {/* View Books */}
        <Col xs={12} md={6} lg={3}>
          <Link to="/viewb" style={{ textDecoration: 'none' }}>
            <Card className="h-100 text-center shadow-sm" bg="info" text="white">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📖</div>
                <Card.Title className="mt-3">View Books</Card.Title>
                <Card.Text>Browse and manage all books.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        {/* View Reservations */}
        <Col xs={12} md={6} lg={3}>
          <Link to="/reservelist" style={{ textDecoration: 'none' }}>
            <Card className="h-100 text-center shadow-sm" bg="warning" text="dark">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>📝</div>
                <Card.Title className="mt-3">View Reservations</Card.Title>
                <Card.Text>Check all book reservations.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        {/* View Students */}
        <Col xs={12} md={6} lg={2}>
          <Link to="/viewS" style={{ textDecoration: 'none' }}>
            <Card className="h-100 text-center shadow-sm" bg="primary" text="white">
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>👨‍🎓</div>
                <Card.Title className="mt-3">View Students</Card.Title>
                <Card.Text>View registered students' details.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        

        {/* Edit Profile */}
        <Col xs={12} md={6} lg={2}>
          <Link to="/editprof" style={{ textDecoration: 'none' }}>
            <Card className="h-100 text-center shadow-sm" bg="dark" text="white">
              <Card.Body>
              <div style={{ fontSize: '2rem' }}>📝</div>
                <Card.Title>Edit Profile</Card.Title>
                <Card.Text>Update admin account information.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

      </Row>
    </Container>
  );
}

export default Admin;
