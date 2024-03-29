import Header from './Header'
import Footer from "./Footer";
import Headroom from "react-headroom";

export default function Layout(props) {
    return (
        <div>

            <title>Horizon</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                  integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                  crossOrigin="anonymous"/>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.bundle.min.js"></script>

            <Headroom>
                <Header/>
            </Headroom>
            <div className="container mt-5">
                {props.children}
            </div>
            <Footer/>

        </div>
    )
}
