// www/pages/login.js

import {Component, default as React} from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from "../components/Layout";
import {setCookie} from "../utils/Cookies";
import {getBaseApiUrl} from "../utils/Requests";
import parse from "xml-parser";
import ErrorMessage from "../components/ErrorMessage";
import InfoMessage from "../components/InfoMessage";

class Login extends Component {

    static async getInitialProps(ctx) {

        const baseUrl = getBaseApiUrl(ctx.req);

        return {
            baseUrl: baseUrl
        }

    }

    // static getInitialProps ({ req }) {
    // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    //
    // const apiUrl = process.browser
    //     ? `${protocol}://${window.location.host}/api/login.js`
    //     : `${protocol}://${req.headers.host}/api/login.js`

    // return { apiUrl }
    // }

    constructor(props) {
        super(props)
        console.log('login:constructor');

        this.state = {username: '', password: '', error: '', message:''}
        // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handleChange (event) {
    //     this.setState({ username: event.target.value })
    // }

    async handleSubmit(event) {

        console.log(this.state)
        event.preventDefault()
        const username = this.state.username
        const password = this.state.password
        // const url = this.props.apiUrl

        // try {
        console.log('window.location.hostname', window.location.hostname);

        const response = await fetch(`${this.props.baseUrl}/api/pronto/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Pronto-Username': username,
                    'X-Pronto-Password': password
                }
            }
        )

        const xmlString = await response.text() // TODO do we need this?
        console.log('xmlString', xmlString);
        const jsonData = parse(xmlString);
        console.log('jsonData', jsonData);

        const token = jsonData.root.children[0].content;
        if (jsonData.root.children[0].content) {
            setCookie('pronto-token', token);
            this.setState({message: 'Successful Login'})
            this.setState({error: ''})
        } else {
            this.setState({error: 'Invalid username or password'})
            this.setState({message: ''})
        }

        //     if (response.ok) {
        //         console.log('resp',response);
        //         const xmlString = await response.text()
        //         const {token} = await response.json()
        //         console.log('got token from API', token);
        //         setCookie('pronto-token', token);
        //         // login({ token })
        //     } else {
        //         console.error('Login failed.')
        //     }
        // } catch (error) {
        //     console.error(
        //         'You have an error in your code or there are Network issues.',
        //         error
        //     )
        //     throw new Error(error)
        // }
    }

    render() {
        return (
            <Layout>
                <div className="alert alert-warning" role="alert">
                    You need to log on to access restricted areas of this site.
                </div>
                <form className="m-5" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Userid</label>
                        <input type="text" className="form-control"
                               aria-describedby="emailHelp" placeholder="Enter Userid"
                               id='username'
                               name='username'
                               value={this.state.username}
                               onChange={e => this.setState({username: e.target.value})}
                               required
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"
                               placeholder="Password"
                               id='password'
                               name='password'
                               value={this.state.password}
                               onChange={e => this.setState({password: e.target.value})}
                               required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

                <InfoMessage message={this.state.message}/>
                <ErrorMessage message={this.state.error}/>

            </Layout>
        )
    }
}

export default Login;