import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const { results = [], keyword } = location.state || {};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Results for "{keyword}"</h2>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((user, index) => (
            <li key={index} className="border p-3 rounded shadow">
              <p><strong>Email:</strong> {user.email}</p>
              {user.name && <p><strong>Name:</strong> {user.name}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
