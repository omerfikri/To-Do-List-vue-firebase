<template>
  <div class="navbar">
    <nav>
      <img src="../assets/work.png" alt="" />
      <h1>
        <router-link :to="{ name: 'Home' }">To Do List</router-link>
      </h1>
      <div class="links">
        <div v-if="kullanici">
          <router-link :to="{ name: 'CreateList' }" class="btn"
            >Create Job</router-link
          >
          <button @click="handleClick">Çıkış</button>
        </div>
        <div v-if="!kullanici">
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Sign In</router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import useLogout from "@/composables/useLogout";
  import { useRouter } from "vue-router";
  import getUser from "../composables/getUser";
  export default {
    setup() {
      const { logout } = useLogout();
      const router = useRouter();
      const { kullanici } = getUser();

      const handleClick = async () => {
        await logout();
        router.push({ name: "Login" });
      };
      return { handleClick, kullanici };
    },
  };
</script>

<style></style>
