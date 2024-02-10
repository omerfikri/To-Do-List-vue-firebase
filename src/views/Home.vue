<template>
  <div class="home">
    <div class="home">
      <div v-if="hataCollection" class="error">{{ hataCollection }}</div>
      <div v-if="docs">
        <List :jobs="docs" />
      </div>
    </div>
  </div>
</template>

<script>
  import getCollection from "@/composables/getCollection";
  import List from "@/components/List.vue";
  export default {
    name: "Home",
    components: {
      List,
    },
    setup() {
      const { docs, hataCollection } = getCollection("lists");

      return { docs, hataCollection };
    },
  };
</script>

<style scoped></style>
