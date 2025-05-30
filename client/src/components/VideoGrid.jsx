import { useEffect, useState } from "react";
import axios from "axios";
import { VIDEO_API_END_POINT } from "../utils/apiEndPoint";
import { Link } from "react-router-dom";
import { useSearch } from "../utils/context/SearchContext";

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${VIDEO_API_END_POINT}/`, {
          withCredentials: true,
        });
        setVideos(res.data.videos);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = searchQuery
    ? videos.filter((video) =>
        video.videoTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : videos;

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredVideos.length === 0 ? (
        <p className="text-center font-semibold">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Link
              to={`/videos/${video._id}`}
              state={{
                channel: {
                  videos: [video],
                  channelLogo: video.uploader?.channelLogo,
                  channelName: video.uploader?.username,
                },
              }}
              key={video._id}
            >
              <div className="rounded-lg overflow-hidden shadow-sm">
                <img
                  src={video.videoThumbnail}
                  alt={video.videoTitle}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {video.videoTitle}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {video.uploader?.username || "Unknown channel"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
