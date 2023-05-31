import React from "react";
import "./FaceRecognition.css";

// Displays image from url and bounding box around face
const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="facerecognition-image-center">
      <div className="facerecognition-image-wrapper">
        {/* To remove alt text from displaying in the view without an image, declare that the image URL must be present for alt text to also be present */}
        {imageUrl && (
          <img
            id="inputimage"
            src={imageUrl}
            alt="Clarifai API Face Detection Box Around Face"
            width="500px"
            height="auto"
          />
        )}
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ))}
        {imageUrl && (
          <p>
            We found <strong>{boxes.length}</strong> faces.
          </p>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
