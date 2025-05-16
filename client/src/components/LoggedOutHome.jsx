const LoggedOutHome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-xl p-8 text-center max-w-xl w-full">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
          Try searching to get started
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          Start watching videos to help us build a feed of videos that you'll
          love.
        </p>
      </div>
    </div>
  );
};

export default LoggedOutHome;
