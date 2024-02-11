import { ref } from "vue";
import { db } from "@/firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

const getDocument = (koleksiyon, id) => {
  let docs = ref(null);
  let hataDocument = ref(null);

  let docRef = doc(db, koleksiyon, id);

  onSnapshot(
    docRef,
    (snap) => {
      if (snap.data()) {
        docs.value = { ...snap.data(), id: snap.id };
        hataDocument.value = null;
      } else {
        hataDocument.value = "Doc Not Found";
      }
    },
    (err) => {
      hataDocument.value = "Data Not Be Access";
    }
  );
  return { hataDocument, docs };
};

export default getDocument;
