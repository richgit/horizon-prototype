import Layout from '../components/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as React from "react";
import WithAuth from "../components/WithAuth";
import {getCookie} from "../utils/Cookies";
import {getBaseApiUrl} from "../utils/Requests";

class ReactiveJobs extends React.Component {
    static async getInitialProps(ctx) {

        console.log('reactivejobs:getInitialProps');

        try {
            const token = getCookie('pronto-token', ctx.req);

            const baseUrl = getBaseApiUrl(ctx.req);

            console.log('baseUrl',baseUrl)

            const res = await
                fetch(`${baseUrl}/api/pronto/getJobs`, {
                    method: "GET",
                    headers: {
                        'X-Pronto-Token': token
                    },
                })

            const data = await res.json()

            console.log(`Show data fetched. Count: ${data.length}`)

            return {
                shows: data.map(entry => entry.show)
            }


        } catch (err) {
            console.log('ERROR in call to API');

        }

    }

    render() {

        const columns = [
            {
                Header: 'Name',

                accessor: 'name', // String-based value accessors!
                Cell: props => <Link as={`/p/${props.original.id}`} href={`/post?id=${props.original.id}`}>
                    <a>{props.value}</a>
                </Link>
            },
            {
                Header: 'Language',
                accessor: 'language',
            },
            {
                Header: 'Premiered',
                accessor: 'premiered',
            },
            {
                Header: 'Rating Average',
                accessor: 'rating.average',
            },
        ]

        return (
            <Layout>

                <h1>Batman TV Shows</h1>

                <ReactTable
                    data={this.props.shows}
                    columns={columns}
                    defaultPageSize={5}
                />

            </Layout>
        )
    }
}

const WrappedComponent = WithAuth(ReactiveJobs);

export default WrappedComponent;