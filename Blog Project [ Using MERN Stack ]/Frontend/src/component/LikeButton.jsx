// components/LikeButton.jsx
import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";

const LikeButton = ({ blogId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const userId = "user123"; // Replace with real logged-in user ID

  useEffect(() => {
    fetch(`http://localhost:9000/blog/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        setLikesCount(data.blog.likes.length);
        setLiked(data.blog.likes.includes(userId));
      });
  }, [blogId]);

  const handleLike = () => {
    fetch(`http://localhost:9000/blog/${blogId}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLikesCount(data.totalLikes.length); // Expect backend to return `totalLikes: [userIds]`
        setLiked(true);
      });
  };

  return (
    <button onClick={handleLike} disabled={liked} className="like-button">
      <FaThumbsUp /> {liked ? "Liked" : "Like"} ({likesCount})
    </button>
  );
};

export default LikeButton;
