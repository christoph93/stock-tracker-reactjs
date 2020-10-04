import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { useAuth0 } from "@auth0/auth0-react";
import FileUploader from '../components/FileUploader';
import config from '../config/apiconfig'
import GridLoader from "react-spinners/GridLoader";

const url = `${config.apiBasePath}/transactionByUser`;




function Transactions() {


    const { isAuthenticated, user } = useAuth0();

    const [transactionList, setTransactionList] = useState(null);
    const [loaded, setloaded] = useState(false);

    useEffect(() => {
        if (!loaded) getTransactions();
    }, [loaded]);

    async function getTransactions() {
        const transactionRes = await Axios.get(url, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: { 'userId': user.sub.replace('|', '-') }
        });

        transactionRes.data.map(e => {
            e.transactionDate = e.transactionDate.substring(0, 10);
        }
        );
        setTransactionList(transactionRes);
        setloaded(true);
    }

    const columns = [
        {
            dataField: 'symbol',
            text: 'Papel',
            sort: true
        },
        {
            dataField: 'transactionDate',
            text: 'Data operação',
            sort: true
        },
        {
            dataField: 'operation',
            text: 'Operação (C/V)',
            sort: true
        },
        {
            dataField: 'description',
            text: 'Descrição',
            sort: true
        },
        {
            dataField: 'quantity',
            text: 'Quantidade',
            sort: true
        },
        {
            dataField: 'price',
            text: 'Preço',
            sort: true
        },
        {
            dataField: 'totalPrice',
            text: 'Total',
            sort: true
        },
        {
            dataField: 'transactionId',
            hidden: true
        }
    ];

    const defaultSorted = [{
        dataField: 'symbol',
        order: 'asc'
    }];

    if (isAuthenticated) {
        return (
            <Container>
                <FileUploader path="uploadTransactions" callback={getTransactions} />

                {loaded ?
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={transactionList.data}
                        columns={columns}
                        defaultSorted={defaultSorted}
                    />
                    : <GridLoader
                        css=""
                        size={50}
                        color={"#1AAEC5"}
                        loading={!loaded}
                    />
                }
            </Container>
        );
    } else {
        return (<p>Not auth</p>);
    }

}

export default Transactions;