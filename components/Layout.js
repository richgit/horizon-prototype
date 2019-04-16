import Header from './Header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

export default function Layout(props) {
    return (
        <div>

            <title>Horizon</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>


            <Header/>
            {props.children}
        </div>
    )
}
