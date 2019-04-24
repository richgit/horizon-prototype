// www/pages/login.js

import {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from "../components/Layout";
import {setCookie} from "../utils/Cookies";

const LOGIN_URL = 'https://aquaheat-xi-03.prontohosted.com.au/';

class Login extends Component {

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

        this.state = {username: '', password: '', error: ''}
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

        try {
            // login(this.state.username, this.state.password)
            const response = await fetch(this.LOGIN_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username,
                    password
                })

            })
            if (response.ok) {
                const {token} = await response.json()
                console.log('got token from API', token);
                setCookie('pronto-token', token);
                // login({ token })
            } else {
                console.error('Login failed.')
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error
            )
            throw new Error(error)
        }
    }

    render() {
        return (
            <Layout>
                <div className="alert alert-warning" role="alert">
                    You need to log on to access resticted areas of this site.
                </div>
                <form className="mx-5" onSubmit={this.handleSubmit}>
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

            </Layout>
        )
    }
}

export default Login