import * as ReactDom from "react-dom";

const Portal = ({ children, parentContainer }) => {
  return ReactDom.createPortal(children, parentContainer);
};

export default Portal;
