import { Channel } from "../model/channel.model.js";

// Get channel by id
export const getChannelById = async (req, res) => {
  // console.log("id ", req.params.channelId);

  try {
    // Extracting channelId from request parameters
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        message: `Channel doesn't exist with this id: ${channelId}`,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Channel fetch successfully",
      success: true,
      channel,
    });
  } catch (error) {}
};
