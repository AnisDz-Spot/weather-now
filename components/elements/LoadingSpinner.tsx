const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10 md:py-20">
      <div
        className="w-16 h-16 border-4 border-t-4 border-t-white border-blue-400 rounded-full animate-spin"
        role="status"
        aria-label="Loading weather data"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
