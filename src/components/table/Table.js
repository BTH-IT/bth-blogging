import React from "react";

const Table = ({ heading, children }) => {
  return (
    <div className="w-full px-2 mt-5 overflow-x-auto overflow-y-hidden">
      <table className="w-[1980px] mx-auto table-fixed">
        <tbody className="overflow-scroll">
          {heading}
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
