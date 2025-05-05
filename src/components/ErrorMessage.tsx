type ErrorMessageProps = {
    message: string | undefined
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <p className="text-red-500 text-sm">{message}</p>
}

export default ErrorMessage
