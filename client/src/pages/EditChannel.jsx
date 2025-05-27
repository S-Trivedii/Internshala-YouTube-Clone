import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytLogo from "../assets/youtube_logo.png";
import { CHANNEL_API_END_POINT } from "../utils/apiEndPoint";
import axios from "axios";

const EditChannel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { channelName, channelDescription, channelId } = location.state;
  // console.log("Location state ", location.state);

  const [input, setInput] = useState({
    name: channelName,
    description: channelDescription,
    bannerImage: null,
    channelLogo: null,
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setInput((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before proceeding
    if (!input.name.trim() || !input.description.trim()) {
      alert("Channel name and description are required.");
      return;
    }

    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);

      if (input.bannerImage) {
        formData.append("bannerImage", input.bannerImage);
      }

      if (input.channelLogo) {
        formData.append("channelLogo", input.channelLogo);
      }

      // Sending formData to backend
      const response = await axios.put(
        `${CHANNEL_API_END_POINT}/${channelId}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // if successfull navigate back to channelId
      if (response.data.success) {
        navigate("/");
      }

      // to check formData
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
    } catch (error) {
      // console.error("Upload failed:", error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Header */}

      <div className="flex items-center justify-between mb-8">
        {/* YouTube Logo */}
        <span className="flex items-center justify-center font-bold text-2xl">
          <img src={ytLogo} alt="YouTube" className="h-10 mr-1" />
          Studio
        </span>

        {/* View Channel Button */}
        <Link
          to={`/channel/${channelId}`}
          className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded-md transition"
        >
          View Your Channel
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6">Customize Channel</h2>

      <form onSubmit={handleSubmit}>
        {/* Banner Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="cursor-pointer"
            name="bannerImage"
            onChange={changeFileHandler}
          />
        </div>

        {/* Channel Logo */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel Logo
          </label>
          <input
            type="file"
            accept="image/*"
            className="cursor-pointer"
            name="channelLogo"
            onChange={changeFileHandler}
          />
        </div>

        {/* Channel Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel Name
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={changeEventHandler}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={input.description}
            name="description"
            rows={4}
            onChange={changeEventHandler}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditChannel;
