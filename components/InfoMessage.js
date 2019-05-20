export default function InfoMessage ({message}) {

    if (message) {
        return (
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        )
    }
    return '';
}