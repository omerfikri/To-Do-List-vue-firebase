<template>
  <form @submit.prevent="handleSubmit">
    <h3>Register</h3>
    <input type="text" placeholder="User Name" v-model="userName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button>Register</button>
    <div v-if="hata" class="error">{{ hata }}</div>
  </form>
</template>

<script>
  import useSignup from "@/composables/useSignup";
  import { ref } from "vue";
  export default {
    setup() {
      const { hata, signup } = useSignup();
      const email = ref("");
      const password = ref("");
      const userName = ref("");
      const handleSubmit = async () => {
        const res = await signup(email.value, password.value, userName.value);
        if (!hata.value) {
          console.log("Sign Up Success");
        }
      };
      return { email, password, handleSubmit, hata, userName };
    },
  };
</script>

<style></style>
