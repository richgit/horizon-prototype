import React from 'react'
import Layout from "../components/Layout";

export default class About extends React.Component {
    static getInitialProps ({ req }) {
        if (req) {
            // Runs only in the server
            return { name: 'Richard' }
        }

        // Runs only in the client
        return { name: 'Arunoda' }
    }

    render () {
        const { name } = this.props
        return (
            <Layout>

                <h1>About Page</h1>
                <p>Welcome, {name}</p>

            </Layout>
        )
    }
}