import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaVideo, FaFileImage, FaLink } from "react-icons/fa";  // Using React Icons for enhanced design

const UploadVideo = () => {
  const navigate = useNavigate();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  useEffect(() => {
    if (!userChannel || Object.keys(userChannel).length < 1) {
      navigate("/");
    }
  }, [userChannel, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    videoUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let videoData = {
      ...formData,
      uploader: user?._id,
      channelId: userChannel?._id,
    };

    try {
      let result = await axios.post(
        "https://youtube-clone-backend-ghq6.onrender.com/api/video/addVideo",
        videoData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Video uploaded successfully!");
        setFormData({
          title: "",
          thumbnailUrl: "",
          description: "",
          category: "",
          videoUrl: "",
        });
        navigate(`/channel/${userChannel?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-10 w-full max-w-2xl rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800">
          Upload Your Video
        </h2>

        {/* Video Icon */}
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full shadow-lg border-4 border-red-600 object-cover mb-6 transition duration-500 ease-in-out transform hover:scale-110"
            src="https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530837.jpg"
            alt="Video Icon"
          />
        </div>

        {/* Title Input */}
        <div className="relative">
          <input
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="title"
            type="text"
            required
            value={formData.title}
            name="title"
            onChange={handleChange}
            placeholder="Enter Video Title"
          />
          <FaVideo
            className={`absolute top-4 left-4 ${formData.title ? "text-blue-500" : "text-red-500"} transition-colors duration-300`}
          />
        </div>

        {/* Thumbnail URL */}
        <div className="relative">
          <input
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="thumbnailUrl"
            type="url"
            required
            value={formData.thumbnailUrl}
            name="thumbnailUrl"
            onChange={handleChange}
            placeholder="Enter Thumbnail URL"
          />
          <FaFileImage
            className={`absolute top-4 left-4 ${formData.thumbnailUrl ? "text-blue-500" : "text-red-500"} transition-colors duration-300`}
          />
        </div>

        {/* Video URL */}
        <div className="relative">
          <input
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="videoUrl"
            type="url"
            required
            value={formData.videoUrl}
            name="videoUrl"
            onChange={handleChange}
            placeholder="Enter Video URL"
          />
          <FaLink
            className={`absolute top-4 left-4 ${formData.videoUrl ? "text-blue-500" : "text-red-500"} transition-colors duration-300`}
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            name="category"
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={formData.category}
            onChange={handleChange}
            id="category"
          >
            <option value="" disabled>Select Category</option>
            <option value="songs">Songs</option>
            <option value="movies">Movies</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
            <option value="fashion">Fashion</option>
            <option value="blog">Blog</option>
            <option value="finance">Finance</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        {/* Description Input */}
        <div className="relative">
          <textarea
            rows={5}
            className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            required
            value={formData.description}
            name="description"
            onChange={handleChange}
            placeholder="Enter Video Description"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 rounded-lg transition-all duration-300"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
