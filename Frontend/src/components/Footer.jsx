const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">QuickBite 🍔</h2>
        <p className="text-gray-400 mb-4">
          أحسن ماكلة، فـ أسرع وقت. طلب دابا وتمتع بالبنة!
        </p>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} QuickBite. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;