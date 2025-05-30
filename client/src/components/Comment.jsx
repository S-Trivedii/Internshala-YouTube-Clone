import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  COMMENT_API_END_POINT,
  USER_API_END_POINT,
} from "../utils/apiEndPoint.js";

const Comment = () => {
  const { videoId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${COMMENT_API_END_POINT}/video/${videoId}/comments`,
          { withCredentials: true }
        );
        setComments(res.data.comments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        setCurrentUserId(res.data.user._id);
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchCurrentUser();
    fetchComments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await axios.post(
        `${COMMENT_API_END_POINT}/`,
        { comment: commentText, videoId },
        { withCredentials: true }
      );

      setCommentText("");

      // Re-fetch comments to include the newly added one
      const res = await axios.get(
        `${COMMENT_API_END_POINT}/video/${videoId}/comments`,
        { withCredentials: true }
      );
      setComments(res.data.comments);
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${COMMENT_API_END_POINT}/${commentId}`, {
        withCredentials: true,
      });

      // Re-fetch comments to update the list after deletion
      const res = await axios.get(
        `${COMMENT_API_END_POINT}/video/${videoId}/comments`,
        { withCredentials: true }
      );
      setComments(res.data.comments);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    // Added 'mt-8' to create space above the entire comment section
    <div className="max-w-xl mt-8">
      {/* Changed form to use flexbox for side-by-side input and button */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex items-center space-x-2"
      >
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment"
          className="border p-2 w-full rounded flex-grow" // Use flex-grow to make input take available space
        />
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-100 p-3 rounded flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{c.userId?.name}</p>
              <p>{c.comment}</p>
            </div>
            {c.userId?._id === currentUserId && (
              <button
                onClick={() => handleDelete(c._id)}
                className="cursor-pointer text-red-500 text-sm ml-4 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
