// www/pages/login.js

import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from "../components/Layout";
import {setCookie} from "../utils/Cookies";

class Login extends Component {
    // static getInitialProps ({ req }) {
        // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
        //
        // const apiUrl = process.browser
        //     ? `${protocol}://${window.location.host}/api/login.js`
        //     : `${protocol}://${req.headers.host}/api/login.js`

        // return { apiUrl }
    // }

    constructor (props) {
        super(props)
        console.log('login:constructor');

        this.state = { username: '', password: '', error: '' }
        // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handleChange (event) {
    //     this.setState({ username: event.target.value })
    // }

    async handleSubmit (event) {

        console.log(this.state)
        event.preventDefault()
        const username = this.state.username
        const password = this.state.password
        // const url = this.props.apiUrl

        try {
            // login(this.state.username, this.state.password)
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })

            })
            if (response.ok) {
                const { token } = await response.json()
                console.log('got token from API', token);
                setCookie('pronto-token', token);
                // login({ token })
            } else {
                console.log('Login failed.')
                // https://github.com/developit/unfetch#caveats
                let error = new Error(response.statusText)
                error.response = response
                return Promise.reject(error)
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error
            )
            throw new Error(error)
        }
    }

    render () {
        return (
            <Layout>
                <div className='login'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='username'>Pronto Credentials</label>

                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                            // onChange={this.handleChange}
                        />

                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={this.state.password}
                            // onChange={this.handleChange}
                            onChange={e => this.setState({ password: e.target.value })}
                        />

                        <button type='submit'>Login</button>

                        <p className={`error ${this.state.error && 'show'}`}>
                            {this.state.error && `Error: ${this.state.error}`}
                        </p>
                    </form>
                </div>
                <style jsx>{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          form {
            display: flex;
            flex-flow: column;
          }
          label {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }
        `}</style>
            </Layout>
        )
    }
}

export default Login