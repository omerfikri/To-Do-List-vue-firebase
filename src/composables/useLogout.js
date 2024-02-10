import { ref } from "vue";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const hata = ref("");

const logout = async () => {
  hata.value = null;
  try {
    await signOut(auth);
  } catch (error) {
    hata.value = error.message;
  }
};

const useLogout = () => {
  return { hata, logout };
};
export default useLogout;
