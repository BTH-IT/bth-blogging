import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import DropdownSelect from "../components/dropdown-select/DropdownSelect";
import ImageUpload from "../components/imageUpload/ImageUpload";
import InputForm from "../components/input/InputForm";
import Label from "../components/label/Label";
import Radio from "../components/radio/Radio";
import { db } from "../firebase/firebase-config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/auth-context";
import { STATUS_POST } from "../utils/contains";
import useUploadFile from "../hooks/useUploadFile";
import ReactQuillEditor from "../components/editor/ReactQuillEditor";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import Logo from "../components/logo/Logo";

const initialValue = {
  thumb: "",
  title: "",
  status: "public",
  categories: [],
  userId: "",
  thumbName: "",
  content: "",
  author: "",
};

const schema = yup.object({
  title: yup.string().required("This is a required field!!").max(50),
  categories: yup.array().min(1, "This is a required field!!"),
  thumb: yup.mixed().test("required", "This is a required field!!", (file) => {
    if (file) return true;
    return false;
  }),
  content: yup.string().required("This is a required field!!"),
});

const CreatePostPage = () => {
  useEffect(() => {
    document.title = "Create a new post";
  }, []);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [categorySelectList, setCategorySelectList] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const { url, setUrl, setName, name, handleSelectImage, deleteImage } =
    useUploadFile(getValues, setValue);

  const statusWatch = watch("status");

  useEffect(() => {
    setValue("categories", categorySelectList);
  }, [categorySelectList, setValue]);

  useEffect(() => {
    setValue("content", content);
  }, [content, setValue]);

  const handleClickSelect = (e) => {
    const categorySelected = JSON.parse(e.target.getAttribute("data-category"));
    categories.splice(
      categories.findIndex(
        (category) => categorySelected.name === category.name
      ),
      1
    );
    setCategorySelectList([...categorySelectList, categorySelected]);
    setCategories(categories);
  };

  const handleClickClose = (e) => {
    let categorySelected;
    if (e.target.tagName === "svg") {
      categorySelected = JSON.parse(
        e.target.parentElement.getAttribute("data-category")
      );
    } else if (e.target.tagName === "path") {
      categorySelected = JSON.parse(
        e.target.parentElement.parentElement.getAttribute("data-category")
      );
    } else {
      categorySelected = JSON.parse(e.target.getAttribute("data-category"));
    }
    categorySelectList.splice(
      categorySelectList.findIndex(
        (categorySelect) => categorySelected.name === categorySelect.name
      ),
      1
    );
    setCategories([...categories, categorySelected]);
    setCategorySelectList(categorySelectList);
  };

  const handleChangeEditor = debounce((value) => {
    if (value === "<p><br></p>") setContent("");
    else setContent(value);
  }, 1000);

  const handleSearchCategories = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  useEffect(() => {
    async function fetchCategories() {
      const result = [];
      const colRef = collection(db, "categories");
      const q = search
        ? query(
            colRef,
            where("name", ">=", search),
            where("name", "<=", search + `\uf8ff`)
          )
        : colRef;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({
          ...doc.data(),
          categoryId: doc.id,
        });
      });
      setCategories(result);
    }
    fetchCategories();
  }, [search]);

  const handleCreatePost = async (values) => {
    console.log({
      ...values,
      thumbName: name,
      userId: userInfo.uid,
    });
    if (!errors) return;

    const colRef = collection(db, "posts");
    try {
      await addDoc(colRef, {
        ...values,
        thumbName: name,
        userId: userInfo.uid,
        author: userInfo.displayName,
        createdAt: serverTimestamp(),
      });

      toast.success("Create your post successfull!!!");
      reset(initialValue);
      setContent("");
      setCategorySelectList([]);
      setUrl("");
      setName("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!userInfo) {
    navigate("/");
    return;
  }

  return (
    <div className="container p-4">
      <Logo className="block text-center"></Logo>
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <div>
          <Label name="thumb">Thumb</Label>
          <ImageUpload
            className="w-full h-[300px] mb-10 rounded-xl cursor-pointer bg-slate-100"
            name="thumb"
            handleChange={(e) => {
              deleteImage(name);
              handleSelectImage(e.target.files[0], "thumb");
            }}
          >
            <img
              src={
                url
                  ? url
                  : "https://www.anhdulich.vn/storage/icons/picture-icon-png-23.jpg"
              }
              alt=""
              className="object-contain w-full h-full"
            />
          </ImageUpload>
          {errors?.thumb && (
            <span className="text-sm text-red-500">
              {errors?.thumb.message}
            </span>
          )}
        </div>
        <div>
          <Label name="title">Title</Label>
          <InputForm
            type="text"
            name="title"
            placeholder="Enter your title"
            control={control}
          ></InputForm>
        </div>
        <div>
          <Label>Content</Label>
          <ReactQuillEditor
            content={content}
            handleChange={handleChangeEditor}
          ></ReactQuillEditor>
          {errors?.content && (
            <span className="text-sm text-red-500">
              {errors?.content.message}
            </span>
          )}
        </div>
        <div>
          <Label>Status</Label>
          <div className="flex gap-x-10">
            <Radio
              setValue={setValue}
              value={STATUS_POST.PUBLIC}
              name="status"
              label="Public"
              checked={statusWatch === STATUS_POST.PUBLIC}
            ></Radio>
            <Radio
              setValue={setValue}
              value={STATUS_POST.PRIVATE}
              name="status"
              label="Private"
              checked={statusWatch === STATUS_POST.PRIVATE}
            ></Radio>
          </div>
        </div>
        <div>
          <Label>Category</Label>
          <DropdownSelect
            categorySelectList={categorySelectList}
            handleClickClose={handleClickClose}
            handleSearchCategories={handleSearchCategories}
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.categoryId}
                  className="px-2 py-1 cursor-pointer hover:bg-slate-100"
                  data-category={JSON.stringify(category)}
                  onClick={(e) => handleClickSelect(e)}
                >
                  {category.name}
                </div>
              ))
            ) : (
              <div className="text-center">No options</div>
            )}
          </DropdownSelect>
          {errors?.categories && (
            <span className="text-sm text-red-500">
              {errors?.categories.message}
            </span>
          )}
        </div>
        <Button type="submit" className="w-[300px] mt-80 mx-auto block">
          Create a post
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
