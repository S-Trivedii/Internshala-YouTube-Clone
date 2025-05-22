import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHANNEL_API_END_POINT } from "../utils/apiEndPoint";

const Channel = () => {
  const [channelData, setChannelData] = useState(null);
  const { channelId } = useParams();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `${CHANNEL_API_END_POINT}/${channelId}`,
          { withCredentials: true }
        );
        setChannelData(response.data);
      } catch (error) {
        console.error("Failed to fetch channel:", error.message);
      }
    };

    fetchChannel();
  }, [channelId]);

  return (
    <div>
      {console.log("Channel Data ", channelData)}
      {channelData ? (
        <>
          <h1>{channelData.channel.channelName}</h1>
          <p>{channelData.channel.description}</p>
        </>
      ) : (
        <p>Loading channel...</p>
      )}
    </div>
  );
};

export default Channel;
