import { useLocation, useParams, Link, useNavigate } from "react-router-dom";

import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import api from "../services/api";
import ItineraryCardList from "../components/ItineraryCardList";
import Button from 'react-bootstrap/Button';

function Itinerarys(props) {
    const { _id } = useParams();

    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [itinerarys, setItinerarys] = useState([]);
    const [routeDatas, setRouteDatas] = useState([]);
    const navigate = useNavigate();

    function deleteTravel() {
        setLoading(true);
        api.delete("/travels/remove/" + _id).then((res) => {
            setLoading(false);
            navigate("/", {
                state: { isUpload: true }
            })
        });
    }

    useEffect(() => {
        if (loading || location.state?.isUpload) {
            api.get("/itne/getAll?travel_id=" + _id).then((res) => {
                setItinerarys(res.data);
                api.get("/data/" + _id).then((res) => {
                    setRouteDatas(res.data[0]);
                    setLoading(false);
                });
            }).catch((err) => {
                console.log(err);
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
                <h2 className="me-3">Itinerários</h2> {/* Adiciona um espaçamento à direita com a classe `me-3` */}
                <div>
                    <Link to={`/addItinerary/${_id}`} state={{count: itinerarys.length}}>
                        <Button variant="primary" className="btn btn-primary me-2">
                            Adicionar Itinerário
                        </Button>
                    </Link>
                    <Button variant="danger" onClick={deleteTravel} className="btn btn-danger">
                        Excluir Viagem
                    </Button>
                </div>
            </div>
            <ItineraryCardList itinerarys={itinerarys} travel_id={_id} routeDatas={routeDatas} />
        </div>
    );
}

export default Itinerarys;