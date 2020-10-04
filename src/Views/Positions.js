import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { useAuth0 } from "@auth0/auth0-react";
import config from '../config/apiconfig'
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";

const positionEndpoint = `${config.apiBasePath}/positionById`;
const positionListEndpoint = `${config.apiBasePath}/positionIdsByUserId`;
const allPositionsEndpoint = `${config.apiBasePath}/positionsByUserId`;



function Positions() {


    const { isAuthenticated, user } = useAuth0();

    const [positionIdsList, setPositionIdsList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        //getPositionIdsList();
        getAllPositions();
    }, []);

    useEffect(() => {
        if (positionIdsList != undefined) {
            console.log(positionIdsList);
            updatePositions();
        }
    }, [positionIdsList]);



    function updatePositions() {
        //getPosition(positionIdsList[0], 0)
        var i = 1;

        function doSetTimeOut(index, positionId) {
            setTimeout(() => {
                console.log('getPosition' + positionId);
                getPosition(positionId);
            }, index * 100);
        }

        for (const positionId of positionIdsList) {
            doSetTimeOut(i, positionId);
            i++;
        }
    }

    var tempList = [];

    async function getPosition(positionId) {
        await Axios.get(positionEndpoint, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: { 'id': positionId }
        }).then(res => {
            res.data.avgBuyPrice = +res.data.avgBuyPrice.toFixed(2);
            res.data.totalPositionBought = +res.data.totalPositionBought.toFixed(2);
            res.data.totalDividends = +res.data.totalDividends.toFixed(2);
            res.data.position = +res.data.position.toFixed(2);
            res.data.tradesPercent = +res.data.tradesPercent.toFixed(2);
            res.data.trades = +res.data.trades.toFixed(2);
            res.data.openResult = +res.data.openResult.toFixed(2);
            res.data.openResultPercent = +res.data.openResultPercent.toFixed(2);
            tempList.push(res.data);
            setPositionList([]);
            setPositionList(tempList);
        }
        );
    }



    // async function getPosition(positionId, count) {
    //     if (count < positionIdsList.length) {
    //         await Axios.get(positionEndpoint, {
    //             headers: { 'Access-Control-Allow-Origin': '*' },
    //             params: { 'id': positionId }
    //         }).then(res => {
    //             getPosition(positionIdsList[count + 1], count + 1)

    //             res.data.avgBuyPrice = +res.data.avgBuyPrice.toFixed(2);
    //             res.data.totalPositionBought = +res.data.totalPositionBought.toFixed(2);                
    //             res.data.totalDividends = +res.data.totalDividends.toFixed(2);                
    //             res.data.position = +res.data.position.toFixed(2);
    //             res.data.tradesPercent = +res.data.tradesPercent.toFixed(2);
    //             res.data.trades = +res.data.trades.toFixed(2);
    //             res.data.openResult = +res.data.openResult.toFixed(2);
    //             res.data.openResultPercent = +res.data.openResultPercent.toFixed(2);

    //             tempList.push(res.data);
    //             setPositionList([]);
    //             setPositionList(tempList);

    //         },
    //             err => {
    //                 if (err) console.log(err)
    //             }
    //         );
    //     }
    // }

    function getAllPositions() {
        Axios.get(allPositionsEndpoint, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: { 'userId': user.sub.replace('|', '-') }
        }).then(res => {
            setPositionList(res.data)
            setLoading(false);
        }
        );
    }


    async function getPositionIdsList() {
        await Axios.get(positionListEndpoint, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: { 'userId': user.sub.replace('|', '-') }
        }).then(res => {
            if (res.data.length === 0) {
                getAllPositions();
            } else {
                setPositionIdsList(res.data);
            }

        });
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
            footer: '-',
            formatter: doubleFormatter
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
            footer: '-',
            formatter: doubleFormatter
        },
        {
            dataField: 'currentOwnedUnits',
            text: 'Quantidade Atual',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'trades',
            text: 'Trades',
            sort: true,
            footer: columnData => columnData.reduce((acc, profitLossFromSales) => acc + +profitLossFromSales, 0).toFixed(2),
            formatter: tradesFormatter
        },
        {
            dataField: 'totalDividends',
            text: 'Proventos',
            sort: true,
            footer: columnData => columnData.reduce((acc, dividends) => acc + +dividends, 0).toFixed(2),
            formatter: doubleFormatter
        },
        {
            dataField: 'currentPrice',
            text: 'Cotação atual',
            sort: true,
            footer: '-'
        },
        {
            dataField: 'position',
            text: 'Posição',
            sort: true,
            footer: columnData => columnData.reduce((acc, totalPositionBought) => acc + +totalPositionBought, 0).toFixed(2),
            formatter: doubleFormatter
        },
        {
            dataField: 'openResult',
            text: 'Resultado Aberto (R$)',
            sort: true,
            formatter: resultFormatter,
            footer: columnData => columnData.reduce((acc, result) => acc + +result, 0).toFixed(2)
        },
        {
            dataField: 'openResultPercent',
            text: 'Resultado Aberto (%)',
            sort: true,
            formatter: resultFormatter,
            footer: '-'
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

    function doubleFormatter(cell, row) {
        return (
            <span>
                {cell.toFixed(2)}
            </span>
        );
    }

    function tradesFormatter(cell, row) {
        if (row.trades < 0) {
            return (
                <span style={{ color: 'red' }}>
                    {cell.toFixed(2)}
                </span>
            );
        }

        return <span> {cell.toFixed(2)} </span>
    }

    function resultFormatter(cell, row) {
        if (row.openResult < 0) {
            return (
                <span style={{ color: 'red' }}>
                    {cell.toFixed(2)}
                </span>
            );
        }

        return <span> {cell.toFixed(2)} </span>
    }

    function renderTable() {
        return (
            loading ?
                <GridLoader
                    css=""
                    size={50}
                    color={"#1AAEC5"}
                    loading={loading}
                /> :
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
        isAuthenticated &&
        <div>
            {renderTable()}
        </div>
    );

}

export default Positions;