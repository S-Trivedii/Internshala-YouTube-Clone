// import { useLocation, useParams } from "react-router-dom";
// import Header from "../components/Header";
// import { useState } from "react";
// import { useUser } from "../utils/context/UserContext";
// import { VIDEO_API_END_POINT } from "../utils/apiEndPoint";
// import { useEffect } from "react";
// import axios from "axios";
// import Comment from "../components/Comment";

// const Video = () => {
//   const location = useLocation();
//   const { videoId } = useParams();
//   const channelData = location.state;

//   // console.log("channel-data ", channelData);

//   const { user, setUser } = useUser();
//   console.log("ussser ", user);
//   const userId = user?._id; // null collasing prevent error if user is null or still loading

//   const video = channelData?.channel?.videos?.find(
//     (vid) => vid._id === videoId
//   );

//   // console.log("single vide- ", video);

//   const [likes, setLikes] = useState(video?.likes || 0); // initiliase data if we have
//   const [dislikes, setDislikes] = useState(video?.dislikes || 0);
//   const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike'

//   const sendReaction = async (reactionType) => {
//     try {
//       const res = await axios.patch(
//         `${VIDEO_API_END_POINT}/${videoId}/react`,
//         {
//           userId,
//           reactionType, // either "like" or "dislike"
//         },
//         { withCredentials: true } // this include cookie
//       );

//       // Update UI
//       if (res.data.success) {
//         setLikes(res.data.likes);
//         setDislikes(res.data.dislikes);
//         setUserReaction(reactionType);
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || "Something went wrong.";
//       console.error("Reaction failed:", msg);
//       alert(msg);
//     }
//   };

//   // Like handler
//   const handleLike = () => {
//     if (userReaction !== "like") {
//       sendReaction("like");
//     } else {
//       alert("You've already liked this video.");
//     }
//   };

//   // Dislike handler
//   const handleDislike = () => {
//     if (userReaction !== "dislike") {
//       sendReaction("dislike");
//     } else {
//       alert("You've already disliked this video.");
//     }
//   };

//   // Extract YouTube video ID from full URL
//   const extractYouTubeId = (url) => {
//     const match = url.match(
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
//     );
//     return match ? match[1] : null;
//   };

//   const youtubeId = extractYouTubeId(video?.videoUrl);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(`${USER_API_END_POINT}/me`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           setUser(res.data.user);
//           // setIsLoggedIn(true);
//         }
//       } catch (error) {
//         setUser(null);
//         // setIsLoggedIn(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 py-6 gap-6">
//         {/* Main Video Player Section */}
//         <div className="w-full lg:w-[70%]">
//           {youtubeId ? (
//             <>
//               <div className="w-full h-[500px] mb-4">
//                 <iframe
//                   className="w-full h-full rounded-xl"
//                   src={`https://www.youtube.com/embed/${youtubeId}`}
//                   allowFullScreen
//                   title="YouTube Video Player"
//                 />
//               </div>
//               <h1 className="text-2xl font-bold mb-2">{video.videoTitle}</h1>

//               {/* Channel Info and Actions Row */}
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={channelData.channel.channelLogo}
//                     alt="Channel Logo"
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold text-lg">
//                       {channelData.channel.channelName}
//                     </p>
//                     {/* <p className="text-sm text-gray-500">1.2M subscribers</p> */}
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <button className="bg-black text-white px-4 py-1 rounded-full font-semibold">
//                     Subscribe
//                   </button>

//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={handleLike}
//                       className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer ${
//                         userReaction === "like"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 hover:bg-gray-300"
//                       }`}
//                     >
//                       👍 <span>{likes}</span>
//                     </button>

//                     <button
//                       onClick={handleDislike}
//                       className={`px-3 py-1 rounded-full cursor-pointer ${
//                         userReaction === "dislike"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-200 hover:bg-gray-300"
//                       }`}
//                     >
//                       👎
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-gray-700">{video.videoDescription}</p>
//               <Comment />
//             </>
//           ) : (
//             <p className="text-red-500 font-semibold">
//               Video not found or invalid URL.
//             </p>
//           )}
//         </div>

//         {/* Sidebar with Suggested Videos (Static/Dummy Data) */}
//         <div className="w-full lg:w-[30%]">
//           <h2 className="text-xl font-semibold mb-4">More from this channel</h2>
//           <div className="flex flex-col gap-4">
//             {[
//               {
//                 id: 1,
//                 title: "React Crash Course",
//                 thumbnail:
//                   "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
//               },
//               {
//                 id: 2,
//                 title: "Node.js Basics",
//                 thumbnail:
//                   "https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg",
//               },
//               {
//                 id: 3,
//                 title: "MERN Stack Tutorial",
//                 thumbnail:
//                   "https://img.youtube.com/vi/7CqJlxBYj-M/hqdefault.jpg",
//               },
//             ].map((vid) => (
//               <div key={vid.id} className="flex gap-3 items-start">
//                 <img
//                   src={vid.thumbnail}
//                   alt={vid.title}
//                   className="w-32 h-20 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <p className="text-sm font-semibold">{vid.title}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;

import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react"; // Combined useEffect and useState
import { useUser } from "../utils/context/UserContext";
import { VIDEO_API_END_POINT, USER_API_END_POINT } from "../utils/apiEndPoint"; // Added USER_API_END_POINT
import axios from "axios";
import Comment from "../components/Comment";

const Video = () => {
  const location = useLocation();
  const { videoId } = useParams();
  const channelData = location.state; // This might be null if navigated directly

  const { user, setUser } = useUser();
  console.log("ussser ", user);
  const userId = user?._id;

  // Find the video from channelData. This assumes channelData is always available and structured as expected.
  // A more robust solution for direct video links would be to fetch the video data based on videoId.
  const video = channelData?.channel?.videos?.find(
    (vid) => vid._id === videoId
  );

  const [likes, setLikes] = useState(video?.likes || 0);
  const [dislikes, setDislikes] = useState(video?.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null); // 'like', 'dislike'

  // Refactored to fetch video details if channelData isn't available or doesn't contain the video
  // and to fetch user's reaction status
  useEffect(() => {
    const fetchVideoDetailsAndReaction = async () => {
      if (!video) {
        // If video data is not passed via location.state (e.g., direct access to URL)
        try {
          const res = await axios.get(`${VIDEO_API_END_POINT}/${videoId}`, {
            withCredentials: true,
          });
          if (res.data.success && res.data.video) {
            // Assuming your API returns { success: true, video: { ... } }
            // You might need to adjust based on your actual API response structure
            const fetchedVideo = res.data.video;
            // Update the state for video details (if you store it in state)
            // For now, let's assume `video` is derived from `channelData` which might be a limitation.
            // A better approach would be to store the `video` in its own state.
            // For this example, I'll rely on the `video` variable from `channelData` or re-fetch.
            // If you want to handle direct URL access without `channelData`, you'd need to set `video` state here.
            setLikes(fetchedVideo.likes);
            setDislikes(fetchedVideo.dislikes);
            // You might also need to set the `video` object itself if you intend to fetch it
            // independently if `location.state` is not available.
            // setVideoState(fetchedVideo); // if you had a state for video
          }
        } catch (error) {
          console.error("Failed to fetch video details:", error);
        }
      }

      // Check user's previous reaction to this video
      if (userId && videoId) {
        try {
          const res = await axios.get(
            `${VIDEO_API_END_POINT}/${videoId}/user-reaction/${userId}`,
            {
              withCredentials: true,
            }
          );
          if (res.data.success) {
            setUserReaction(res.data.reactionType); // 'like', 'dislike', or null
          }
        } catch (error) {
          console.error("Failed to fetch user reaction:", error);
        }
      }
    };

    fetchVideoDetailsAndReaction();
  }, [videoId, userId, video]); // Add video to dependency array if you fetch and set it in state

  const sendReaction = async (reactionType) => {
    try {
      const res = await axios.patch(
        `${VIDEO_API_END_POINT}/${videoId}/react`,
        {
          userId,
          reactionType,
        },
        { withCredentials: true }
      );

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
    if (!userId) {
      alert("Please log in to like this video.");
      return;
    }
    if (userReaction !== "like") {
      sendReaction("like");
    } else {
      // User has already liked, so they are unliking
      sendReaction(null); // Send null or 'unlike' to remove the reaction
    }
  };

  // Dislike handler
  const handleDislike = () => {
    if (!userId) {
      alert("Please log in to dislike this video.");
      return;
    }
    if (userReaction !== "dislike") {
      sendReaction("dislike");
    } else {
      // User has already disliked, so they are un-disliking
      sendReaction(null); // Send null or 'undislike' to remove the reaction
    }
  };

  // Extract YouTube video ID from full URL
  const extractYouTubeId = (url) => {
    // Safely check if url is a string before calling .match()
    if (typeof url !== "string" || !url) {
      return null;
    }
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/e\/)([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  // Apply the fix here: ensure video.videoUrl is defined before passing to extractYouTubeId
  const youtubeId = video?.videoUrl ? extractYouTubeId(video.videoUrl) : null;

  // Auth check for user context
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser]); // Add setUser to dependencies

  // If video is not found (e.g., direct URL access without state), show loading or error
  if (!video) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500 font-semibold">
          Loading video or video not found.
        </p>
      </div>
    );
  }

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
                  // Corrected src URL for YouTube embed
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  allowFullScreen
                  title="YouTube Video Player"
                  frameBorder="0" // Added for better compatibility
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{video.videoTitle}</h1>

              {/* Channel Info and Actions Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      channelData?.channel?.channelLogo || "default-logo.png"
                    } // Add fallback
                    alt="Channel Logo"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-lg">
                      {channelData?.channel?.channelName || "Unknown Channel"}{" "}
                      {/* Add fallback */}
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
                      👎 <span>{dislikes}</span> {/* Display dislikes count */}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">{video.videoDescription}</p>
              <Comment />
            </>
          ) : (
            <p className="text-red-500 font-semibold">
              Video URL is invalid or missing.
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
                  "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg", // Placeholder for demo
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
