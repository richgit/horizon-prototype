export default function ErrorMessage ({message}) {

    if (message) {
        return (
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
        )
    }
    return '';
}