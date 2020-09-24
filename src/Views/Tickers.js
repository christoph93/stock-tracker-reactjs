import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import TickerCard from '../components/TickerCard';
import { useAuth0 } from "@auth0/auth0-react";
import '../css/Tickers.css';


const url = 'http://localhost:8080/allSymbols';

function Tickers(props) {

    const [symbolList, setSymbolList] = useState(null);
    const [loaded, setloaded] = useState(false);

    const isAuthenticated = useAuth0();


    useEffect(() => {
        if (!loaded) getSymbols();
    });

    async function getSymbols() {
        const symbolRes = await Axios.get(url, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
        setSymbolList(symbolRes);
        setloaded(true);
    }

    if (loaded) {
        return (
            <Container fluid className="ticker-container">
                <Row>
                    {
                        symbolList.data.map(e =>
                            <Col key={e.symbol}>
                                <TickerCard ticker={e} />
                            </Col>
                        )
                    }
                </Row>

            </Container>
        );
    } else {
        return <p>Loading</p>
    }

}


export default Tickers;