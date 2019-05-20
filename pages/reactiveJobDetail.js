import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import 'react-table/react-table.css'
import * as React from "react";
import {getCookie} from "../utils/Cookies";
import parse from "xml-parser";
import {getBaseApiUrl} from "../utils/Requests";
import Link from "next/link";

class ReactiveJobDetail extends React.Component {

    static async getInitialProps(ctx) {

        console.log('ReactiveJobDetail:getInitialProps');

        console.log('ctx.query.id', ctx.query.id);

        const token = getCookie('pronto-token', ctx.req);

        const baseUrl = getBaseApiUrl(ctx.req);

        console.log('before fetch');
        const res = await
            fetch(`${baseUrl}/api/pronto/job`, {
                method: "GET",
                headers: {
                    'X-Pronto-Token': token,
                    'jobid': ctx.query.id
                },
            })

        const xmlString = await res.text() // TODO do we need this?

        const jsonData = parse(xmlString);
        console.log('jsonData', jsonData);

        let serviceCall = [];
        if (jsonData.root && jsonData.root.children[1]) {
            serviceCall = jsonData.root.children[1].children; // TODO better way to do this
            console.log('parse', serviceCall);
        }
        return {
            serviceCalls: serviceCall
        }
    }

    render() {

        const job = this.props.serviceCalls[0]
        console.log('job', job);

        return (
            <Layout>

                <div className="my-3 d-flex flex-column flex-md-row align-items-center flex-column-reverse justify-content-between">
                    <h1>Call Number {job.children[2].content}</h1>
                    <Link prefetch href="/reactiveJobs">
                        <a className="my-sm-3 btn btn-primary btn-lg">Back to all Reactive Jobs</a>
                    </Link>
                </div>

                <div className="jumbotron p-4">
                    <div className="lead d-flex flex-column flex-md-row align-items-center justify-content-between">
                        <h2><span className="badge badge-warning">{job.children[6].content}</span></h2>
                        <h2><span className="badge badge-success">{job.children[8].content}</span></h2>
                        <h2><span className="badge badge-info">{job.children[0].content}</span></h2>
                    </div>
                    {/*<dl className="row">*/}
                    {/*    <dt className="display-">Call Number</dt>*/}
                    {/*    <dd>{job.children[2].content} </dd>*/}
                    {/*</dl>*/}

                    <hr className="my-4"/>
                    <dl className="row">
                        <dt className="col-sm-3">Call Number</dt>
                        <dd className="col-sm-9">{job.children[2].content}</dd>
                        <dt className="col-sm-3">Description</dt>
                        <dd className="col-sm-9">{job.children[1].content}</dd>
                        <dt className="col-sm-3">Customer Code</dt>
                        <dd className="col-sm-9">{job.children[3].content}</dd>
                        <dt className="col-sm-3">Customer Name</dt>
                        <dd className="col-sm-9">{job.children[4].content}</dd>
                        <dt className="col-sm-3">Action</dt>
                        <dd className="col-sm-9">{job.children[0].content}</dd>
                        <dt className="col-sm-3">Status</dt>
                        <dd className="col-sm-9">{job.children[8].content}</dd>
                        <dt className="col-sm-3">Priority</dt>
                        <dd className="col-sm-9">{job.children[6].content}</dd>
                        <dt className="col-sm-3">Required Date</dt>
                        <dd className="col-sm-9">{job.children[7].content}</dd>
                        <dt className="col-sm-3">Operator</dt>
                        <dd className="col-sm-9">{job.children[5].content}</dd>

                    </dl>
                </div>
                <style jsx>{`
          .card {
            min-height: 380px;
          }
        `}</style>
            </Layout>
        )
    }
}

// const WrappedComponent = WithAuth(ReactiveJobDetail);

export default ReactiveJobDetail;