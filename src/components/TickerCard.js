import React, { useState } from 'react';
import { Card} from 'react-bootstrap';
import '../css/Tickers.css'


function TickerCard(props) {

    const [ticker, setTicker] = useState(props.ticker);

    return (
        <Card className="item">
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