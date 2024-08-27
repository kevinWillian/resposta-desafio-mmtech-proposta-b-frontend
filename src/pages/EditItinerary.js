import React, { useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Spinner from 'react-bootstrap/Spinner';

function msToDaysHours(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = ((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)).toFixed(2);

    return { days, hours };
}

function EditItinerary() {
    const { _id } = useParams();

    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const travel_id = location.state?.travel_id;
    const itne = location.state?.itne;

    const editAddress = useRef(null);
    const editStayDays = useRef(null);
    const editStayHours = useRef(null);
    const editPosition = useRef(null);


    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    };

    const squareStyle = {
        width: '80vw',
        height: '80vh',
    };


    const SaveItine = async () => {
        setLoading(true);

        let days;
        if (editStayDays.current.value) {
            days = editStayDays.current.value;
        } else {
            days = msToDaysHours(itne.stay).days;
        }

        let hours;
        if (editStayHours.current.value) {
            hours = editStayHours.current.value;
        } else {
            hours = msToDaysHours(itne.stay).hours;
        }

        let totalms = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000)

        const editItinerary = Object.create(null);
        editItinerary.stay = totalms;

        editItinerary._id = _id;
        editItinerary.travel_id = travel_id;

        if (editAddress.current.value) {
            editItinerary.address = editAddress.current.value;
        }
        if (editPosition.current.value) {
            editItinerary.position = Number(editPosition.current.value);
        }

        console.log(editItinerary);

        api.put("/itne/update", editItinerary).then(async (res) => {

            await api.get("/calc/startcalc?travel_id=" + travel_id);

            let isCalc = true;

            while (isCalc) {
                try {
                    const response = await api.get("/calc/getIsCalc");
                    isCalc = response.data.isCalc;

                    if (!isCalc) {
                        setLoading(false);
                        navigate(`/Itinerarys/${travel_id}`, {
                            state: { isUpload: true }
                        })
                        break;
                    }

                    await new Promise(resolve => setTimeout(resolve, 200));

                } catch (error) {
                    console.error("Erro ao verificar o cálculo:", error);
                    break;
                }
            }
        });
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={squareStyle}>
                <Form>
                    <Form.Group className="mb-3" controlId="addTravelForm.ControlName">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control ref={editAddress} type="text" placeholder={itne.address} />
                        <Form.Label>Dias de Estadia</Form.Label>
                        <Form.Control ref={editStayDays} type="number" placeholder={msToDaysHours(itne.stay).days} />
                        <Form.Label>Horas de Estadia</Form.Label>
                        <Form.Control ref={editStayHours} type="number" placeholder={msToDaysHours(itne.stay).hours} />
                        <Form.Label>Posição</Form.Label>
                        <Form.Control ref={editPosition} type="number" placeholder={itne.position} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addTravelForm.ControlOptions">
                        <Link to={`/Itinerarys/${travel_id}`}>
                            <Button variant="danger">Cancelar</Button>
                        </Link>
                        <Button onClick={SaveItine} variant="success">Salvar</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default EditItinerary;