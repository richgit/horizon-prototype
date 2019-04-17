import Layout from '../components/Layout.js'
import 'react-table/react-table.css'
import * as React from "react";
import Prismic from 'prismic-javascript';
import * as PrismicDOM from "prismic-dom";

const apiEndpoint = "https://horizon-prototype.prismic.io/api/v2";

export default class Index extends React.Component {

    static async getInitialProps({req, query}) {
        const data = await Prismic.getApi(apiEndpoint, {req: req})
            .then(api => {
                return api.query(
                    Prismic.Predicates.at('document.type', 'blog_post'),
                    {orderings: '[my.blog_post.date desc]'}
                );
            })
            .catch(err => console.log(err));

        return {blogs: data.results};
    }

    static async getInitialPropsOld(ctx) {

        console.log('getInitialProps');

        var Prismic = require('prismic-javascript');


        const blogs = await Prismic.getApi(apiEndpoint, {req: ctx.req})
            .then(function (api) {
                return api.query(
                    Prismic.Predicates.at('document.type', 'blog_post'),
                    {orderings: '[my.blog_post.date desc]'}
                ); // An empty query will return all the documents
            }).then(function (response) {
                console.log("Documents: ", response.results);
            }, function (err) {
                console.log("Something went wrong: ", err);
            });

        console.log('return', blogs);
        return {'blogs': blogs};
        // return {
        //     blogs: this.blogs.map(entry => entry)
        // }
    };


    render() {

        console.log('this.props.blogs', this.props.blogs);
        return (
            <Layout>

                <h1>Welcome</h1>


                {this.props.blogs.map(function (blog, index) {
                    return (
                        <div key={index}>
                            <div>
                                {blog.data.title[0].text}
                            </div>

                        </div>
                    );
                })}


                <div className="card mt-4">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-header">
                        Featured
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional
                            content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

            </Layout>
        )
    }
}

