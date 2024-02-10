import { ref } from "vue";
import { db } from "@/firebase/config";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";

const getCollection = (koleksiyon) => {
  const docs = ref(null);
  const hataCollection = ref(null);

  let koleksiyonRef = collection(db, koleksiyon);
  const q = query(koleksiyonRef, orderBy("createDate", "desc"));

  onSnapshot(
    q,
    (snap) => {
      let result = [];
      snap.docs.forEach((doc) => {
        doc.data().createDate && result.push({ ...doc.data(), id: doc.id });
      });

      docs.value = result;
      hataCollection.value = null;
    },
    (err) => {
      docs.value = null;
      hataCollection.value = "Failed Pull Data ";
    }
  );
  return { docs, hataCollection };
};

export default getCollection;
