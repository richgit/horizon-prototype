import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

export default function Header() {
    return (
        <div>
            <Link href="/index">
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href="/reactiveJobs">
                <a style={linkStyle}>Reactive Jobs</a>
            </Link>
            <Link href="/login">
                <a style={linkStyle}>Login</a>
            </Link>
            <Link href="/logout">
                <a style={linkStyle}>Logout</a>
            </Link>
        </div>
    )
}
