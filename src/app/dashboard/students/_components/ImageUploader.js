"use client";

import { useState } from "react";
import uploadImage from "@/utils/uploadImage";

const ImageUploader = () => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    uploadImage(
      file,
      (progress) => setProgress(progress),
      (url) => setImageUrl(url),
      (error) => console.error("Upload failed:", error)
    );
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {progress > 0 && <p>Upload progress: {progress}%</p>}
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
