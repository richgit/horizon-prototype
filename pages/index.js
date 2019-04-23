import Layout from '../components/Layout.js'
import 'react-table/react-table.css'
import * as React from "react";
import Prismic from 'prismic-javascript';
import * as PrismicDOM from "prismic-dom";
import Link from 'next/link'
import {RichText, Date} from 'prismic-reactjs';
import moment from "moment";

const apiEndpoint = "https://horizon-prototype.prismic.io/api/v2";

export default class Index extends React.Component {

    static async getInitialProps({req, query}) {
        const data = await Prismic.getApi(apiEndpoint, {req: req})
            .then(api => {

                return api.query(
                    Prismic.Predicates.at('document.type', 'blog_post'),
                    {orderings : '[document.last_publication_date desc]' }
                );
            })
            .catch(err => console.log(err));

        return {blogs: data.results};
    }

    render() {

        console.log('this.props.blogs', this.props.blogs);
        return (
            <Layout>
                <div className="jumbotron">
                    <h3 className="display-4">Welcome to Horizon Pronto Portal</h3>
                    <p className="lead">This is a prototype of Pronto.</p>
                    <hr className="my-4"/>
                    <p>This prototype is a 'Proof of Concept' project to demonstrate the capabilites of a web-based
                        portal</p>
                    <p>For more information, please contact Melanie Hawksworth on 021 902 405</p>
                    <p className="lead d-flex justify-content-between">
                        <Link prefetch href="/login">
                            <a className="btn btn-primary btn-lg">Login</a>
                        </Link>
                        <Link prefetch href="/reactiveJobs">
                            <a className="btn btn-primary btn-lg">Reactive Jobs</a>
                        </Link>
                    </p>
                </div>


                <h3>Latest News</h3>
                <div className="container">
                    <div className="row">
                        {this.props.blogs.map(function (blog, index) {

                            return (
                                <div key={index} className="col-sm-6 col-md-4 col-lg-3 mt-4">
                                    <div className="card">
                                        <BlogImage image={blog.data.image}/>
                                        <div className="card-body">

                                            <h5 className="font-italic">
                                                {blog.data.title[0].text}
                                            </h5>

                                            <div className="card-text">
                                                {RichText.render(blog.data.body)}
                                            </div>
                                            <BlogDate date={blog.last_publication_date}/>
                                            {/*<p className="font-italic font-weight-light">by Richard Ware</p>*/}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </Layout>
        )
    }

}


function BlogDate(props) {

    const timestamp = Date(props.date);
    const formattedDate = moment(timestamp).fromNow();
    return (
        <p className="font-weight-light">{formattedDate}</p>

    )
}

    function BlogImage(props) {

        if (props.image.url) {
            return (
                <img className="card-img-top img-fluid" src={props.image.url}
                     alt={props.image.alt}/>
            )
        }
        return '';
    }
