import React from "react";
import InfoPost from "./InfoPost";

const Post = ({ thumb, thumbName, onClick, ...props }) => {
  return (
    <div
      className="relative w-full h-full cursor-pointer rounded-xl hovered-post"
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img
          src={thumb}
          alt={thumbName}
          className="w-full h-full transition-all rounded-xl object-fit "
        />
        <div className="absolute inset-0 w-full h-full bg-black opacity-40 rounded-xl overlay"></div>
      </div>
      <InfoPost {...props}></InfoPost>
    </div>
  );
};

export default Post;
