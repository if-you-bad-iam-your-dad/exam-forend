import React, { useState, useRef } from "react";
import {
  CreateSocialMediaPostAPI,
  SocialMediaUploadImageApi,
} from "../../services/serviceFile";
import CircularProgress from "@mui/material/CircularProgress";
import "./socialMediaPost.css";
import Sidebar from "../sidebar/Sidebar";
import { GetUserData } from "../../services/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SocialMediaPost() {
  const imageInputRef = useRef(null);
  const videoInpuRef = useRef(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [linkedInImageAssetValue, setLinkedInImageAssetValue] = useState([]);
  const [twitterImageMediaId, setTwitterImageMediaId] = useState([]);
  const [fbMediaId, setFbMediaId] = useState([]);
  const [igCreationId, setIgCreationId] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [linkedInVideoAssetValue, setLinkedInVideoAssetValue] = useState([]);
  const [twitterVideoMediaId, setTwitterVideoMediaId] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const checkboxOptions = [
    { name: "Facebook and Instagram", value: "FacebookAndInstagram" },
    { name: "LinkedIN", value: "LinkedIN" },
    { name: "Twitter", value: "Twitter" },
  ];

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setIsChecked([...isChecked, e.target.value]);
    } else {
      setIsChecked(isChecked.filter((item) => item !== e.target.value));
    }
  };

  let messaging = "";
  isChecked.forEach((value) => {
    if (value === "FacebookAndInstagram") {
      messaging += "\nFacebookAndInstagram - maximum 6 images aloaded";
    }

    if (value === "Twitter") {
      messaging += "\nTwitter - You can include a maximum of 4 images.";
    }

    if (value === "LinkedIN") {
      messaging +=
        "\nLinkedIn - A minimum of 2 images and a maximum of 20 images.";
    }
  });

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
    setIsUploadSuccessful(false);
  };

  const handleVideoChange = (event) => {
    setVideos(event.target.files[0]);
    setIsUploadSuccessful(false);
  };

  const checkImageVideoArrayValue = () => {
    if ((images.length > 0 || videos) && isUploadSuccessful) {
      return true;
    } else {
      return false;
    }
  };

  console.log(imageUrl, "image 62");
  const handleUpload = async (e) => {
    e.preventDefault();
    setIsImageUploading(true);
    let created_by = GetUserData().email;
    let formData = new FormData();
    images.forEach((image) => formData.append("image", image));
    formData.append("video", videos);
    formData.append("created_by", created_by);
    isChecked.forEach((checked) => formData.append("isChecked", checked));
    try {
      const uploadResponse = await SocialMediaUploadImageApi(formData);
      console.log(uploadResponse.data, "uploadResponse");
      if (uploadResponse.data && uploadResponse.data.upload_data) {
        setImageUrl(uploadResponse.data.upload_data);
      }
      if (uploadResponse.data && uploadResponse.data.LinkedIn) {
        setLinkedInImageAssetValue(
          uploadResponse.data.LinkedIn.linkedIn_Image_asset_value
        );
        setLinkedInVideoAssetValue(
          uploadResponse.data.LinkedIn.linkedIn_Video_asset_value
        );
        toast(uploadResponse.data.LinkedIn.message);
      }
      if (uploadResponse.data && uploadResponse.data.Twitter) {
        setTwitterImageMediaId(
          uploadResponse.data.Twitter.tweet_image_media_id
        );
        setTwitterVideoMediaId(
          uploadResponse.data.Twitter.tweet_video_media_id
        );
        toast(uploadResponse.data.Twitter.message);
      }
      if (uploadResponse.data && uploadResponse.data.FbAndInstagram) {
        setFbMediaId(uploadResponse.data.FbAndInstagram.fb_media_id);
        setIgCreationId(uploadResponse.data.FbAndInstagram.ig_creation_id);
        toast(uploadResponse.data.FbAndInstagram.message);
      }
      setIsUploadSuccessful(true);
      setIsImageUploading(false);
    } catch (error) {
      console.log("Error uploading images 101:", error);
      setIsImageUploading(false);
      setIsUploadSuccessful(false);
    }
  };

  const handleSubmit = async (e) => {
    setIsPosting(true);
    e.preventDefault();
    try {
      let createdBy = GetUserData().email;
      let postInputValue = {
        content: content,
        created_by: createdBy,
        linkedIn_image_assetValue: linkedInImageAssetValue,
        linkedIn_video_assetValue: linkedInVideoAssetValue,
        twitter_image_mediaId: twitterImageMediaId,
        twitter_video_mediaId: twitterVideoMediaId,
        fbMediaId: fbMediaId,
        igCreationId: igCreationId,
        ischecked: isChecked,
      };
      const postResponse = await CreateSocialMediaPostAPI(postInputValue);
      console.log(postResponse.data, "post response");
      if (postResponse.data && postResponse.data.FacebookAndInstagram) {
        toast(postResponse.data.FacebookAndInstagram.message);
      }
      if (postResponse.data && postResponse.data.LinkedIn) {
        toast(postResponse.data.LinkedIn.message);
      }
      if (postResponse.data && postResponse.data.Twitter) {
        toast(postResponse.data.Twitter.message);
      }
      setImages([]);
      // Automatically reset the file input
      imageInputRef.current.value = [];
      videoInpuRef.current.value = "";
      setImageUrl([]);
      setVideos("");
      setIsChecked([]);
      setIsPosting(false);
      setContent("");
    } catch (error) {
      let value = error.response.data.error;
      console.log(value, "posting error 134");
      setIsPosting(false);
    }
  };

  return (
    <Sidebar>
      <div>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <h2 style={{ textAlign: "center", fontFamily: "serif" }}>
              Social Media Post
            </h2>
          </div>
          <div className="form-group">
            <label>Select Social Media : </label>
            {checkboxOptions.map((data, index) => (
              <div key={index}>
                <input
                  value={data.value}
                  checked={isChecked.includes(data.value)}
                  name={data.name}
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                <span> {data.name} </span>
              </div>
            ))}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="image_file">Image : </label>
              <input
                className="mediaSelect"
                type="file"
                multiple
                // accept="image/* video/*"
                accept=".jpg, .jpeg, .png, .mp4"
                id="image_file"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </div>
            <div>
              {messaging.split("\n").map((warningMessage) => (
                <p className="warning_message">{warningMessage}</p>
              ))}
            </div>
            <div className="form-group">
              <label htmlFor="video_file">Video : </label>
              <input
                className="mediaSelect"
                type="file"
                accept="video/*"
                id="video_file"
                ref={videoInpuRef}
                onChange={handleVideoChange}
              />
            </div>
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            {isImageUploading ? (
              <CircularProgress />
            ) : (
              <button
                className="uploadButton"
                onClick={handleUpload}
                disabled={
                  isImageUploading || isPosting || isChecked.length === 0
                    ? true
                    : false
                }
              >
                Upload
              </button>
            )}
          </div>
          <div className="form-group">
            {imageUrl.map((data) => (
              <div>
                <img
                  className="uploadImage"
                  src={process.env.REACT_APP_BACKEND_URL + data.image}
                  alt="upload_image"
                />
                <video
                  src={process.env.REACT_APP_BACKEND_URL + data.video}
                  width="200"
                  height="200"
                  // controls
                />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description : </label>
            <textarea
              className="mediaSelect"
              id="description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            {isPosting ? (
              <CircularProgress />
            ) : (
              <button
                className="postButton"
                type="submit"
                disabled={checkImageVideoArrayValue() === false ? true : false}
              >
                Post
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </Sidebar>
  );
}
