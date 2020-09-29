import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { useAuth0 } from "@auth0/auth0-react";
import config from '../config/apiconfig'

const positionEndpoint = `${config.apiBasePath}/positionById`;

const positionListEndpoint = `${config.apiBasePath}/positionIdsByUserId`;



function Positions() {


    const { isAuthenticated, user } = useAuth0();

    const [positionIdsList, setPositionIdsList] = useState([]);
    const [positionList, setPositionList] = useState([]);


    useEffect(() => {
        getPositionIdsList();
    }, []);

    useEffect(() => {
        updatePositions();
    }, [positionIdsList]);



    function updatePositions() {
        getPosition(positionIdsList[0], 0)
    }

    var tempList = [];

    async function getPosition(positionId, count) {
        if (count < positionIdsList.length) {
            await Axios.get(positionEndpoint, {
                headers: { 'Access-Control-Allow-Origin': '*' },
                params: { 'id': positionId }
            }).then(res => {
                getPosition(positionIdsList[count + 1], count + 1)

                res.data.avgBuyPrice = +res.data.avgBuyPrice.toFixed(2);
                res.data.totalPositionBought = +res.data.totalPositionBought.toFixed(2);
                res.data.result = +res.data.result.toFixed(2);
                res.data.resultPercent = +res.data.resultPercent.toFixed(2);
                res.data.profitLossFromSales = +res.data.profitLossFromSales.toFixed(2);
                res.data.totalDividends = +res.data.totalDividends.toFixed(2);

                tempList.push(res.data);
                setPositionList([]);
                setPositionList(tempList);

            },
                err => {
                    if (err) console.log(err)
                }
            );
        }



    }

    async function getPositionIdsList() {
        await Axios.get(positionListEndpoint, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: { 'userId': user.sub.replace('|', '-') }
        }).then(res => setPositionIdsList(res.data));
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
        }
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

    function renderTable() {        
        return (
            <BootstrapTable
                bootstrap4
                keyField="id"
                hover
                condensed
                rowStyle={rowStyle}
                data={positionList}
                columns={columns}
                defaultSorted={defaultSorted}
            />
        );
    }

    return (
        isAuthenticated && renderTable()
    );

}

export default Positions;