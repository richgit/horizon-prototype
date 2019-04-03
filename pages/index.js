import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import 'react-table/react-table.css'
import * as React from "react";
import {getCookie} from "../utils/Cookies";
import {getBaseApiUrl} from "../utils/Requests";

export default class Index extends React.Component {

    constructor(props) {
        super(props)
        console.log('index:constructor');
    }

    render() {


        return (
            <Layout>

                <h1>Welcome</h1>


            </Layout>
        )
    }
}

