import { ref } from "vue";
import { db } from "@/firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const useDocument = (koleksiyon, id) => {
  const hata = ref(null);

  let docRef = doc(db, koleksiyon, id);

  const deleteDocument = async () => {
    hata.value = null;

    try {
      const res = await deleteDoc(docRef);
      return res;
    } catch (error) {
      hata.value = "Dont Delete Document";
    }
  };

  const updateDocument = async (jobStage) => {
    hata.value = null;
    try {
      const res = await updateDoc(docRef, jobStage);
      return res;
    } catch (error) {
      hata.value = "Dont Update Document";
    }
  };
  return { hata, deleteDocument, updateDocument };
};

export default useDocument;
