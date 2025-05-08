const Dropdown = ({ channelName = "Channel" }) => {
  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="w-56 bg-white rounded-md shadow-lg border text-sm">
      <div className="px-4 py-3 font-semibold border-b">{channelName}</div>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => console.log("View your channel")}
      >
        View Your Channel
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
