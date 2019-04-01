import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import 'react-table/react-table.css'
import * as React from "react";

export default class Index extends React.Component {

    constructor(props) {
        super(props)
        console.log('index:constructor');
    }

    render() {


        return (
            <Layout>

                <h1>Welcome 1</h1>


            </Layout>
        )
    }
}

