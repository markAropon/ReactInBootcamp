import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Page1 = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold m-4">Page 1</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Link to="/Page1" className="group">
          <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-indigo-600">
              page 1
            </h2>
          </div>
        </Link>

        <Link to="/Page2" className="group">
          <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-purple-600">
              Page 2
            </h2>
          </div>
        </Link>
        <Link to="/Page3" className="group">
          <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-purple-600">
              Page 3
            </h2>
          </div>
        </Link>
        <Link to="/Page4" className="group">
          <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-purple-600">
              Page 4
            </h2>
          </div>
        </Link>
        <Link to="/Page5" className="group">
          <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-purple-600">
              Page 5
            </h2>
          </div>
        </Link>
      </div>
      <Link
        to="/"
        className="circle-button fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <FaHome className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Page1;
export { Page1 };
