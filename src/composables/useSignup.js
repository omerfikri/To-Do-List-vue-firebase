import { ref } from "vue";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const hata = ref(null);

const signup = async (email, password, kullaniciAd) => {
  hata.value = null;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log("geldi");
    if (!res) {
      throw new Error("Register error");
    }
    updateProfile(auth.currentUser, {
      displayName: kullaniciAd,
    });
    hata.value = null;
    return res;
  } catch (error) {
    hata.value = error.message;
  }
};

const useSignup = () => {
  return { hata, signup };
};

export default useSignup;
