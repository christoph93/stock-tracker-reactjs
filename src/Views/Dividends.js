import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { useAuth0 } from "@auth0/auth0-react";
import FileUploader from '../components/FileUploader';
import config from '../config/apiconfig'

const url = `${config.apiBasePath}/allDividendsByUser`;




function Dividends() {


    const {isAuthenticated, user} = useAuth0();

    const [dividendList, setDividendList] = useState(null);
    const [loaded, setloaded] = useState(false);

    useEffect(() => {
        if (!loaded) getDividends();
    });

    async function getDividends() {
        const dividendRes = await Axios.get(url, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            params: {'userId' : user.sub.replace('|', '-')}
        });

        dividendRes.data.map(e => {
            e.payDate = e.payDate.substring(0, 10);
        }
        );
        setDividendList(dividendRes);
        setloaded(true);
    }

    const columns = [
        {
            dataField: 'symbol',
            text: 'Papel',
            sort: true
        },
        {
            dataField: 'description',
            text: 'Descrição',
            sort: true
        },
        {
            dataField: 'payDate',
            text: 'Data de Pagamento',
            sort: true
        },
        {
            dataField: 'grossValue',
            text: 'Valor Bruto',
            sort: true
        },
        {
            dataField: 'taxValue',
            text: 'Custos',
            sort: true
        },
        {
            dataField: 'netValue',
            text: 'Valor líquido',
            sort: true
        }        
    ];

    const defaultSorted = [{
        dataField: 'symbol',
        order: 'asc'
    }];

    if (isAuthenticated) {
        return (
            <Container>
                <FileUploader path="uploadDividends" callback={getDividends}/>

            {loaded ?
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={dividendList.data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                />
                : <p>Loading...</p>}
            </Container>
        );
    } else {
        return (<p>Not auth</p>);
    }

}

export default Dividends;