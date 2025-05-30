import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import { useUser } from "../utils/context/UserContext";
import { VIDEO_API_END_POINT } from "../utils/apiEndPoint";
import { useEffect } from "react";
import axios from "axios";
import Comment from "../components/Comment";

const Video = () => {
  const location = useLocation();
  const { videoId } = useParams();
  const channelData = location.state;

  // console.log("channel-data ", channelData);

  const { user, setUser } = useUser();
  console.log("ussser ", user);
  const userId = user?._id; // null collasing prevent error if user is null or still loading

  const video = channelData?.channel?.videos?.find(
    (vid) => vid._id === videoId
  );

  // console.log("single vide- ", video);

  const [likes, setLikes] = useState(video?.likes || 0); // initiliase data if we have
  const [dislikes, setDislikes] = useState(video?.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike'

  const sendReaction = async (reactionType) => {
    try {
      const res = await axios.patch(
        `${VIDEO_API_END_POINT}/${videoId}/react`,
        {
          userId,
          reactionType, // either "like" or "dislike"
        },
        { withCredentials: true } // this include cookie
      );

      // Update UI
      if (res.data.success) {
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
        setUserReaction(reactionType);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      console.error("Reaction failed:", msg);
      alert(msg);
    }
  };

  // Like handler
  const handleLike = () => {
    if (userReaction !== "like") {
      sendReaction("like");
    } else {
      alert("You've already liked this video.");
    }
  };

  // Dislike handler
  const handleDislike = () => {
    if (userReaction !== "dislike") {
      sendReaction("dislike");
    } else {
      alert("You've already disliked this video.");
    }
  };

  // Extract YouTube video ID from full URL
  const extractYouTubeId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const youtubeId = extractYouTubeId(video?.videoUrl);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
          // setIsLoggedIn(true);
        }
      } catch (error) {
        setUser(null);
        // setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 py-6 gap-6">
        {/* Main Video Player Section */}
        <div className="w-full lg:w-[70%]">
          {youtubeId ? (
            <>
              <div className="w-full h-[500px] mb-4">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  allowFullScreen
                  title="YouTube Video Player"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{video.videoTitle}</h1>

              {/* Channel Info and Actions Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={channelData.channel.channelLogo}
                    alt="Channel Logo"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-lg">
                      {channelData.channel.channelName}
                    </p>
                    {/* <p className="text-sm text-gray-500">1.2M subscribers</p> */}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="bg-black text-white px-4 py-1 rounded-full font-semibold">
                    Subscribe
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer ${
                        userReaction === "like"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      👍 <span>{likes}</span>
                    </button>

                    <button
                      onClick={handleDislike}
                      className={`px-3 py-1 rounded-full cursor-pointer ${
                        userReaction === "dislike"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      👎
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">{video.videoDescription}</p>
              <Comment />
            </>
          ) : (
            <p className="text-red-500 font-semibold">
              Video not found or invalid URL.
            </p>
          )}
        </div>

        {/* Sidebar with Suggested Videos (Static/Dummy Data) */}
        <div className="w-full lg:w-[30%]">
          <h2 className="text-xl font-semibold mb-4">More from this channel</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                id: 1,
                title: "React Crash Course",
                thumbnail:
                  "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
              },
              {
                id: 2,
                title: "Node.js Basics",
                thumbnail:
                  "https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg",
              },
              {
                id: 3,
                title: "MERN Stack Tutorial",
                thumbnail:
                  "https://img.youtube.com/vi/7CqJlxBYj-M/hqdefault.jpg",
              },
            ].map((vid) => (
              <div key={vid.id} className="flex gap-3 items-start">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{vid.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
