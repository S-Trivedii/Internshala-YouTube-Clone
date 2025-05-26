import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CHANNEL_API_END_POINT } from "../utils/apiEndPoint";
import bannerImage from "../assets/banner_img.jpg";

const Channel = () => {
  const [channelData, setChannelData] = useState(null);
  const { channelId } = useParams();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `${CHANNEL_API_END_POINT}/${channelId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Channel data- ", response.data);
        setChannelData(response.data);
      } catch (error) {
        console.error("Failed to fetch channel:", error.message);
      }
    };

    fetchChannel();
  }, [channelId]);

  if (!channelData) {
    console.log("For view ", channelData);
    return <p className="text-center text-lg mt-10">Loading channel...</p>;
  }

  const { channel } = channelData;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Banner Image */}
      {channel.bannerImage && (
        <div className="w-full h-42 mt-2 md:h-48 bg-gray-200 rounded-md overflow-hidden mb-6">
          <img
            src={channel.bannerImage}
            alt="Channel banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Channel Header Section */}
      <div className="flex items-start justify-between flex-wrap md:flex-nowrap mt-3">
        {/* Channel Logo */}
        <img
          src={channel.channelLogo}
          alt="Channel logo"
          className="w-42 h-42 rounded-full object-cover border border-gray-300 mr-6"
        />

        {/* Channel Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{channel.channelName}</h1>
          <p className="text-gray-600 mt-1">{channel.description}</p>

          <div className="flex justify-between items-center mt-4">
            {/* Subscribe Button */}
            <button className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-900 transition">
              Subscribe
            </button>

            {/* Customize Button — only visible to owner */}
            {channel.owner && (
              <Link
                to={`/channel/${channelId}/edit`}
                state={{
                  channelName: channel.channelName,
                  channelDescription: channel.description,
                  channelId,
                }}
                className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md transition"
              >
                Customize Channel
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
