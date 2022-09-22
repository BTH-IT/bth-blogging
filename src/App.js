import { Route, Routes } from "react-router-dom";
import ManageUserPosts from "./components/user/ManageUserPosts";
import ManagePosts from "./pages/ManagePosts";
import AdminPage from "./pages/AdminPage";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import ManageCategories from "./pages/ManageCategories";
import ManageUsers from "./pages/ManageUsers";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import ModManagePage from "./pages/ModManagePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/mod-manage-posts"
          element={<ModManagePage></ModManagePage>}
        ></Route>
        <Route path="/admin-dashboard" element={<AdminPage></AdminPage>}>
          <Route
            path="/admin-dashboard/users"
            element={<ManageUsers></ManageUsers>}
          ></Route>
          <Route
            path="/admin-dashboard/categories"
            element={<ManageCategories></ManageCategories>}
          ></Route>
          <Route
            path="/admin-dashboard/blogs"
            element={<ManagePosts></ManagePosts>}
          ></Route>
        </Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route
          path="/create-post"
          element={<CreatePostPage></CreatePostPage>}
        ></Route>
        <Route
          path="/update-post/:userId/:postId"
          element={<UpdatePostPage></UpdatePostPage>}
        ></Route>
        <Route
          path="/manage-posts"
          element={<ManageUserPosts></ManageUserPosts>}
        ></Route>
        <Route
          path="/detail-post/:postId"
          element={<PostDetailPage></PostDetailPage>}
        ></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
