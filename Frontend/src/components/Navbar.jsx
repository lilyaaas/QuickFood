import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { totalQuantity } = useSelector((state) => state.cart);
    const { user, isAuthReady } = useSelector((state) => state.auth);

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* 1. Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold text-orange-500">QuickBite 🍔</span>
                    </Link>

                    {/* 2. Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
                        <Link to="/restaurants" className="text-gray-700 hover:text-orange-500 font-medium">Restaurants</Link>
                    </div>

                    {/* 3. User Actions: Cart + Profile/Login */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Icon */}
                        <Link
                            to="/cart"
                            className="relative p-2 text-gray-600 hover:text-orange-500 transition"
                            title="Cart"
                        >
                            <FaShoppingCart size={24} />
                            {totalQuantity > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>

                        {/* Profile/Login Section */}
                        {!isAuthReady ? (
                            /* loading skeleton */
                            <div className="flex items-center gap-4 animate-pulse">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            </div>
                        ) : user ? (
                            /* Profile Avatar */
                            <Link
                                to="/profile"
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center hover:shadow-md transition bg-orange-50"
                                title="My Profile"
                            >
                                {user.avatar ? (
                                    <img
                                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${user.avatar}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle size={28} className="text-orange-300" />
                                )}
                            </Link>
                        ) : (
                            /* login/register */
                            <div className="flex space-x-2">
                                <Link to="/login" className="px-4 py-2 text-orange-500 border border-orange-500 rounded-full hover:bg-orange-50 transition font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;