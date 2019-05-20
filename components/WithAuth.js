import React from 'react';
import RedirectTo from "./RedirectTo";
import {getCookie} from "../utils/Cookies";

const WithAuth = (WrappedComponent) => {
    class HOC extends React.Component {

        static async getInitialProps(ctx) {

            console.log('withAuth:getInitialProps');

            const token = getCookie('pronto-token', ctx.req);

            console.log('token from cookie', token)

            if (!token) {
                console.log('WithAuth: redirecting')
                RedirectTo(ctx, '/login')
            }

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx))

            return {...componentProps, token}
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    return HOC;
}

export default WithAuth;