import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { useAuth0 } from "@auth0/auth0-react";

const url = 'http://localhost:8080/allPositions';




function Positions() {


    const isAuthenticated = useAuth0();

    const [positionList, setPositionList] = useState(null);
    const [loaded, setloaded] = useState(false);


    useEffect(() => {
        if (!loaded) getPositions();
    });

    async function getPositions() {
        const positionRes = await Axios.get(url, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });

        positionRes.data.map(e => {
            e.avgBuyPrice = e.avgBuyPrice.toFixed(2);
            e.totalPositionBought = e.totalPositionBought.toFixed(2);
            e.result = e.result.toFixed(2);
            e.resultPercent = e.resultPercent.toFixed(2);
        }
        );
        setPositionList(positionRes);
        setloaded(true);
    }

    const columns = [
        {
            dataField: 'symbol',
            text: 'Papel',
            sort: true
        },
        {
            dataField: 'totalUnitsBought',
            text: 'Total Comprado',
            sort: true
        },
        {
            dataField: 'avgBuyPrice',
            text: 'PM Compra',
            sort: true
        },
        {
            dataField: 'totalUnitsSold',
            text: 'Total Vendido',
            sort: true
        },
        {
            dataField: 'avgSellPrice',
            text: 'PM Venda',
            sort: true
        },
        {
            dataField: 'currentOwnedUnits',
            text: 'Quantidade Atual',
            sort: true
        },
        {
            dataField: 'totalPositionBought',
            text: 'Posição Comprada',
            sort: true
        },
        {
            dataField: '123',
            text: 'L/P Trades (R$)',
            sort: true
        },
        {
            dataField: '321',
            text: 'Proventos',
            sort: true
        },
        {
            dataField: 'currentPrice',
            text: 'Cotação atual',
            sort: true
        },
        {
            dataField: 'result',
            text: 'L/P Aberto (R$)',
            sort: true
        },
        {
            dataField: 'resultPercent',
            text: 'L/P Aberto (%)',
            sort: true
        },
    ];

    const defaultSorted = [{
        dataField: 'symbol',
        order: 'asc'
    }];

    if (isAuthenticated) {
        return (
            loaded ?
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={positionList.data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
                : <p>Loading...</p>
        );
    } else {
        return (<p>Not auth</p>);
    }

}

export default Positions;