import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/button/Button";
import DropdownSelect from "../components/dropdown-select/DropdownSelect";
import ReactQuillEditor from "../components/editor/ReactQuillEditor";
import ImageUpload from "../components/imageUpload/ImageUpload";
import InputForm from "../components/input/InputForm";
import Label from "../components/label/Label";
import Radio from "../components/radio/Radio";
import { db } from "../firebase/firebase-config";
import { STATUS_POST } from "../utils/contains";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUploadFile from "../hooks/useUploadFile";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import Logo from "../components/logo/Logo";

const schema = yup.object({
  title: yup.string().required("This is a required field!!").max(50),
  categories: yup.array().min(1, "This is a required field!!"),
  thumb: yup.mixed().test("required", "This is a required field!!", (file) => {
    if (file) return true;
    return false;
  }),
  content: yup.string().required("This is a required field!!"),
});

const UpdatePostPage = () => {
  useEffect(() => {
    document.title = "Update your post";
  }, []);
  const navigate = useNavigate();
  const { postId, userId } = useParams();
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
    resolver: yupResolver(schema),
  });

  const statusWatch = watch("status");

  const { url, setUrl, setName, name, handleSelectImage, deleteImage } =
    useUploadFile(getValues, setValue);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        reset({
          thumb: data.thumb,
          title: data.title,
          status: data.status,
          categories: data.categories,
          userId: data.userId,
          thumbName: data.thumbName,
          content: data.content,
          author: data.author,
        });
        setCategorySelectList(data.categories);
        setContent(data.content);
        setUrl(data.thumb);
        setName(data.thumbName);
      } catch (error) {}
    }

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        const data = {
          ...doc.data(),
          categoryId: doc.id,
        };

        if (
          categorySelectList?.findIndex(
            (categorySelect) => categorySelect.categoryId === data.categoryId
          ) === -1
        ) {
          result.push(data);
        }
      });

      setCategories(result);
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const result = categories?.filter(
      (category) =>
        categorySelectList?.findIndex(
          (categorySelect) => categorySelect.categoryId === category.categoryId
        ) === -1
    );
    setCategories(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelectList]);

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

  const handleUpdatePost = async (values) => {
    if (!errors) return;
    try {
      const docRef = doc(db, "posts", postId);

      await updateDoc(docRef, {
        ...values,
        createdAt: serverTimestamp(),
        thumbName: name,
      });
      toast.success("Update your post successfull!!!");
    } catch (error) {}
  };

  if (!userId || !postId) {
    navigate("/");
    return;
  }
  return (
    <>
      <div className="p-4">
        <Logo className="text-center"></Logo>
        <form onSubmit={handleSubmit(handleUpdatePost)}>
          <div>
            <Label name="thumb">Thumb</Label>
            <ImageUpload
              className="w-full h-[200px] sm:h-[300px] mb-10 rounded-xl cursor-pointer bg-slate-100"
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
              {categories?.length > 0 ? (
                categories?.map((category) => (
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
          <Button
            type="submit"
            className="w-[300px] mt-80 mx-auto block !p-2 !text-lg"
          >
            Update a post
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdatePostPage;
