import { useState } from "react";
import { FiShare2, FiX } from "react-icons/fi";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

export default function SharePopover({ movie }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const shareUrl = window.location.href;

  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: movie.title,
          text: `Check out this movie: ${movie.title}`,
          url: shareUrl,
        });
      } else {
        alert("Web Share not supported on this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full bg-white/10 hover:bg-white/20"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Share"
      >
        <FiShare2 />
      </button>

      {open && (
        <div className="absolute top-12 right-0 z-50 bg-black border border-white/10 rounded-xl p-4 shadow-xl w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-sm font-semibold">Share this</h3>
            <button onClick={() => setOpen(false)}>
              <FiX className="text-white hover:text-red-500 transition" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out "${movie.title}": ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl flex justify-center"
              title="Share on WhatsApp"
            >
              <FaWhatsapp className="text-green-400" />
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl flex justify-center"
              title="Share on Telegram"
            >
              <FaTelegramPlane className="text-blue-400" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Check out "${movie.title}" ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl flex justify-center"
              title="Share on X"
            >
              <FaXTwitter className="text-white" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl flex justify-center"
              title="Share on Facebook"
            >
              <FaFacebookF className="text-blue-500" />
            </a>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full text-sm text-white bg-white/10 hover:bg-white/20 p-2 rounded mb-2 transition"
          >
            {copied ? "Link Copied!" : "Copy Link"}
          </button>

          <button
            onClick={handleWebShare}
            className="w-full text-sm bg-accent text-white font-medium rounded p-2 hover:brightness-110 transition"
          >
            Native Share
          </button>
        </div>
      )}
    </div>
  );
}
