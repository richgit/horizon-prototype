import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class Index extends React.Component {
    static async getInitialProps() {
        const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
        const data = await res.json()

        console.log(`Show data fetched. Count: ${data.length}`)

        return {
            shows: data.map(entry => entry.show)
        }
    }

    render() {

        // const data = [
        //     {
        //         name: 'Tanner Linsley',
        //         age: 26,
        //         friend: {
        //             name: 'Jason Maurer',
        //             age: 23,
        //         }
        //     },
        //     {
        //         name: 'aaa bbb',
        //         age: 56,
        //         friend: {
        //             name: 'erere  erer',
        //             age: 99,
        //         }
        //     },
        // ]
        const columns = [
            {
                Header: 'Name',

                accessor: 'name', // String-based value accessors!
                Cell: props => <Link as={`/p/${props.original.id}`} href={`/post?id=${props.original.id}`}>
                         <a>{props.value}</a>
                     </Link>
                // Cell: ({ row }) => (<Link as={`/p/${row.id}`} href={`/post?id=${row.id}`}>
                //     <a>{row.name}</a>
                // </Link>)
            },
            {
                Header: 'Language',
                accessor: 'language',
            },
            {
                Header: 'Premiered',
                accessor: 'premiered',
            },
            {
                Header: 'Rating Average',
                accessor: 'rating.average',
            },
            // {
            //     id: 'friendName', // Required because our accessor is not a string
            //     Header: 'Friend Name',
            //     accessor: d => d.friend.name // Custom value accessors!
            // },
            // {
            //     Header: props => <span>Friend Age</span>, // Custom header components!
            //     accessor: 'friend.age'
            // }
        ]


        return (
            <Layout>

                <ReactTable
                    data={this.props.shows}
                    columns={columns}
                    keyField="id"
                />

                <h1>Batman TV Shows</h1>
                <ul>
                    {this.props.shows.map(show => (
                        <li key={show.id}>
                            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                                <a>{show.name}</a>
                            </Link>
                            <p>{show.language}</p>
                            <p>{show.premiered}</p>
                            <p>{show.rating.average}</p>
                        </li>
                    ))}
                </ul>
            </Layout>
        )
    }
}

