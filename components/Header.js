import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

export default function Header() {
  return (
    <div>
      <Link  href="/index">
        <a style={linkStyle}>Home</a>
      </Link>
      {/*  TODO use a to get round CORS <Link  href="/reactiveJobs">*/}
        {/*<a style={linkStyle}>Reactive Jobs</a>*/}
      {/*</Link>*/}
      <a style={linkStyle} href="/reactiveJobs">
        Reactive Jobs
      </a>
      <Link  href="/login">
        <a style={linkStyle}>Login</a>
      </Link>
      <Link  href="/logout">
        <a style={linkStyle}>Logout</a>
      </Link>
    </div>
  )
}
