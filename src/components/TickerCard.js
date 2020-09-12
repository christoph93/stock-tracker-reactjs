import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';


function TickerCard(props) {

    const [symbol, setSymbol] = useState(props.symbol);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>{symbol}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}



export default TickerCard;