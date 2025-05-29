import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VIDEO_API_END_POINT } from "../utils/apiEndPoint.js";
import axios from "axios";

const UploadVideo = () => {
  const { channelId } = useParams();
  const [videoData, setVideoData] = useState({
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
    channelId,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted video data:", videoData);

    // Send this videoData to server
    const response = await axios.post(`${VIDEO_API_END_POINT}`, videoData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.data.success) {
      navigate(`/`);
    }
  };

  return (
    <div className="flex justify-center px-4 py-10 min-h-screen bg-[#f9f9f9] text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white border border-gray-200 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Upload Video
        </h2>

        {/* Video Title */}
        <div className="mb-5">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="title"
          >
            Video Title
          </label>
          <input
            type="text"
            id="title"
            name="videoTitle"
            value={videoData.videoTitle}
            className="w-full p-2.5 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="videoDescription"
            value={videoData.videoDescription}
            rows="4"
            className="w-full p-2.5 rounded border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Video URL */}
        <div className="mb-5">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="videoUrl"
          >
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={videoData.videoUrl}
            className="w-full p-2.5 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;

{
  /* Thumbnail Upload */
}
// <div className="mb-6">
//   <label
//     className="block text-sm font-medium mb-1 text-gray-700"
//     htmlFor="thumbnail"
//   >
//     Thumbnail Image
//   </label>
//   <input
//     type="file"
//     id="thumbnail"
//     name="thumbnail"
//     accept="image/*"
//     onChange={handleChange}
//     className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
//     required
//   />
// </div>
