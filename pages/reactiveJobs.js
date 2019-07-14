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
        console.log('serviceCalls[0]', serviceCalls[0])
        return {
            serviceCalls: serviceCalls
        }

    }

    render() {

        const columns = [
            {
                Header: 'Call Number',
                accessor: 'children[2].content', // String-based value accessors!
                Cell: props => <Link as={`/reactiveJobDetail?id=${props.value}`}
                                     href={`/reactiveJobDetail?id=${props.value}`}>
                    <a>{props.value}</a>
                </Link>
            },

            // {
            //     Header: 'PPP',
            //     accessor: '"children[7].content"',
            //     maxWidth: 250,
            //     filterAll: true,
            //     filterMethod: (filter, rows, column) => {
            //         matchSorter(rows, filter.value, {keys: [column.Header]});
            //     },
            //     Filter: ({filter, onChange}) => {
            //         return (
            //             <Select
            //                 value={filter ? filter.value : ''}
            //                 options={this.props.serviceCalls}
            //                 onChange={event => onChange(event.target.value)}
            //             />)
            //                     },

            {
                Header: 'Description',
                accessor: 'children[1].content',
                style: {'white-space': 'unset'},
            },
            {
                Header: 'Customer Reference',
                accessor: 'children[5].content',
                style: {'white-space': 'unset'},
            },
            {
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
                accessor: 'children[9].content',
                style: {'white-space': 'unset'},
            },
            {
                Header: 'Priority',
                accessor: 'children[7].content',
            },
            {
                Header: "Test Priority",
                accessor: "children[7].content",
                // Cell: ({value}) => (value >= 21 ? "Yes" : "No"),
                // filterMethod: (filter, row) => {
                //     if (filter.value === "all") {
                //         return true;
                //     }
                //     if (filter.value === "true") {
                //         return row[filter.id] >= 21;
                //     }
                //     return row[filter.id] < 21;
                // },
                Filter: ({filter, onChange}) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{width: "100%"}}
                        value={filter ? filter.value : ""}
                        // multi={true}
                        options={this.props.serviceCalls.map((o, i) => {
                            return { id: i, value: 'ppp', label: 'lll' };
                        })}
                    />
            },
            {
                Header: 'Required Date',
                accessor: 'children[8].content',
            },
            {
                Header: 'Operator',
                accessor: 'children[6].content',
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