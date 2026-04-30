import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800">
        404
      </h1>

      <p className="mt-4 text-gray-600">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 px-5 py-2 bg-black text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;