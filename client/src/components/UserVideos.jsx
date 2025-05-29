const UserVideos = ({ channelData }) => {
  console.log("chhhanels data ", channelData);
  const videos = channelData?.channel?.videos || [];
  console.log("videosss. ", videos);

  return (
    <div className="mt-10">
      {/* Horizontal line */}
      <hr className="mt-0 mb-4 border-gray-300" />

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">Videos</h2>

      {/* Video Grid or Empty Message */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              {/* Thumbnail */}
              <img
                src={
                  video.videoThumbnail || "https://via.placeholder.com/300x200"
                }
                alt={video.videoTitle}
                className="w-full h-48 object-cover"
              />

              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{video.videoTitle}</h3>
                <p className="text-gray-600 text-sm">
                  {video.videoDescription?.slice(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg">
          No video exist for this account
        </p>
      )}
    </div>
  );
};

export default UserVideos;
