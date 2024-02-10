<template>
  <div v-for="job in jobs" :key="job.id">
    <router-link :to="{ name: 'ListDetails', params: { id: job.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="job.imageUrl" />
        </div>
        <div class="info">
          <h3>{{ job.title }}</h3>
          <p>Job Creator: {{ job.userName }}</p>
        </div>
        <div class="work-number">
          <p>Job has {{ job.stepsOfList.length }} stage</p>
        </div>
      </div></router-link
    >
  </div>
</template>

<script>
  export default {
    props: ["jobs"],
  };
</script>

<style></style>
