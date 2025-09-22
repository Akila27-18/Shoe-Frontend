import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('query');

  // fetch or filter products based on `query`
  return <div>Showing results for "{query}"</div>;
};

export default SearchResults;
