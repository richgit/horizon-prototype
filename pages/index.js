import Layout from '../components/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import * as React from "react";
import WithAuth from "../components/WithAuth";

class Index extends React.Component {

    static async getInitialProps() {

        console.log('index:getInitialProps');

        const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        const data = await res.json()

        console.log(`Show data fetched. Count: ${data.length}`)

        return {
            shows: data.map(entry => entry.show)
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

const WrappedComponent = (Index);

export default WrappedComponent;

