import React from "react";

const InfoPost = ({
  categories = [],
  time = "Mar 23",
  author = "Hưng",
  title = "Bien Nha Trang luc binh minh dep tuyet voi",
}) => {
  return (
    <div className="absolute inset-0 w-full h-full p-4">
      <div className="flex justify-between mb-4">
        <div className="flex flex-wrap gap-1">
          {categories.length > 0 &&
            categories.map((category) => (
              <span
                key={category.categoryId}
                className="flex items-center p-1 my-1 text-xs font-semibold text-center md:text-sm rounded-xl bg-category text-categoryText"
              >
                {category.name}
              </span>
            ))}
        </div>
        <div className="flex flex-col items-end justify-center flex-shrink-0 text-xs font-semibold lg:text-sm text-category">
          <span>{time}</span>
          <span>{author}</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
  );
};

export default InfoPost;
