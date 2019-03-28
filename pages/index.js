import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import 'react-table/react-table.css'
import * as React from "react";

export default class Index extends React.Component {

    constructor (props) {
        super(props)
        console.log('index:constructor');
    }

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



        return (
            <Layout>

                <h1>Welcome 1</h1>


            </Layout>
        )
    }
}

