import { useAuth } from "../../contexts/auth-context";
import NavHeader from "./NavHeader";
import NavSign from "./NavSign";

const NavManage = ({ className, children }) => {
  const { userInfo } = useAuth();

  return (
    <NavHeader className={className}>
      <NavSign user={userInfo}>{children}</NavSign>
    </NavHeader>
  );
};

export default NavManage;
