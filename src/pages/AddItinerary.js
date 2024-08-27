import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import api from '../services/api';

function AddItinerary() {
    const { _id } = useParams();

    const [loading, setLoading] = useState(false);
    

    const location = useLocation();
    const navigate = useNavigate();

    const addAddress = useRef(null);
    const addStayDays = useRef(null);
    const addStayHours = useRef(null);

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

    function AddItne(){
        setLoading(true);
        let totalms = (addStayDays.current.value * 24 * 60 * 60 * 1000) + (addStayHours.current.value * 60 * 60 * 1000)
        const addItinerary = Object.create(null);
        addItinerary.travel_id = _id;
        addItinerary.address = addAddress.current.value;
        addItinerary.stay = totalms
        addItinerary.position = (location.state?.count + 1)

        api.post("/itne/create", addItinerary).then(async (res) => {
            await api.get("/calc/startcalc?travel_id=" + _id);

            let isCalc = true;

            while (isCalc) {
                try {
                    const response = await api.get("/calc/getIsCalc");
                    isCalc = response.data.isCalc;

                    if (!isCalc) {
                        setLoading(false);
                        navigate(`/Itinerarys/${_id}`, {
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

        console.log(addItinerary);
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
                        <Form.Control ref={addAddress} type="text" />
                        <Form.Label>Dias de Estadia</Form.Label>
                        <Form.Control ref={addStayDays} type="number" />
                        <Form.Label>Horas de Estadia</Form.Label>
                        <Form.Control ref={addStayHours} type="number" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addTravelForm.ControlOptions">
                        <Link to={`/Itinerarys/${_id}`}>
                            <Button variant="danger">Cancelar</Button>
                        </Link>
                        <Button onClick={AddItne} variant="success">Salvar</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default AddItinerary;