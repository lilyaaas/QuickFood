import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { getImageUrl } from '../utils/imageConfig';
import { FaStar, FaPlus } from 'react-icons/fa';
import LoadingSpinner from '../ui/LoadingSpinner';
import api from '../api/axios';

const RestaurantDetails = () => {
  // State
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { id } = useParams(); // ID from URL

  // Fetch restaurant details and menu
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.get(`/restaurants/${id}/products`);

        setRestaurant(response.data.data ? response.data.data : response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) return <LoadingSpinner LoadingText="Loading Menu......" />;
  if (restaurant.length === 0) return <div className="text-center py-20">Restaurant not found Or have no Products</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. Restaurant Header (Cover Image) */}
      <div className="h-64 md:h-80 w-full relative">
        <img 
          src={getImageUrl(restaurant.image)} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-4 text-sm font-medium">
               <span className="bg-orange-500 px-2 py-1 rounded flex items-center gap-1">
                  <FaStar /> 4.5 {/* Hardcoded */}
               </span>
               <span>• {restaurant.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Menu Section (Products) */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.length > 0 ? (
            restaurant.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition">
                {/* Product Image */}
                <img 
                  src={getImageUrl(product.image)} 
                  alt={product.name} 
                  className="w-24 h-24 rounded-lg object-cover shrink-0"
                />
                
                {/* Product Info */}
                <div className="flex flex-col grow justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-orange-600 text-lg">{product.price} DH</span>
                    <button 
                      onClick={() => dispatch(addToCart(product))} // Add to cart action
                      className="bg-orange-100 text-orange-600 p-2 rounded-full hover:bg-orange-500 hover:text-white transition"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">No items available in this menu yet.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default RestaurantDetails;