import { ref } from "vue";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";

const useCollection = (koleksiyon) => {
  const hataCollection = ref(null);

  const addDocument = async (doc) => {
    hataCollection.value = null;
    try {
      const res = await addDoc(collection(db, koleksiyon), doc);
      return res;
    } catch (error) {
      hataCollection.value = "Document Doesn't Create ";
    }
  };
  return { hataCollection, addDocument };
};

export default useCollection;
