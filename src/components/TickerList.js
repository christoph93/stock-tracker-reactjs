import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { ListGroup } from 'react-bootstrap';


const url = 'http://localhost:8080/api/symbols';


function TickerList(props) {

    const [symbolList, setSymbolList] = useState(null);
    const [loaded, setloaded] = useState(false);

     
  useEffect(() => {      
      if(!loaded) getSymbols();
  });

    async function getSymbols() {        
        const symbolRes = await Axios.get(url, {
            headers: {'Access-Control-Allow-Origin': '*'}
        });
        setSymbolList(symbolRes);
        setloaded(true);
    }

    return (
        <ListGroup>
            {
                loaded ? 
                    symbolList.data._embedded.symbols.map(e => 
                    <ListGroup.Item key={e.symbol}> {e.symbol} </ListGroup.Item>
                    )
                    : <p>Loading... </p>
            }
                    </ListGroup>


    );

}


export default TickerList;