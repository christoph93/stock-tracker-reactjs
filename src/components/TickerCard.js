import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';


function TickerCard(props) {

    const [ticker, setTicker] = useState(props.ticker);

    return (
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>{ticker.symbol}</Card.Title>
                <Card.Text>    
                   <p>Last Price: {ticker.lastPrice} </p>
                    <p>Last Price Date: {ticker.lastPriceDate}</p>
                </Card.Text>                
            </Card.Body>
        </Card>
    );
}



export default TickerCard;