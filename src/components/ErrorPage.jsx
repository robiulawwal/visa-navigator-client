import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <div className="text-center flex flex-col items-center">
                <div className="alert w-full alert-error shadow-lg max-w-md mb-8">
                    <div className="w-full">
                        <span className="w-full">Error 404 - Page Not Found</span>
                    </div>
                </div>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/755/755014.png" // You can replace this with your own image
                    alt="404 Error"
                    className="w-40 mx-auto mb-8"
                />

                <h1 className="text-4xl font-bold text-base-content mb-4">
                    Oops! Something went wrong.
                </h1>
                <p className="text-lg text-base-content mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>


                <button
                    onClick={() => navigate("/")}
                    className="btn btn-primary"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;