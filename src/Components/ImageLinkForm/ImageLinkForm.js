import React from "react";
import "./ImageLinkForm.css";

// Allows user to input image url. If url is not valid, displays error message
const ImageLinkForm = ({ onInputChange, onSubmit, isUrlValid }) => {
  return (
    <form className="image-input-wrapper" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="image-input-link">
        Image Link:
      </label>
      <input
        className="image-input-link"
        type="text"
        placeholder="http://example.com/image"
        id="image-input-link"
        onChange={onInputChange}
      />
      {!isUrlValid && (
        <p className="url-error" aria-live="polite">
          Whoops! That's an invalid URL.
        </p>
      )}
      <button className="image-input-button" type="submit">
        Detect Faces
      </button>
    </form>
  );
};

export default ImageLinkForm;
