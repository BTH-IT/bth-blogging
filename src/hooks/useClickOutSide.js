import { useEffect, useRef, useState } from "react";

export default function useClickOutSide() {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutSide(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return { show, setShow, dropdownRef };
}
