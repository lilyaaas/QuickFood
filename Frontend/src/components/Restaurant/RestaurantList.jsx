import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import LoadingSpinner from '../../ui/LoadingSpinner';
import api from '../../api/axios';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();

  // Fetch restaurants when component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');

        const data = response.data.data ?? response.data;
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <LoadingSpinner LoadingText="Loading restaurants..." />;

  return (
    <section id="restaurants" className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{location.pathname !== '/restaurants' ? "Popular Restaurants" : "All Restaurants"}</h2>
          <p className="text-gray-500 mt-2">Find the best food near you</p>
        </div>
        {location.pathname !== '/restaurants' && (
          <Link to="/restaurants" className="text-orange-500 font-semibold hover:underline">
            View All &rarr;
          </Link>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">No restaurants found yet.</p>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;