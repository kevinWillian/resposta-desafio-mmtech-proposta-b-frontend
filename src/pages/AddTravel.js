import React, { useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function AddTravel() {
    const addName = useRef(null);
    

    const navigate = useNavigate();

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

    function AddTravel(){
        let addTravel = {
            name: addName.current.value,
        }
        api.post("/travels/create", addTravel ).then((res) =>{
            navigate("/", {
                state: { isUpload: true }
            })
        })
    }

    return (
        <div style={containerStyle}>
            <div style={squareStyle}>
                <Form>
                    <Form.Group className="mb-3" controlId="addTravelForm.ControlName">
                        <Form.Label>Nome da Viagem</Form.Label>
                        <Form.Control ref={addName} type="text" placeholder="Tour Brasil" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="addTravelForm.ControlOptions">
                        <Link to="/">
                            <Button variant="danger">Cancelar</Button>
                        </Link>
                        <Button onClick={AddTravel} variant="success">Salvar</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default AddTravel;