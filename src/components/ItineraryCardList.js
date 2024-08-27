import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function msToDaysHours(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = ((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)).toFixed(2);

  return { days, hours };
}

function ItineraryCardList({ itinerarys, travel_id, routeDatas }) {
  return (
    <div className="card-list">
      {itinerarys.map((item, idx) => (
        <Card id={item._id}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Title>{item.address}</Card.Title>
            <Link to={`/EditItinerarys/${item._id}`} state={{ travel_id , itne: item}}>
                <Button variant="primary">Editar</Button>
            </Link>
          </Card.Body>
          {routeDatas.data[idx]? <Alert>Duração: {msToDaysHours(routeDatas.data[idx].duration).days + " Dias e " + msToDaysHours(routeDatas.data[idx].duration).hours + " horas"} Distancia: {((routeDatas.data[idx].distance)/1000).toFixed(2) + " Kms"} </Alert> : <></>}
          
        </Card>
      ))}
    </div>
  );
}

export default ItineraryCardList;