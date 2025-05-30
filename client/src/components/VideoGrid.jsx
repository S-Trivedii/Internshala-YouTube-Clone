import { useEffect, useState } from "react";
import axios from "axios";
import { VIDEO_API_END_POINT } from "../utils/apiEndPoint";
import { Link } from "react-router-dom";
import { useSearch } from "../utils/context/SearchContext";

// Either all videos or only filtered video
const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchQuery, activeFilter } = useSearch();

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

  // Two types of filtering - search and category
  const filteredVideos = videos.filter((video) => {
    const title = video.videoTitle?.toLowerCase() || "";
    const searchMatch =
      searchQuery === "" || title.includes(searchQuery.toLowerCase());
    const categoryMatch =
      activeFilter === "All" ||
      title.split(" ").some((word) => word === activeFilter.toLowerCase());

    return searchMatch && categoryMatch;
  });

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredVideos.length === 0 ? (
        <p className="text-center font-semibold">No matching videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            //  To video page
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
