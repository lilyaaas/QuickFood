import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Register = () => {
    // Form State Management
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    // Hooks for navigation and redux actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Client-side validation: Check if passwords match
        if (password !== passwordConfirmation) {
            toast.error("Passwords do not match! ❌");
            return;
        }

        setLoading(true);

        try {
            // fetch the cookie first to ensure the subsequent POST request is accepted by Laravel Sanctum
            await api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`);

            // include the 'role' as 'customer' automatically
            const response = await api.post('/register', {
                name: name,
                email: email,
                password: password,
                role: 'customer'
            });

            // Update Redux store with the new user data and redirect to home
            dispatch(setCredentials({ user: response.data.user }));
            toast.success(response.data.message);
            navigate('/');

        } catch {
            toast.error('Registration failed. Please try again.');

        } finally {
            // Reset loading state regardless of success or failure
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join QuickFood and start ordering
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleRegister}>
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            required
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-orange-500 hover:text-orange-600 transition">
                            login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;