import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="bg-orange-50 py-12 md:py-20">
            {/* 1.(Text Content) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">

                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Delicious Food, <br />
                        <span className="text-orange-500">Delivered To You!</span> 🚀
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
                        Choose from thousands of restaurants and get your favorite meals delivered to your doorstep in minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Link to="/restaurants" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transform hover:scale-105 transition shadow-lg">
                            Order Now 🍔
                        </Link>
                    </div>
                </div>

                {/* 2.(Image Content) */}
                <div className="md:w-1/2 relative">
                    <div className="absolute top-0 right-0 bg-orange-200 rounded-full w-64 h-64 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-8 -left-4 bg-yellow-200 rounded-full w-64 h-64 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        alt="Delicious Food"
                        className="relative rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500 w-full object-cover z-10"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;