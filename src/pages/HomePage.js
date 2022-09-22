import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import InputWithSearchIcon from "../components/input/InputWithSearchIcon";
import NavHeader from "../components/navigate/NavHeader";
import NavSign from "../components/navigate/NavSign";
import { useAuth } from "../contexts/auth-context";
import PostList from "../layouts/PostList";

const HomePage = (props) => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  const { userInfo } = useAuth();
  const [search, setSearch] = useState("");

  const handleSearching = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  return (
    <div className="container">
      <NavHeader>
        <InputWithSearchIcon
          placeholder="Searching..."
          className="flex-1 sm:max-w-[300px] lg:max-w-[500px] hidden sm:block"
          onChange={handleSearching}
        />
        <NavSign user={userInfo}></NavSign>
      </NavHeader>
      <InputWithSearchIcon
        placeholder="Searching..."
        className="flex-1 sm:max-w-[300px] lg:max-w-[500px] px-2 mb-10 block sm:hidden"
        onChange={handleSearching}
      />
      <PostList search={search}></PostList>
    </div>
  );
};

export default HomePage;
