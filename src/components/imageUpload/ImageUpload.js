import React from "react";
import Label from "../label/Label";

const ImageUpload = ({ className, children, handleChange, url, ...props }) => {
  return (
    <div className={className}>
      <Label className={className} {...props}>
        {children ? (
          children
        ) : (
          <img
            src={url}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        )}
      </Label>
      <input
        type="file"
        {...props}
        id={props.name}
        hidden
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUpload;
