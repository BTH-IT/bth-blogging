import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";

export default function useUploadFile(getValues, setValue) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const handleSelectImage = (file, nameValue) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
        setName(file.name);
        setValue(nameValue, downloadURL);
      });
    });
  };

  const deleteImage = (name) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/" + name);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return { url, name, setUrl, setName, handleSelectImage, deleteImage };
}
