import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { useAuth0 } from "@auth0/auth0-react";
import config from '../config/apiconfig'

const url = `${config.apiBasePath}/positionsByUser`;




function Positions() {


    const { isAuthenticated, user } = useAuth0();

    const [positionList, setPositionList] = useState(null);
    const [loaded, setloaded] = useState(false);


    useEffect(() => {
        if (!loaded) getPositions();
    });

    async function getPositions() {
        if (!loaded) {
            const positionRes = await Axios.get(url, {
                headers: { 'Access-Control-Allow-Origin': '*' },
                params: { 'userId': user.sub.replace('|', '-') }
            });

            positionRes.data.map(e => {
                e.avgBuyPrice = +e.avgBuyPrice.toFixed(2);
                e.totalPositionBought = +e.totalPositionBought.toFixed(2);
                e.result = +e.result.toFixed(2);
                e.resultPercent = +e.resultPercent.toFixed(2);
                e.profitLossFromSales = +e.profitLossFromSales.toFixed(2);
                e.totalDividends = +e.totalDividends.toFixed(2);
            }
            );
            setPositionList(positionRes);
            setloaded(true);
        }
    }

    const columns = [
        {
            dataField: 'symbol',
            text: 'Papel',
            sort: true,
            footer: 'Totais'
        },
        {
            dataField: 'totalUnitsBought',
            text: 'Total Comprado',
            sort: true,
            footer: columnData => columnData.reduce((acc, totalUnitsBought) => acc + +totalUnitsBought, 0)
        },
        {
            dataField: 'avgBuyPrice',
            text: 'PM Compra',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'totalUnitsSold',
            text: 'Total Vendido',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'avgSellPrice',
            text: 'PM Venda',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'currentOwnedUnits',
            text: 'Quantidade Atual',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'totalPositionBought',
            text: 'Posição Comprada',
            sort: true,
            footer: columnData => columnData.reduce((acc, totalPositionBought) => acc + +totalPositionBought, 0).toFixed(2)
        },
        {
            dataField: 'profitLossFromSales',
            text: 'L/P Trades (R$)',
            sort: true,
            footer: columnData => columnData.reduce((acc, profitLossFromSales) => acc + +profitLossFromSales, 0).toFixed(2)
        },
        {
            dataField: 'totalDividends',
            text: 'Proventos',
            sort: true,
            footer: columnData => columnData.reduce((acc, dividends) => acc + +dividends, 0).toFixed(2)
        },
        {
            dataField: 'currentPrice',
            text: 'Cotação atual',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'result',
            text: 'L/P Aberto (R$)',
            sort: true,
            formatter: resultFormatter,
            footer: columnData => columnData.reduce((acc, result) => acc + +result, 0).toFixed(2)
        },
        {
            dataField: 'resultPercent',
            text: 'L/P Aberto (%)',
            sort: true,
            formatter: resultFormatter,
            footer: 'Todo'
        },
    ];

    const defaultSorted = [{
        dataField: 'symbol',
        order: 'asc'
    }];

    const rowStyle = (row) => {
        const style = {};
        if (row.currentOwnedUnits === 0) {
            style.backgroundColor = '#cfcfcf';
        } else {
            style.backgroundColor = '#ffffff';
        }
        return style;
    }

    function resultFormatter(cell, row) {
        if (row.result < 0) {
            return (
                <span style={{ color: 'red' }}>
                    {cell}
                </span>
            );
        }

        return <span> {cell} </span>
    }

    if (isAuthenticated) {
        return (
            loaded ?
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    hover
                    condensed
                    rowStyle={rowStyle}
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