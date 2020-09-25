import React, { useState } from 'react';
import { Card} from 'react-bootstrap';
import '../css/TickerCard.css'


function TickerCard(props) {

    const [ticker, setTicker] = useState(props.ticker);

    return (
        <Card className="ticker-card">
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>{ticker.symbol}</Card.Title>
                <Card.Text>                    
                    Last Price: {ticker.lastPrice} 
                    Last Price Date: {ticker.lastPriceDate}                    
                </Card.Text>                
            </Card.Body>
        </Card>
    );
}



export default TickerCard;