import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaMotorcycle } from 'react-icons/fa';
import { getImageUrl } from '../../utils/imageConfig';

const RestaurantCard = ({ restaurant }) => {
  const imageUrl = getImageUrl(restaurant.image);

  return (
    <Link to={`/restaurants/${restaurant.id}/products`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={restaurant.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 text-sm font-bold">
            <FaStar className="text-yellow-400" />
            <span>4.5</span> {/* Hardcoded */}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-1">{restaurant.description || "Tasty food & fast delivery"}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaClock className="text-orange-500" />
              <span>{restaurant.delivery_time || "30-45"} min</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMotorcycle className="text-orange-500" />
              <span>{restaurant.delivery_fee || "Free"} DH</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;