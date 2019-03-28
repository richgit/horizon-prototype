// www/pages/login.js

import {Component} from 'react'
import Layout from "../components/Layout";
import {removeCookie} from "../utils/Cookies";

class Logout extends Component {

    constructor (props) {
        super(props)
        console.log('login:constructor');

        this.state = {error: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {

        event.preventDefault()

        // const url = this.props.apiUrl

        try {

            removeCookie('pronto-token');

        } catch (error) {
            console.error(
                'You have an error in your code.',
                error
            )
            throw new Error(error)
        }
    }

    render() {
        return (
            <Layout>
                <div className='login'>
                    <form onSubmit={this.handleSubmit}>


                        <button type='submit'>Logout</button>

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

export default Logout