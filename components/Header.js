import Link from 'next/link'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light static-top border-bottom shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="../static/images/heg-logo-portal.png" alt="HEG logo"/>
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="nav-item p-2">
                            <Link href="/index">
                                <a className="text-dark">Home</a>
                            </Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link href="/reactiveJobs">
                                <a className="text-dark">Reactive Jobs</a>
                            </Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link href="/login">
                                <a className="btn btn-outline-secondary">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link href="/logout">
                                <a className="btn btn-outline-secondary">Logout</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



    )
}



