import { ref } from "vue";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const hata = ref(null);

const login = async (email, password) => {
  hata.value = null;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    hata.value = null;
    return res;
  } catch (error) {
    hata.value = "Login error";
  }
};

const useLogin = () => {
  return { hata, login };
};

export default useLogin;
