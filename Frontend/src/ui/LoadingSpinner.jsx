const LoadingSpinner = ({ LoadingText }) => {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">{LoadingText}</p>
      </div>
    );
}

export default LoadingSpinner;