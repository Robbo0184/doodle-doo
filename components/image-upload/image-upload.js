import React, { useState } from "react";

const ImageUpload = ({onImageUpload}) => {
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
     
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image URL:", data.imageUrl);
        setImageUploaded(true);
        onImageUpload(data.imageUrl);
      } else {
        console.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
