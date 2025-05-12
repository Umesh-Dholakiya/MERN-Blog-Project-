// components/ShareButton.jsx
import { FaShareAlt } from "react-icons/fa";

const ShareButton = ({ blog }) => {
  const handleShare = () => {
    const shareData = {
      title: blog.title,
      text: blog.description,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button onClick={handleShare} className="share-button">
      <FaShareAlt /> Share
    </button>
  );
};

export default ShareButton;
