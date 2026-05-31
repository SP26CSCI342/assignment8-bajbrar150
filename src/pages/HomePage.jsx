import { useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import BusinessList from '../components/BusinessList/BusinessList';
import Subscription from '../components/Subscription/Subscription';
import Footer from '../components/Footer/Footer';

import searchBusinesses from '../util/yelp';

import './HomePage.css';

export default function HomePage() {
  const business = {
    imageSrc: 'https://csciprojects.us/pizza.jpg',
    name: 'MarginOtto Pizzeria',
    address: '1010 Paddington Way',
    city: 'Flavortown',
    state: 'NY',
    zipCode: '10101',
    category: 'Italian',
    rating: 4.5,
    reviewCount: 90
  };

  const [businesses, setBusinesses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchYelp = async (term, location, sortBy) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchBusinesses(term, location, sortBy);
      setBusinesses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="HomePage">
      {/* <h1>PlateScout</h1> */}
      <SearchBar searchYelp={searchYelp} />

      {loading && <p className="HomePage-status">Loading...</p>}
      {error && <p className="HomePage-status HomePage-status--error">{error}</p>}
      {!loading && !error && <BusinessList businesses={businesses} />}

      <Subscription />
      <Footer />
    </main>
  );
}