import Navbar from '../components/Navbar';
import ScrollToTopOnNavigate from '../components/ScrollToTopOnNavigate';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollToTopOnNavigate />

            <main className="grow pt-16 bg-gray-50">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;