import { storageRef } from "@/firebase/config";
import {
  ref as Ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ref } from "vue";

import getUser from "./getUser";

const { kullanici } = getUser();

const useStorage = () => {
  const hata = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `lists/${kullanici.value.uid}/${file.name}`;
    const storage = Ref(storageRef, filePath.value);

    try {
      await uploadBytes(storage, file);
      const downloadURL = await getDownloadURL(storage);
      url.value = downloadURL;
    } catch (error) {
      hata.value = error.message;
      console.log(hata.value);
    }
  };

  const deleteImage = async (path) => {
    const storage = Ref(storageRef, path);
    try {
      await deleteObject(storage);
    } catch (error) {
      hata.value = error.message;
    }
  };
  return { uploadImage, url, filePath, hata, deleteImage };
};

export default useStorage;
