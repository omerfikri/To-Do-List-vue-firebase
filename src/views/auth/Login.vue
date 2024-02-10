<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button>Login</button>
    <div v-if="hata" class="error">{{ hata }}</div>
  </form>
</template>

<script>
  import useLogin from "@/composables/useLogin";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const { hata, login } = useLogin();
      const email = ref("");
      const password = ref("");
      const router = useRouter();
      const handleSubmit = async () => {
        const res = await login(email.value, password.value);
        if (!hata.value) {
          router.push("/");
        }
      };
      return { email, password, handleSubmit, hata };
    },
  };
</script>

<style></style>
