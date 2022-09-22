import React, { useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import DropdownList from "./DropdownList";

const DropdownSelect = ({
  children,
  categorySelectList,
  handleClickClose,
  handleSearchCategories,
}) => {
  const { show, setShow, dropdownRef } = useClickOutSide();
  const [coords, serCoords] = useState(null);

  const handleClickDropdownSelect = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.target) && show) {
      serCoords(dropdownRef.current.getBoundingClientRect());
      setShow(true);
    } else {
      serCoords(dropdownRef.current.getBoundingClientRect());
      setShow(!show);
    }
  };

  return (
    <div
      ref={dropdownRef}
      onClick={handleClickDropdownSelect}
      className={`${
        show ? "border-green-500" : "border-slate-400"
      } transition-all cursor-pointer mt-1 relative border rounded-lg max-w-[500px] flex items-center p-4 justify-between`}
    >
      <div className="flex flex-wrap flex-1 gap-3">
        {categorySelectList?.length > 0 &&
          categorySelectList?.map((categorySelect) => (
            <div
              key={categorySelect.categoryId}
              className="flex items-center justify-between p-2 border border-green-300 rounded-3xl"
            >
              <span className="text-sm text-green-400">
                {categorySelect.name}
              </span>
              <span
                className="cursor-pointer text-gray opacity-30"
                onClick={handleClickClose}
                data-category={JSON.stringify(categorySelect)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          ))}
        <input
          type="text"
          className="flex-1 w-full outline-none input-select"
          placeholder={
            categorySelectList?.length > 0 ? "" : "Select your categories..."
          }
          onChange={handleSearchCategories}
        />
      </div>
      <div className="flex items-center">
        <span
          className={`inline-block pl-3 ml-3 border-l transition-all ${
            show ? "border-green-500 text-green-500" : "border-slate-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>
      {show && <DropdownList coords={coords}>{children}</DropdownList>}
    </div>
  );
};

export default DropdownSelect;
