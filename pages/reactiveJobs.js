import Layout from '../components/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as React from "react";
import WithAuth from "../components/WithAuth";
import {getCookie} from "../utils/Cookies";
import parse from "xml-parser";
import {getBaseApiUrl, xmlToJson} from "../utils/Requests";


class ReactiveJobs extends React.Component {
    static async getInitialProps(ctx) {

        console.log('reactivejobs:getInitialProps');

        const token = getCookie('pronto-token', ctx.req);

        const baseUrl = getBaseApiUrl(ctx.req);

        console.log('before fetch');
        const res = await
            fetch(`${baseUrl}/api/pronto/getJobs`, {
                method: "GET",
                headers: {
                    'X-Pronto-Token': token
                },
            })

        const xmlString = await res.text() // TODO do we need this?

        const jsonData = parse(xmlString);

        let serviceCalls = [];
        if (jsonData.root && jsonData.root.children[1]) {
            serviceCalls = jsonData.root.children[1].children; // TODO better way to do this
        }
        return {
            serviceCalls: serviceCalls
        }

    }

    render() {

        const columns = [
            {
                Header: 'Call Number',
                accessor: 'children[2].content', // String-based value accessors!
                Cell: props => <Link as={`/reactiveJobDetail?${props.value}`} href={`/reactiveJobDetail?id=${props.value}`}>
                    <a>{props.value}</a>
                </Link>
            },
            {
                Header: 'Description',
                accessor: 'children[1].content',
                style: {'white-space': 'unset'},
            }, {
                Header: 'Customer Code',
                accessor: 'children[3].content',
            },
            {
                Header: 'Customer Name',
                accessor: 'children[4].content',
                style: {'white-space': 'unset'},
            },
            {
                Header: 'Action',
                accessor: 'children[0].content',
            },
            {
                Header: 'Status',
                accessor: 'children[8].content',
                style: {'white-space': 'unset'},            },
            {
                Header: 'Priority',
                accessor: 'children[6].content',
            },
            {
                Header: 'Required Date',
                accessor: 'children[7].content',
            },
            {
                Header: 'Operator',
                accessor: 'children[5].content',
                style: {'white-space': 'unset'},
            },
        ]

        return (
            <Layout>

                <h1>Reactive Maintenance</h1>

                <ReactTable
                    data={this.props.serviceCalls}
                    columns={columns}
                    defaultPageSize={10}
                    filterable={true}
                    defaultFilterMethod={(filter, row) =>
                        (row[filter.id].toUpperCase().includes(filter.value.toUpperCase()))}
                />

            </Layout>
        )
    }
}

const WrappedComponent = WithAuth(ReactiveJobs);

export default WrappedComponent;