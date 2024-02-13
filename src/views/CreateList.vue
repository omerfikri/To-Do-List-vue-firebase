<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create Job</h4>
      <input type="text" placeholder="Title" v-model="title" />
      <textarea placeholder="List Description" v-model="description"></textarea>
      <label>Description İmage</label>
      <input type="file" @change="handleChange" />
      <label>Intended End Date</label>
      <input type="datetime-local" v-model="date" />
      <div class="error">{{ fileHata }}</div>
      <button>Create List</button>
    </form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import useStorage from "../composables/useStorage";
  import useCollecton from "../composables/useCollection";
  import getUser from "@/composables/getUser";
  import { timestamp } from "@/firebase/config";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const title = ref("");
      const description = ref("");
      const date = ref("");

      const file = ref(null);
      const fileHata = ref(null);
      const router = useRouter();

      const types = ["image/png", "image/jpeg"];

      const { uploadImage, url, filePath, hata } = useStorage();

      const { kullanici } = getUser();

      const { hataCollection, addDocument } = useCollecton("lists");

      const handleSubmit = async () => {
        if (file.value) {
          await uploadImage(file.value);
          const res = await addDocument({
            title: title.value,
            description: description.value,
            userId: kullanici.value.uid,
            userName: kullanici.value.displayName,
            imageUrl: url.value,
            filePath: filePath.value,
            stepsOfList: [],
            date: Date.parse(date.value),
            createDate: timestamp,
          });
          if (!hataCollection.value) {
            console.log("create list");
            router.push({ name: "ListDetails", params: { id: res.id } });
          }
        }
      };
      const handleChange = (e) => {
        let choice = e.target.files[0];

        if (choice && types.includes(choice.type)) {
          file.value = choice;
          fileHata.value = null;
        } else {
          file.value = null;
          fileHata.value = "Please choice jpeg or png";
        }
      };

      return {
        title,
        description,
        date,
        fileHata,
        handleSubmit,
        handleChange,
      };
    },
  };
</script>

<style scoped>
  input [type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 17px;
    display: block;
    margin-top: 30px;
  }

  form {
    margin-top: -30px;
  }
</style>
