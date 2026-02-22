import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeItem, deleteItem } from '../redux/slices/cartSlice';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import { getImageUrl } from '../utils/imageConfig';

const Cart = () => {
  // 1. Get cart data from Redux store
  const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 2. If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" 
            alt="Empty Cart" 
            className="w-64 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/restaurants" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg">
          Start Ordering
        </Link>
      </div>
    );
  }

  // 3. If cart has items, show cart details
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        Shopping Cart <span className="text-gray-400 text-xl font-normal">({totalQuantity} items)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                
                {/* Image */}
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.name} 
                  className="w-20 h-20 rounded-lg object-cover"
                />

                {/* Details */}
                <div className="ml-6 grow">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Price: {item.price} DH</p>
                </div>

                {/* Controls (+ / -) */}
                <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
                  <button 
                    onClick={() => dispatch(removeItem(item.id))}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-orange-500 shadow-sm hover:bg-orange-50"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(addToCart(item))}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-green-500 shadow-sm hover:bg-green-50"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                {/* Price & Delete */}
                <div className="ml-8 text-right min-w-20">
                  <div className="font-bold text-lg text-gray-900 mb-1">{item.totalPrice} DH</div>
                  <button 
                    onClick={() => dispatch(deleteItem(item.id))}
                    className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1 ml-auto hover:cursor-pointer"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <Link to="/restaurants" className="inline-flex items-center gap-2 mt-6 text-gray-500 hover:text-orange-500 font-medium transition">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* (Order Summary) */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-3 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{totalAmount} DH</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-orange-500">{totalAmount} DHs</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="block w-full bg-orange-500 text-white text-center font-bold py-4 rounded-xl hover:bg-orange-600 shadow-lg hover:shadow-orange-200 transition transform hover:-translate-y-1"
            >
              Proceed to Checkout 🚀
            </Link>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              Secure Checkout guaranteed.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;