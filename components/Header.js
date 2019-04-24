import Link from 'next/link'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light static-top border-bottom shadow">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="../static/images/heg-logo-portal.png" alt="HEG logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto ">
                        <li className="nav-item pt-md-3 pt-2 pr-4">
                            <Link prefetch href="/index">
                                <a className="text-dark">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item pt-md-3 pt-2 pr-4">
                            <Link prefetch href="/reactiveJobs">
                                <a className="text-dark">Reactive Jobs</a>
                            </Link>
                        </li>
                        <li className="nav-item pt-2 pr-4">
                            <Link prefetch href="/login">
                                <a className="btn btn-outline-secondary">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item pt-2 pr-4 ">
                            <Link prefetch href="/logout">
                                <a className="btn btn-outline-secondary">Logout</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>





    )
}



