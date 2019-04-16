import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark static-top bg-white border-bottom shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="../static/images/HEG-Logo.png" alt="HEG logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link href="/index">
                                <a style={linkStyle}>Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/reactiveJobs">
                                <a style={linkStyle}>Reactive Jobs</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login">
                                <a className="btn btn-outline-primary" style={linkStyle}>Login</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/logout">
                                <a style={linkStyle}>Logout</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



    )
}



