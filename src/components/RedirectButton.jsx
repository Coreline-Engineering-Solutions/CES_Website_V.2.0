import { Link } from 'react-router-dom';

function RedirectButton() {
  return (
    <Link to="/other-page">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Other Page
      </button>
    </Link>
  );
}

export default RedirectButton;