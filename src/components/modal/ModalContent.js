import React from "react";

const ModalContent = ({ children, title }) => {
  return (
    <>
      <h1 className="text-2xl font-medium text-green-500 sm:text-3xl 2xl:text-4xl">
        {title}
      </h1>
      {children}
    </>
  );
};

export default ModalContent;
