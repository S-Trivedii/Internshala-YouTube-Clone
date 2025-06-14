import { Channel } from "../model/channel.model.js";

// Get channel by id
export const getChannelById = async (req, res) => {
  // console.log("id ", req.params.channelId);

  try {
    // Extracting channelId from request parameters
    const { channelId } = req.params;

    // Why populate here ?
    // Client side I need data of each video(like videoTitle, videoDescription etc). Since channel contains 'ids' of all videos associated with that channel.
    // I can use populate method to get all data of videos.

    const channel = await Channel.findById(channelId).populate("videos").exec();

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

// Update channel by id
export const updateChannelById = async (req, res) => {
  console.log("req files ", req.files);

  try {
    const { channelId } = req.params;
    const { name, description } = req.body;

    // extract uploaded file urls
    const bannerImageUrl = req.files?.bannerImage?.[0]?.path || null;
    const channelLogoUrl = req.files?.channelLogo?.[0]?.path || null;

    // Prepare update data
    const updateData = {
      channelName: name,
      description,
    };

    if (bannerImageUrl) updateData.bannerImage = bannerImageUrl;
    if (channelLogoUrl) updateData.channelLogo = channelLogoUrl;

    // Update the channel in the database
    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      updateData,
      { new: true } //  <- important to return the updated doc
    );

    return res.status(200).json({
      success: true,
      message: "Successfully update data",
      updatedChannel,
    });
  } catch (error) {
    console.error("Channel update failed:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
