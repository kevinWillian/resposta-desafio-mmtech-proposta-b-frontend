import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import TravelCardList from './../components/TravelCardList.js'

import api from '../services/api.js';
import { Link, useLocation  } from 'react-router-dom';

function Travels() {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        if(loading || location.state?.isUpload){
            api.get("/travels/getAll").then((res) => {
                setTravels(res.data);
                setLoading(false);
            });
        }
    }, [location.state?.isUpload]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Viagens</h2>
                <Link to="addTravel">
                    <Button className="btn btn-primary">Adicionar Viagem</Button>
                </Link>
            </div>
            <TravelCardList travels={travels}></TravelCardList>
        </div>
    );

}

export default Travels;