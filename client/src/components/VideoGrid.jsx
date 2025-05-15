const sampleVideos = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  title: `Sample Video Title ${i + 1}`,
  thumbnail: `https://i.ytimg.com/vi/VIDEO_ID${i}/hqdefault.jpg`, // Replace with actual
  channel: `Channel ${i + 1}`,
  views: `${(Math.random() * 100).toFixed(1)}K views`,
}));

const VideoGrid = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {sampleVideos.map((video) => (
          <div key={video.id} className="rounded-lg overflow-hidden shadow-sm">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-2">
              <h3 className="text-sm font-semibold line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500">{video.channel}</p>
              <p className="text-xs text-gray-500">{video.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
