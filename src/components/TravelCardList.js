import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function TravelCardList({ travels }) {
  return (
    <div className="card-list">
      {travels.map((item) => (
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Title>{item.name}</Card.Title>
              <Link to={`/Itinerarys/${item._id}`}>
                <Button variant="primary">Detalhes</Button>
              </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default TravelCardList;