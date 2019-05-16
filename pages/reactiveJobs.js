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

        // console.log('parse', jsonData.root.children[1].children);

        // console.log(`RJ page: Count: ${xmlString.length}`)

        return {
            shows: jsonData.root.children[1].children // TODO better way to do this
        }

    }

    render() {

        const columns = [
            {
                Header: 'Call Number',
                accessor: 'children[2].content', // String-based value accessors!
            },
            {
                Header: 'Customer Code',
                accessor: 'children[3].content',
            },
            {
                Header: 'Customer Name',
                accessor: 'children[4].content',
            },
            {
                Header: 'Type Code',
                accessor: 'children[7].content',
            },
            {
                Header: 'Description',
                accessor: 'children[1].content',
            },
        ]

        return (
            <Layout>

                <h1>Reactive Maintenance</h1>

                <ReactTable
                    data={this.props.shows}
                    columns={columns}
                    defaultPageSize={10}
                />

            </Layout>
        )
    }
}

const WrappedComponent = WithAuth(ReactiveJobs);

export default WrappedComponent;